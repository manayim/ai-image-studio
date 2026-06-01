"use client";

import { useState, useEffect } from "react";
import { User, CreditCard, Image, Settings, LogOut, Crown, Zap } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  name: string;
}

interface Subscription {
  plan: string;
  status: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "images" | "settings">("overview");

  useEffect(() => {
    // 检查登录状态
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/auth/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="glass-card p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name || "用户"}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === "overview"
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  概览
                </button>
                <button
                  onClick={() => setActiveTab("images")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === "images"
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <Image className="w-5 h-5" />
                  我的图像
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === "settings"
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  设置
                </button>
                <hr className="border-white/10 my-4" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  退出登录
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">欢迎回来，{user.name || "用户"} 👋</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Image className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">今日生成</p>
                        <p className="text-2xl font-bold text-white">3</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <Crown className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">当前方案</p>
                        <p className="text-2xl font-bold text-white">免费版</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">剩余额度</p>
                        <p className="text-2xl font-bold text-white">2/5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upgrade Card */}
                <div className="glass-card p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">升级到专业版</h3>
                      <p className="text-gray-400">
                        解锁无限生成、4K 高清输出、API 访问等高级功能
                      </p>
                    </div>
                    <a
                      href="/pricing"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      查看方案
                    </a>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">快速开始</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="/generate"
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">生成新图像</p>
                        <p className="text-gray-400 text-sm">使用 AI 创作</p>
                      </div>
                    </a>
                    <a
                      href="/history"
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">查看历史</p>
                        <p className="text-gray-400 text-sm">浏览生成记录</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">我的图像</h1>
                <div className="text-center py-12">
                  <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">暂无生成记录</p>
                  <a
                    href="/generate"
                    className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    开始创作
                  </a>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">设置</h1>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">账户信息</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">用户名</label>
                      <input
                        type="text"
                        defaultValue={user.name || ""}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">邮箱</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-400"
                      />
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all">
                      保存修改
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}