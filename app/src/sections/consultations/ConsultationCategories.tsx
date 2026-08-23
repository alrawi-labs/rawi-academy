// src/components/consultations/ConsultationCategories.tsx
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import {SectionLede} from "@/app/src/components/layout/SectionLede";
import { CONSULTATION_CATEGORIES } from "@/app/src/data/consultants";

export default function ConsultationCategories() {
  return (
    <section dir="rtl" className="relative bg-neutral-0 py-24 lg:py-32 border-t border-neutral-100">
      <SectionContainer>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* عمود العنوان — ثابت أثناء التمرير، غير متمركز */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLede lead="في ماذا يمكن أن يساعدك خبراؤنا؟" />
            </div>
          </div>

          {/* قائمة تحريرية بفواصل، وليست بطاقات أيقونات */}
          <div className="lg:col-span-8">
            <ul className="divide-y divide-neutral-100 border-t border-neutral-100">
              {CONSULTATION_CATEGORIES.map((category, i) => (
                <li
                  key={category.id}
                  className="group flex items-start gap-6 py-6"
                >
                  <span className="font-thmanyah-display text-caption text-neutral-300 pt-1 shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-thmanyah-display font-bold text-h3-sm text-neutral-900">
                        {category.label}
                      </h3>
                   
                    </div>
                    <p className="mt-1.5 font-thmanyah-text text-body text-neutral-600 leading-relaxed max-w-lg">
                      {category.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}