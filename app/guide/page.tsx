import Link from "next/link";
import Button from "@/app/src/components/ui/Button";
import { SectionContainer } from "@/app/src/components/layout/SectionContainer";
import { PremiumGradientBar } from "@/app/src/components/3D/PremiumGradientBar";
import { LINKS } from "@/app/src/lib/links";
import GuideBuildVisual from "../src/components/3D/GuideBuildVisual";
import { buildMetadata } from "@/app/src/lib/seo";

export const metadata = buildMetadata("guide");

export default function GuidePage() {
  return (
    <main dir="rtl" className="bg-neutral-100">
      <section className="relative overflow-hidden bg-neutral-100">
        <PremiumGradientBar offsetY={220} />

        <SectionContainer>
          <div className="relative grid grid-cols-1 items-start gap-10 py-24 sm:py-28 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 lg:py-32">
            <div className="max-w-2xl lg:pt-16">
              <Link
                href={LINKS.home}
                className="text-caption text-neutral-500 transition-colors hover:text-neutral-700"
              >
                → الرئيسية
              </Link>

              <h1 className="mt-6 font-thmanyah-display text-h2-sm font-bold leading-[1.25] text-neutral-900 sm:text-hero">
                نحن نبنيها الآن.
              </h1>

              <p className="mt-6 max-w-lg font-thmanyah-text text-body leading-[1.9] text-neutral-700 sm:text-lead sm:leading-[1.8]">
                بعض التجارب تستحق أن نأخذ وقتنا في بنائها.
                <br />
                ستجد دليلك الذكي هنا قريبًا، عندما يصبح جاهزًا بالشكل الذي يليق بتجربتك مع راوي.
              </p>

              <div className="mt-10">
                <Button href={LINKS.home} variant="outline" size="md">
                  العودة إلى راوي
                </Button>
              </div>
            </div>

            <div className="relative lg:mt-14">
              <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl">
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_30%,transparent_55%)]" />
                <div className="relative z-10 p-7 sm:p-8">
                  <GuideBuildVisual />
                </div>
              </div>

          
            </div>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}