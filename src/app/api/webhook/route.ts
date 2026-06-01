import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "缺少签名" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook 验证失败:", err.message);
    return NextResponse.json({ error: "Webhook 验证失败" }, { status: 400 });
  }

  // 处理事件
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (userId && plan) {
        // 创建订阅记录
        await prisma.subscription.create({
          data: {
            userId,
            plan,
            status: "active",
            paymentId: session.subscription as string,
          },
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        // 更新订阅状态
        await prisma.subscription.updateMany({
          where: {
            userId,
            paymentId: subscription.id,
          },
          data: {
            status: subscription.status === "active" ? "active" : "expired",
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        // 删除订阅记录
        await prisma.subscription.deleteMany({
          where: {
            userId,
            paymentId: subscription.id,
          },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}