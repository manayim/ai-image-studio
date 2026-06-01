"use client";

import { useState } from "react";
import { Sparkles, Image, Video, Wand2, Zap, Globe, Star } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    // 跳转到生成页面
    window.location.href = `/generate?prompt=${encodeURIComponent(prompt)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI Image Studio</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            用 AI 创造
            <span className="gradient-text"> 无限可能</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            在几秒钟内创建令人惊叹的 AI 生成图像
            <br />
            <span className="text-purple-400">全球首个无限免费 AI 图像生成器</span>
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["100% 免费", "无需登录", "无限生成", "多模型支持"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Generation Input */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述你想生成的图像..."
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      生成中...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      生成
                    </>
                  )}
                </button>
              </div>

              {/* Options */}
              <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">
                    <Image className="w-4 h-4" />
                    AI 图片
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">
                    <Video className="w-4 h-4" />
                    AI 视频
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>模型:</span>
                  <select className="bg-white/5 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none">
                    <option>GPT Image 2</option>
                    <option>DALL-E 3</option>
                    <option>Stable Diffusion</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            为什么选择 <span className="gradient-text">AI Image Studio</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:glow transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">极速生成</h3>
              <p className="text-gray-400">
                采用最新 AI 模型，秒级生成高质量图像，让创意即时呈现
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:glow transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">多模型支持</h3>
              <p className="text-gray-400">
                集成 GPT Image、DALL-E、Stable Diffusion 等顶级模型
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:glow transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">免费使用</h3>
              <p className="text-gray-400">
                无需注册，每日免费生成，让每个人都能享受 AI 创作乐趣
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            汇聚全球顶尖 <span className="gradient-text">AI 模型</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "GPT Image 2", desc: "精准提示词、清晰文字", color: "from-green-500 to-emerald-500" },
              { name: "DALL-E 3", desc: "创意无限、风格多样", color: "from-blue-500 to-indigo-500" },
              { name: "Stable Diffusion", desc: "开源强大、高度可控", color: "from-purple-500 to-violet-500" },
              { name: "Midjourney", desc: "艺术感强、品质卓越", color: "from-pink-500 to-rose-500" },
              { name: "Flux", desc: "快速生成、效果稳定", color: "from-cyan-500 to-teal-500" },
              { name: "Seedream", desc: "电影感写实、光影张力", color: "from-amber-500 to-orange-500" },
              { name: "Kling Video", desc: "AI 视频生成", color: "from-red-500 to-pink-500" },
              { name: "Runway", desc: "专业视频创作", color: "from-indigo-500 to-purple-500" },
            ].map((model) => (
              <div
                key={model.name}
                className="glass-card p-6 hover:glow transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">{model.name}</h4>
                <p className="text-gray-400 text-sm">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好开始创作了吗？
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              无需注册，立即体验 AI 图像生成的魅力
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all text-lg">
              免费开始使用
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}