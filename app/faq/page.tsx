import FAQCTASection from "../src/sections/faq/FAQCTASection";
import FAQHero from "../src/sections/faq/FAQHero";
import FAQSection from "../src/sections/faq/FAQSection";

export default function FAQPage() {
  return (
    <div className="bg-neutral-100">
      <FAQHero />
      
      <FAQSection />
      <FAQCTASection />
    </div>
  );
}
