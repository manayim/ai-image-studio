"use client";

import { useState } from "react";
import { Image, Download, Trash2, Calendar } from "lucide-react";

interface HistoryItem {
  id: string;
  url: string;
  prompt: string;
  model: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([
    // 模拟数据
    {
      id: "1",
      url: "https://picsum.photos/seed/1/400/400",
      prompt: "一只可爱的猫咪在海边看日落",
      model: "GPT Image 2",
      createdAt: "2026-05-29T10:00:00Z",
    },
    {
      id: "2",
      url: "https://picsum.photos/seed/2/400/400",
      prompt: "赛博朋克风格的城市夜景",
      model: "DALL-E 3",
      createdAt: "2026-05-29T11:30:00Z",
    },
    {
      id: "3",
      url: "https://picsum.photos/seed/3/400/400",
      prompt: "水彩风格的山水画",
      model: "Stable Diffusion",
      createdAt: "2026-05-28T15:20:00Z",
    },
  ]);

  const handleDelete = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              生成<span className="gradient-text">历史</span>
            </h1>
            <p className="text-gray-400">查看你之前生成的所有图像</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-5 h-5" />
            <span>共 {history.length} 张图像</span>
          </div>
        </div>

        {/* History Grid */}
        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="glass-card overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.url}
                    alt={item.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                    {item.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{item.model}</span>
                    <span className="text-gray-500 text-xs">
                      {new Date(item.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Image className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">
              还没有生成记录
            </h3>
            <p className="text-gray-400 mb-6">
              去生成你的第一张 AI 图像吧！
            </p>
            <a
              href="/generate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              开始创作
            </a>
          </div>
        )}
      </div>
    </div>
  );
}