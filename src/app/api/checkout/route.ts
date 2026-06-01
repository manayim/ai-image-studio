import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { plan, userId, email } = await request.json();

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json(
        { error: "无效的订阅方案" },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    // 免费版不需要支付
    if (plan === "free") {
      return NextResponse.json({
        success: true,
        message: "免费版已激活",
      });
    }

    // 如果没有配置 Stripe，返回模拟数据
    if (!stripe) {
      return NextResponse.json({
        success: true,
        message: "支付功能暂未配置",
        url: null,
      });
    }

    // 创建 Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      metadata: {
        userId,
        plan,
      },
      line_items: [
        {
          price_data: {
            currency: "cny",
            product_data: {
              name: `AI Image Studio - ${selectedPlan.name}`,
              description: selectedPlan.features.join("、"),
            },
            unit_amount: selectedPlan.price,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("创建支付会话失败:", error);
    return NextResponse.json(
      { error: "创建支付会话失败" },
      { status: 500 }
    );
  }
}