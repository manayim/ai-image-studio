import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where = userId ? { userId } : {};

    const images = await prisma.image.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    const total = await prisma.image.count({ where });

    return NextResponse.json({
      success: true,
      images,
      total,
    });
  } catch (error) {
    console.error("获取图像失败:", error);
    return NextResponse.json(
      { error: "获取图像失败" },
      { status: 500 }
    );
  }
}