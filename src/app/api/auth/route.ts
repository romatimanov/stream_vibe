import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.TMDB_API_KEY) {
      console.error("Ошибка: TMDB_API_KEY отсутствует в .env.local");
      return NextResponse.json(
        { error: "Ошибка сервера: API ключ отсутствует" },
        { status: 500 }
      );
    }

    const tokenResponse = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`
    );

    console.log("Request Token Response:", tokenResponse.data);

    if (!tokenResponse.data.success) {
      return NextResponse.json(
        {
          error: "Ошибка получения request_token",
          details: tokenResponse.data,
        },
        { status: 500 }
      );
    }

    const requestToken = tokenResponse.data.request_token;

    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;

    return NextResponse.json({ requestToken, authUrl });
  } catch (error: any) {
    console.error("Ошибка TMDb API:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Ошибка TMDb API",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
