import Explore from "@/app/companents/home/explore/Explore";
import Plan from "@/app/companents/home/plan/Plan";
import Preview from "@/app/companents/home/preview/Preview";
import Provide from "@/app/companents/home/provide/Provide";
import Qestion from "@/app/companents/home/qestion/Qestion";
import Trial from "@/app/companents/home/trial/Treal";

export function HomePage() {
  return (
    <>
      <Preview />
      <Explore />
      <Provide />
      <Qestion />
      <Plan />
      <Trial />
    </>
  );
}
