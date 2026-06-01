// @ts-nocheck
import Stripe from "stripe";

let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export { stripe };

export const PLANS = {
  free: {
    name: "免费版",
    price: 0,
    features: ["每日 5 次图像生成", "标准质量输出", "基础模型访问"],
  },
  basic: {
    name: "基础版",
    price: 2900,
    features: ["每日 50 次图像生成", "高清质量输出", "所有模型访问", "无水印"],
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
  },
  pro: {
    name: "专业版",
    price: 9900,
    features: ["无限图像生成", "4K 超高清输出", "所有模型 + 优先访问", "API 接口访问"],
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
};