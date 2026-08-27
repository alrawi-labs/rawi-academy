import FAQCTASection from "../src/sections/faq/FAQCTASection";
import FAQHero from "../src/sections/faq/FAQHero";
import FAQSection from "../src/sections/faq/FAQSection";
import { buildMetadata } from "@/app/src/lib/seo";

export const metadata = buildMetadata("faq");

export default function FAQPage() {
  return (
    <div className="bg-neutral-100">
      <FAQHero />
      
      <FAQSection />
      <FAQCTASection />
    </div>
  );
}
