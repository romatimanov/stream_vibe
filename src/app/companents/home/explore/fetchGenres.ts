const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchMovies(genreId: number, language: string) {
  const url = new URL(`${BASE_URL}/3/discover/movie`);
  url.searchParams.append("api_key", API_KEY!);
  url.searchParams.append("with_genres", genreId.toString());
  url.searchParams.append("language", language);

  try {
    const response = await fetch(url.toString(), { method: "GET" });
    if (!response.ok) throw new Error("Ошибка при получении фильмов");
    return await response.json();
  } catch (error) {
    return null;
  }
}
