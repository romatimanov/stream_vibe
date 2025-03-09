import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { requestToken } = await req.json();

    if (!requestToken) {
      return NextResponse.json(
        { error: "requestToken отсутствует" },
        { status: 400 }
      );
    }

    const sessionResponse = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.TMDB_API_KEY}`,
      { request_token: requestToken }
    );

    console.log("Session Response:", sessionResponse.data);

    if (!sessionResponse.data.success) {
      return NextResponse.json(
        { error: "Ошибка создания session_id", details: sessionResponse.data },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: sessionResponse.data.session_id });
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
