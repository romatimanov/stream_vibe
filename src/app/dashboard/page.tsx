import { FavoriteList } from "@/companents/dashboard/favoriteList/FavoriteList";
import { WatchList } from "@/companents/dashboard/watchList/WatchList";

export default function Dashboard() {
  return (
    <div className="container">
      <WatchList />
      <FavoriteList />
    </div>
  );
}
