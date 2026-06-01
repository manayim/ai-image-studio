// @ts-nocheck
import OpenAI from "openai";

let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export { openai };

export interface GenerateImageParams {
  prompt: string;
  model?: "dall-e-3" | "gpt-image-2";
  size?: "1024x1024" | "1792x1024" | "1024x1792";
  quality?: "standard" | "hd";
  n?: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  revised_prompt?: string;
}

export async function generateImage(params: GenerateImageParams): Promise<GeneratedImage[]> {
  const {
    prompt,
    model = "dall-e-3",
    size = "1024x1024",
    quality = "standard",
    n = 1,
  } = params;

  // 如果没有配置 OpenAI，返回模拟数据
  if (!openai) {
    return [{
      id: `img_${Date.now()}_0`,
      url: `https://picsum.photos/seed/${Date.now()}/1024/1024`,
      revised_prompt: prompt,
    }];
  }

  try {
    const response = await openai.images.generate({
      model,
      prompt,
      size,
      quality,
      n,
      response_format: "url",
    });

    return (response.data || []).map((img, index) => ({
      id: `img_${Date.now()}_${index}`,
      url: img.url || "",
      revised_prompt: img.revised_prompt,
    }));
  } catch (error) {
    console.error("OpenAI 图像生成失败:", error);
    throw error;
  }
}