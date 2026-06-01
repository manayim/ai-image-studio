import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY 环境变量未设置");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

export const PLANS = {
  free: {
    name: "免费版",
    price: 0,
    features: ["每日 5 次图像生成", "标准质量输出", "基础模型访问"],
  },
  basic: {
    name: "基础版",
    price: 2900, // ¥29 = 2900 分
    features: ["每日 50 次图像生成", "高清质量输出", "所有模型访问", "无水印"],
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
  },
  pro: {
    name: "专业版",
    price: 9900, // ¥99 = 9900 分
    features: ["无限图像生成", "4K 超高清输出", "所有模型 + 优先访问", "API 接口访问"],
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
};