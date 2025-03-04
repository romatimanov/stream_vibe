import Explore from "./companents/explore/Explore";
import Header from "./companents/header/Header";
import Plan from "./companents/plan/Plan";
import Preview from "./companents/preview/Preview";
import Provide from "./companents/provide/Provide";
import Qestion from "./companents/qestion/Qestion";
import Trial from "./companents/trial/Treal";

export default function Home() {
  return (
    <div>
      <Preview />
      <Explore />
      <Provide />
      <Qestion />
      <Plan />
      <Trial />
    </div>
  );
}
