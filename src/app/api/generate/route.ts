import { NextResponse } from "next/server";
import { generateImage } from "@/lib/openai";

// 内存存储（简化版）
const imageStore: any[] = [];

export async function POST(request: Request) {
  try {
    const { prompt, model = "dall-e-3", size = "1024x1024", quality = "standard" } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "请输入提示词" },
        { status: 400 }
      );
    }

    // 调用 OpenAI 生成图像
    const images = await generateImage({
      prompt,
      model: model as "dall-e-3",
      size: size as "1024x1024" | "1792x1024" | "1024x1792",
      quality: quality as "standard" | "hd",
    });

    // 保存到内存
    const savedImages = images.map((img) => ({
      ...img,
      prompt,
      model,
      createdAt: new Date().toISOString(),
    }));
    imageStore.push(...savedImages);

    return NextResponse.json({
      success: true,
      images: savedImages,
    });
  } catch (error: any) {
    console.error("生成失败:", error);
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: "请求过于频繁，请稍后重试" },
        { status: 429 }
      );
    }
    
    if (error?.status === 400) {
      return NextResponse.json(
        { error: "提示词不符合安全政策，请修改后重试" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "图像生成失败，请稍后重试" },
      { status: 500 }
    );
  }
}