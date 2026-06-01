import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY 环境变量未设置");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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