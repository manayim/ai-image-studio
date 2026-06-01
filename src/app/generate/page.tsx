"use client";

import { useState } from "react";
import { Wand2, Download, Copy, RefreshCw, Image, Video, Settings } from "lucide-react";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  revised_prompt?: string;
  model: string;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedModel, setSelectedModel] = useState("dall-e-3");
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [selectedQuality, setSelectedQuality] = useState("standard");
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          size: selectedSize,
          quality: selectedQuality,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "生成失败");
      }

      if (data.success) {
        const newImages = data.images.map((img: any) => ({
          ...img,
          prompt,
          model: selectedModel,
        }));
        setGeneratedImages([...newImages, ...generatedImages]);
      }
    } catch (err: any) {
      setError(err.message || "生成失败，请稍后重试");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (url: string, id: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `ai-image-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("下载失败:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI <span className="gradient-text">图像生成</span>
          </h1>
          <p className="text-gray-400">描述你想要的图像，AI 为你创作</p>
        </div>

        {/* Generation Area */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("image")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "image"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <Image className="w-4 h-4" />
                AI 图片
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "video"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <Video className="w-4 h-4" />
                AI 视频
              </button>
            </div>

            {/* Input Area */}
            <div className="flex flex-col gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述你想生成的图像... 例如：一只可爱的猫咪在海边看日落，动漫风格"
                className="w-full h-32 px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Settings Toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                {showSettings ? "隐藏设置" : "高级设置"}
              </button>

              {/* Advanced Settings */}
              {showSettings && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">模型</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none"
                    >
                      <option value="dall-e-3">DALL-E 3</option>
                      <option value="dall-e-2">DALL-E 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">尺寸</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none"
                    >
                      <option value="1024x1024">1024×1024 (1:1)</option>
                      <option value="1792x1024">1792×1024 (16:9)</option>
                      <option value="1024x1792">1024×1792 (9:16)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">质量</label>
                    <select
                      value={selectedQuality}
                      onChange={(e) => setSelectedQuality(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none"
                    >
                      <option value="standard">标准</option>
                      <option value="hd">高清 (HD)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      生成图像
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Images Grid */}
        {generatedImages.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">生成结果</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <div
                  key={image.id}
                  className="glass-card overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleDownload(image.url, image.id)}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(image.url)}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Copy className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {image.revised_prompt || image.prompt}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {image.model} • {selectedSize}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedImages.length === 0 && (
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              输入提示词开始创作你的第一张 AI 图像
            </p>
          </div>
        )}
      </div>
    </div>
  );
}