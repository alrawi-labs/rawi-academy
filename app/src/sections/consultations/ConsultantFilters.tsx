// src/components/consultations/ConsultantFilters.tsx
import type { ConsultationCategory, ConsultationCategoryId } from "@/app/src/data/consultants";

interface ConsultantFiltersProps {
  categories: ConsultationCategory[];
  activeCategory: ConsultationCategoryId | "all";
  onCategoryChange: (id: ConsultationCategoryId | "all") => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export default function ConsultantFilters({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
}: ConsultantFiltersProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* بحث مدمج في السطر التحريري — خط سفلي بدل صندوق Input عام */}
      <div className="max-w-md">
        <label htmlFor="consultant-search" className="sr-only">
          ابحث عن الخبير المناسب
        </label>
        <input
          id="consultant-search"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="ابحث عن الخبير المناسب…"
          className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-900 focus:outline-none focus:ring-0 py-2 font-thmanyah-text text-lead text-neutral-900 placeholder:text-neutral-400 transition-colors"
        />
      </div>

      {/* فلاتر المجالات — قائمة نصية أفقية قابلة للتمرير، الحالة النشطة بخط سفلي وليس تعبئة لونية كاملة */}
      <div className="flex items-center gap-6 overflow-x-auto pb-1 -mb-1">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={`shrink-0 font-thmanyah-sans text-caption pb-1.5 border-b-2 transition-colors ${
            activeCategory === "all"
              ? "border-neutral-900 text-neutral-900"
              : "border-transparent text-neutral-500 hover:text-neutral-700"
          }`}
        >
          كل المجالات
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 font-thmanyah-sans text-caption pb-1.5 border-b-2 transition-colors ${
              activeCategory === category.id
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}