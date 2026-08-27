import { InstructorsSection } from "../src/sections/consultations/InstructorsSection";
import { InstructorsHero } from "../src/sections/instructors/InstructorsHero";
import { buildMetadata } from "@/app/src/lib/seo";

export const metadata = buildMetadata("instructors");

export default function InstructorsPage() {
  return (
    <main className="bg-neutral-100">
      <InstructorsHero />
      <InstructorsSection />
    </main>
  );
}
