import { NextResponse } from "next/server";
import { hashPassword, generateToken } from "@/lib/auth";

// 内存存储（简化版）
const userStore: any[] = [];

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "请填写邮箱和密码" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "密码至少需要 6 个字符" },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在
    const existingUser = userStore.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "该邮箱已被注册" },
        { status: 400 }
      );
    }

    // 创建用户
    const hashedPassword = await hashPassword(password);
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      createdAt: new Date().toISOString(),
    };
    userStore.push(user);

    // 生成 token
    const token = generateToken(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error("注册失败:", error);
    return NextResponse.json(
      { error: "注册失败，请稍后重试" },
      { status: 500 }
    );
  }
}