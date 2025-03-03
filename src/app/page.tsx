import Explore from "./companents/explore/Explore";
import Header from "./companents/header/Header";
import Preview from "./companents/preview/Preview";
import Provide from "./companents/provide/Provide";
import Qestion from "./companents/qestion/Qestion";

export default function Home() {
  return (
    <div>
      <Header />
      <Preview />
      <Explore />
      <Provide />
      <Qestion />
    </div>
  );
}
