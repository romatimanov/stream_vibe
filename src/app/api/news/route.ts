import { NextRequest, NextResponse } from "next/server";

const NEWS_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "en";
  const page = searchParams.get("page") || "1";

  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=movies&language=${language}&sortBy=publishedAt&pageSize=5&page=${page}&apiKey=${NEWS_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ошибка запроса: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
