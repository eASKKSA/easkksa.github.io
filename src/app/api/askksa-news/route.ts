import { NextResponse } from "next/server";
import { getASKKSANews } from "@/lib/free-news";

export async function GET() {
  try {
    const news = await getASKKSANews();

    // Log para debug (opcional)
    console.log(`Retornando ${news.length} notícias ordenadas por data`);

    return NextResponse.json(news, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Erro na API ASKKSA News:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export const revalidate = 3600; // 1 hour
