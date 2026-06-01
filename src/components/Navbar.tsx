"use client";

import { useState, useEffect } from "react";
import { Sparkles, Menu, X, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 检查登录状态
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI Image Studio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/generate" className="text-gray-300 hover:text-white transition-colors">
              AI 图片
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              AI 视频
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              AI 编辑器
            </a>
            <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              定价
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span>{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  退出
                </button>
              </div>
            ) : (
              <>
                <a href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                  登录
                </a>
                <a
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  免费注册
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <a href="/generate" className="text-gray-300 hover:text-white transition-colors">
                AI 图片
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                AI 视频
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                AI 编辑器
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                定价
              </a>
              <hr className="border-white/10" />
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-5 h-5" />
                    <span>{user.name || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    退出
                  </button>
                </>
              ) : (
                <>
                  <a href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                    登录
                  </a>
                  <a
                    href="/auth/register"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-center"
                  >
                    免费注册
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}