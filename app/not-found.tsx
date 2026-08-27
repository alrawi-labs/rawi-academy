import Link from "next/link";
import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";
import { LINKS } from "@/app/src/lib/links";
import NotFoundVisual from "./src/components/3D/NotFoundVisual";

export const metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main dir="rtl" className="min-h-screen bg-neutral-100">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-neutral-100">
        <PremiumGradientBar offsetY={220} />

        <SectionContainer>
          <div className="relative grid grid-cols-1 items-center gap-10 py-24 sm:py-28 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16">
            <div className="max-w-2xl">
              <Link
                href={LINKS.home}
                className="text-caption text-neutral-500 transition-colors hover:text-neutral-700"
              >
                → الرئيسية
              </Link>

              <h1 className="mt-6 font-thmanyah-display text-h2-sm font-bold leading-[1.25] text-neutral-900 sm:text-hero">
                هذه الصفحة غير موجودة.
              </h1>

              <p className="mt-6 max-w-lg font-thmanyah-text text-body leading-[1.9] text-neutral-700 sm:leading-[1.8]">
                يبدو أن الرابط الذي وصلت منه غير صحيح، أو أن الصفحة تم نقلها
                أو حذفها.
                <br />
                يمكنك العودة إلى الرئيسية أو استكشاف المسارات التعليمية المتاحة.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={LINKS.home} variant="primary" size="md">
                  العودة إلى راوي
                </Button>
                <Button href={LINKS.courses} variant="outline" size="md">
                  استكشف المسارات
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl">
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_30%,transparent_55%)]" />
                <div className="relative z-10 p-7 sm:p-8">
                  <NotFoundVisual />
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}