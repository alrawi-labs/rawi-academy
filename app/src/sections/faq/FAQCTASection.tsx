"use client";

import CTAPanelSection from "@/app/src/components/CTAPanelSection";

export default function FAQCTASection() {
  return (
    <div className="bg-neutral-100 pb-10">
      <CTAPanelSection
        backgroundImage="/backgrounds/bg-1.png"
        title="لم تجد ما تبحث عنه؟"
        description="لا تتردد في سؤالنا. اكتب لنا ما يدور في بالك، وسيساعدك فريق راوي في الحصول على الإجابة التي تحتاجها."
        buttonHref="/contact"
        buttonText="اسأل فريق راوي"
        buttonVariant="primary"
        panelTone="dark"
      />
    </div>
  );
}
