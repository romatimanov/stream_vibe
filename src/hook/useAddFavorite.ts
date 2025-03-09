export function useAddFavorite(
  movieId: number,
  addFavorite: any,
  refetch: any
) {
  const accountId = localStorage.getItem("accountId");

  if (!accountId) return;

  addFavorite({ accountId, movieId })
    .unwrap()
    .then(() => {
      refetch();
    })
    .catch((error: any) => {
      console.error("Ошибка добавления в watchlist:", error);
    });
}
