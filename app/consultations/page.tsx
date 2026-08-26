import ConsultationsHero from "@/app/src/sections/consultations/ConsultationsHero";
import ConsultationValue from "@/app/src/sections/consultations/ConsultationValue";
import HowConsultationWorks from "@/app/src/sections/consultations/HowConsultationWorks";
import ConsultationCategories from "@/app/src/sections/consultations/ConsultationCategories";
import FeaturedConsultant from "@/app/src/sections/consultations/FeaturedConsultant";
import ConsultantDirectory from "@/app/src/sections/consultations/ConsultantDirectory";
import ConsultantFilters from "@/app/src/sections/consultations/ConsultantFilters";
import InstructorsSpotlightSection from '@/app/src/sections/languages/InstructorsSpotlightSection';
import { InstructorsSection } from "../src/sections/consultations/InstructorsSection";

export default function ConsultationsPage() {
  return (
    <main dir="rtl">
      {/* 01 — تعريف الخدمة */}
      <ConsultationsHero />

      {/* 02 — لماذا تستحق الاستشارة؟ */}
      <ConsultationValue />

      {/* 03 — كيف تتم الاستشارة؟ */}
      <HowConsultationWorks />

      {/* 04 — المجالات التي يمكن الاستشارة فيها */}
      <ConsultationCategories />

      {/* 05 — المدرسين */}
      <InstructorsSection />
      {/* <FeaturedConsultant /> */}
    </main>
  );
}
