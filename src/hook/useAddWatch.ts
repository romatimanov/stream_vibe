export function useAddWatch(movieId: number, addWatch: any, refetch: any) {
  const accountId = localStorage.getItem("accountId");

  if (!accountId) return;

  addWatch({ accountId, movieId })
    .unwrap()
    .then(() => {
      refetch();
    })
    .catch((error: any) => {
      console.error("Ошибка добавления в watchlist:", error);
    });
}
