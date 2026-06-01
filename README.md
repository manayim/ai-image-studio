# 🎨 AI Image Studio

一个基于 Next.js 的 AI 图像生成平台，支持多种 AI 模型，提供免费/付费的图像生成服务。

![AI Image Studio](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

## ✨ 功能特点

- 🖼️ **AI 图像生成** - 支持 DALL-E 3、Stable Diffusion 等多种模型
- 🎬 **AI 视频生成** - 接入 Runway、Kling 等视频生成模型
- 🔐 **用户系统** - 完整的注册/登录功能
- 💳 **会员订阅** - 免费版/基础版/专业版
- 📊 **用户仪表板** - 查看使用统计和生成历史
- 📱 **响应式设计** - 完美适配桌面和移动端

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/ai-image-studio.git
cd ai-image-studio
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local`，并填入你的 API Key：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```env
# OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key

# Stripe API Key (可选，用于支付功能)
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_BASIC_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx

# 应用 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 运行数据库迁移

```bash
npx prisma migrate dev
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 🎉

## 📁 项目结构

```
ai-image-studio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── generate/          # 图像生成页
│   │   ├── history/           # 历史记录页
│   │   ├── dashboard/         # 用户仪表板
│   │   ├── pricing/           # 定价页
│   │   ├── auth/              # 认证页面
│   │   └── api/               # API 路由
│   ├── components/            # 可复用组件
│   └── lib/                   # 工具函数
├── prisma/                    # 数据库 Schema
└── public/                    # 静态资源
```

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | ✅ |
| `STRIPE_SECRET_KEY` | Stripe API 密钥 | ❌ |
| `STRIPE_BASIC_PRICE_ID` | 基础版价格 ID | ❌ |
| `STRIPE_PRO_PRICE_ID` | 专业版价格 ID | ❌ |
| `NEXT_PUBLIC_APP_URL` | 应用 URL | ✅ |

### 获取 API Key

1. **OpenAI API Key**
   - 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
   - 创建新的 API Key

2. **Stripe API Key** (可选)
   - 访问 [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - 获取 Secret Key

## 🚢 部署到 Vercel

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署完成！

## 📝 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com