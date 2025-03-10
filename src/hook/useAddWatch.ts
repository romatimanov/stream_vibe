export function useAddWatch(
  movieId: number,
  addWatch: any,
  refetch: any,
  isWatched: boolean
) {
  const accountId = localStorage.getItem("accountId");

  if (!accountId) return;

  addWatch({ accountId, movieId, watchlist: !isWatched })
    .unwrap()
    .then(() => {
      refetch();
    })
    .catch((error: any) => {
      console.error("Ошибка обновления watchlist:", error);
    });
}
