import { PiSpinnerGap } from "react-icons/pi";

export default function Loading() {
  return (
    <section className="flex h-[25vh] items-center justify-center">
      <PiSpinnerGap className="animate-spin text-4xl" />
    </section>
  );
}
