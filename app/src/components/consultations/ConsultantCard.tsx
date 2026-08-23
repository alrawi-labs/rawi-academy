// src/components/consultations/ConsultantCard.tsx
import Link from "next/link";
import Button from "@/app/src/components/ui/Button";
import type { Consultant, ConsultationCategory } from "@/app/src/data/consultants";

interface ConsultantCardProps {
  consultant: Consultant;
  categories: ConsultationCategory[];
  /** كسر التماثل بين البطاقات بدون استخدام صور مختلفة الحجم بشكل عشوائي */
  offset?: boolean;
}

export default function ConsultantCard({ consultant, categories, offset }: ConsultantCardProps) {
  const categoryLabels = consultant.categories
    .map((id) => categories.find((c) => c.id === id)?.label)
    .filter(Boolean);

  return (
    <article
      className={`group relative border border-neutral-200 rounded-lg bg-neutral-0 overflow-hidden transition-colors duration-300 hover:border-primary/40 ${
        offset ? "sm:mt-10" : ""
      }`}
    >
      {/* المنطقة كاملة قابلة للنقر لفتح صفحة الخبير — توضع أولًا في الـ DOM كي يظل زر الحجز فوقها بصريًا */}
      <Link
        href={`/consultations/${consultant.slug}`}
        className="absolute inset-0"
        aria-label={`عرض صفحة ${consultant.name}`}
        tabIndex={-1}
      />

      <div className="flex flex-col sm:flex-row-reverse">
        {/* الصورة — عمودية، ليست دائرية، توضع كجزء من التركيب لا كأيقونة */}
        <div
          className="sm:w-[38%] aspect-[4/5] sm:aspect-auto bg-neutral-100 bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url(${consultant.portraitUrl})` }}
          role="img"
          aria-label={consultant.name}
        />

        <div className="flex-1 p-6 sm:p-7 flex flex-col">
          <div>
            <h3 className="font-thmanyah-display font-bold text-h3-sm text-neutral-900">
              {consultant.name}
            </h3>
            <p className="mt-1 font-thmanyah-sans text-caption text-neutral-500">
              {consultant.title} · {consultant.specialty}
            </p>
          </div>

          <p className="mt-4 font-thmanyah-text text-body text-neutral-600 leading-relaxed">
            {consultant.bio}
          </p>

          {consultant.helpsWith.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {consultant.helpsWith.slice(0, 3).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-thmanyah-text text-caption text-neutral-600"
                >
                  <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {categoryLabels.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="font-thmanyah-sans text-micro text-neutral-500 border border-neutral-200 rounded-full px-2.5 py-1"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-neutral-200 flex items-center justify-between gap-4">
            <div className="font-thmanyah-sans text-caption text-neutral-500">
              <span>{consultant.durationMinutes} دقيقة</span>
              {consultant.price !== null && (
                <>
                  <span className="mx-1.5 text-neutral-300">·</span>
                  <span className="text-neutral-900 font-medium">
                    {consultant.price} {consultant.currency === "SAR" ? "ر.س" : "$"}
                  </span>
                </>
              )}
            </div>

            <Button href={`/consultations/${consultant.slug}`} variant="outline" size="sm" className="relative z-10">
              احجز استشارة
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}