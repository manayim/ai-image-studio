"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, Crown, Loader2 } from "lucide-react";

const plans = [
  {
    name: "免费版",
    id: "free",
    price: "¥0",
    period: "永久",
    description: "适合个人体验",
    icon: Sparkles,
    color: "from-gray-500 to-gray-600",
    features: [
      "每日 5 次图像生成",
      "标准质量输出",
      "基础模型访问",
      "有水印",
      "社区支持",
    ],
    cta: "开始使用",
    ctaStyle: "bg-white/10 hover:bg-white/20",
  },
  {
    name: "基础版",
    id: "basic",
    price: "¥29",
    period: "/月",
    description: "适合个人创作者",
    icon: Zap,
    color: "from-blue-500 to-purple-500",
    features: [
      "每日 50 次图像生成",
      "高清质量输出",
      "所有模型访问",
      "无水印",
      "优先支持",
      "历史记录保存",
    ],
    cta: "订阅基础版",
    ctaStyle: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
    popular: true,
  },
  {
    name: "专业版",
    id: "pro",
    price: "¥99",
    period: "/月",
    description: "适合专业团队",
    icon: Crown,
    color: "from-orange-500 to-red-500",
    features: [
      "无限图像生成",
      "4K 超高清输出",
      "所有模型 + 优先访问",
      "无水印",
      "专属客服支持",
      "API 接口访问",
      "商业授权",
      "批量生成",
    ],
    cta: "订阅专业版",
    ctaStyle: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (planId === "free") {
      window.location.href = "/auth/register";
      return;
    }

    setLoading(planId);

    try {
      // 获取用户信息
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        window.location.href = "/auth/login";
        return;
      }

      const user = JSON.parse(userStr);

      // 创建支付会话
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("订阅失败:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            选择适合你的<span className="gradient-text"> 方案</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            从免费版开始，随时升级以获得更多功能
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card p-8 ${
                plan.popular ? "border-2 border-purple-500/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-semibold">
                  最受欢迎
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                <plan.icon className="w-7 h-7 text-white" />
              </div>

              {/* Plan Info */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 ${plan.ctaStyle} text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2`}
              >
                {loading === plan.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  plan.cta
                )}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            常见问题
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "免费版有什么限制？",
                a: "免费版每日可生成 5 张图像，使用标准质量，带有水印。",
              },
              {
                q: "可以随时取消订阅吗？",
                a: "是的，你可以随时在账户设置中取消订阅，取消后将在当前周期结束时生效。",
              },
              {
                q: "支持哪些支付方式？",
                a: "我们支持支付宝、微信支付、银行卡等多种支付方式。",
              },
              {
                q: "生成的图像可以商用吗？",
                a: "专业版用户拥有生成图像的商业授权，可用于商业用途。",
              },
            ].map((item) => (
              <div key={item.q} className="glass-card p-6">
                <h4 className="text-white font-semibold mb-2">{item.q}</h4>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}