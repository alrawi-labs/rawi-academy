"use client";

import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import CTAPanelSection from "../../components/CTAPanelSection";
import { LINKS } from "../../lib/links";

/**
 * إغلاق الصفحة بلوحة الاتصال القياسية نفسها المستخدمة في أقسام أخرى
 * (`CTAPanelSection`)، حتى تبقى الصفحة متسقة مع بقية الموقع بدل اختراع
 * نمط CTA جديد.
 */

export function HowItWorksFooterCTA() {
  return (
    <section dir="rtl" className="bg-neutral-0 pb-28 lg:pb-36">
      <SectionContainer>
        <CTAPanelSection
          backgroundImage="/backgrounds//bg-19.png"
          title="لا تعرف من أين تبدأ؟ نحن هنا لنساعدك"
          description="اختيار المسار والمستوى المناسب قد لا يكون واضحًا دائمًا. تواصل معنا، وسنساعدك على اختيار ما يناسب أهدافك ومستواك."
          buttonHref={LINKS.support}
          buttonText="تواصل معنا"
          panelTone="dark"
          buttonVariant="primary"
        />
      </SectionContainer>
    </section>
  );
}

export default HowItWorksFooterCTA;
