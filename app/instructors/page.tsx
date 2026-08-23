import { InstructorsSection } from "../src/sections/consultations/InstructorsSection";
import { InstructorsHero } from "../src/sections/instructors/InstructorsHero";

export default function InstructorsPage() {
  return (
    <main className="bg-neutral-100" >
<InstructorsHero />
<InstructorsSection />
    </main>
  );
}