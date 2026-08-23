// src/components/consultations/ConsultantDirectory.tsx
"use client";

import { useMemo, useState } from "react";
import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import {SectionLede} from "@/app/src/components/layout/SectionLede";
import {
  CONSULTANTS,
  CONSULTATION_CATEGORIES,
  type ConsultationCategoryId,
} from "@/app/src/data/consultants";
import ConsultantFilters from "@/app/src/sections/consultations/ConsultantFilters";
import ConsultantCard from "@/app/src/components/consultations/ConsultantCard";

export default function ConsultantDirectory() {
  const [activeCategory, setActiveCategory] = useState<ConsultationCategoryId | "all">("all");
  const [query, setQuery] = useState("");

  // فلاتر تُعرض فقط للمجالات التي يوجد فيها خبراء فعليًا — لا نفترض توفرًا غير حقيقي
  const filterableCategories = useMemo(
    () =>
      CONSULTATION_CATEGORIES.filter(
        (category) =>
          category.available && CONSULTANTS.some((c) => c.categories.includes(category.id))
      ),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CONSULTANTS.filter((consultant) => {
      const matchesCategory =
        activeCategory === "all" || consultant.categories.includes(activeCategory);
      const matchesQuery =
        q.length === 0 ||
        consultant.name.toLowerCase().includes(q) ||
        consultant.specialty.toLowerCase().includes(q) ||
        consultant.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section id="experts" dir="rtl" className="relative bg-neutral-0 py-24 lg:py-32 border-t border-neutral-100">
      <SectionContainer>
        <div className="max-w-2xl">
          <SectionLede
            lead="اختر الخبير المناسب لك."
            body="كل خبير في راوي يأتي بخبرة حقيقية في المجال الذي يقدمه، لتكون الاستشارة مبنية على تجربة ومعرفة، لا على نصائح عامة."
          />
        </div>

        <div className="mt-12">
          <ConsultantFilters
            categories={filterableCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            query={query}
            onQueryChange={setQuery}
          />
        </div>

        <div className="mt-12">
          {results.length === 0 ? (
            <p className="font-thmanyah-text text-body text-neutral-500 py-10">
              لا يوجد خبراء مطابقون لبحثك حاليًا. جرّب مجالًا آخر أو امسح كلمة البحث.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
              {results.map((consultant, i) => (
                <ConsultantCard
                  key={consultant.slug}
                  consultant={consultant}
                  categories={CONSULTATION_CATEGORIES}
                  offset={i % 2 === 1}
                />
              ))}
            </div>
          )}
        </div>
      </SectionContainer>
    </section>
  );
}