"use client";

import CTAPanelSection from "@/app/src/components/CTAPanelSection";
import { LINKS } from "../../lib/links";
    
export function AboutCTA() {
  return (
    <div className="bg-neutral-100 pb-10">
      <CTAPanelSection
        backgroundImage="/backgrounds/bg-2.png"
        title="التعلّم يبدأ بسؤال"
        description="وربما يكون السؤال الذي تبحث عن إجابته هو أول خطوة في شيء أكبر مما تتوقع"
        buttonHref={LINKS.courses}
        buttonText="ابدأ مع راوي"
        buttonVariant="primary"
        panelTone="dark"
      />
    </div>
  );
}
