import Qestion from "@/companents/home/qestion/Qestion";
import StartWatch from "@/companents/startWatch/StartWatch";
import { SupportInfo } from "@/companents/support/supportInfo/SupportInfo";

export default function Support() {
  return (
    <>
      <SupportInfo />
      <Qestion id="qestion" />
      <StartWatch />
    </>
  );
}
