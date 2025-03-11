"use client";

import Explore from "@/companents/home/explore/Explore";
import Plan from "@/companents/home/plan/Plan";
import Preview from "@/companents/home/preview/Preview";
import Provide from "@/companents/home/provide/Provide";
import Qestion from "@/companents/home/qestion/Qestion";
import StartWatch from "@/companents/startWatch/StartWatch";

export default function HomePage() {
  return (
    <>
      <Preview />
      <Explore id="categories" />
      <Provide id="devices" />
      <Qestion id="qestion" />
      <Plan id="pricing" />
      <StartWatch />
    </>
  );
}
