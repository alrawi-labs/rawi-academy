import {SectionContainer} from "@/app/src/components/layout/SectionContainer";
import Reveal from "@/app/src/components/curriculum/Reveal";

const rows = [
  { title: "شرح أبسط", body: "عندما يحتاج المفهوم إلى طريقة أخرى." },
  { title: "تمارين إضافية", body: "عندما يحتاج الطالب إلى مزيد من الممارسة." },
  { title: "مراجعة موجهة", body: "عندما تظهر فجوة في الفهم." },
  { title: "تقدم مستمر", body: "حتى يعرف الطالب أين وصل وما الخطوة التالية." },
];

export default function PersonalizedSection() {
  return (
    <section dir="rtl" className="py-[120px] max-md:py-16">
      <SectionContainer>
        <div className="grid grid-cols-[.9fr_1.1fr] gap-20 max-md:grid-cols-1 max-md:gap-9">
          <Reveal className="sticky top-[100px] self-start max-md:static">
            <h2 className="font-thmanyah-display text-h2-sm mb-4.5">
              لا يتعلم الجميع بالطريقة نفسها.
            </h2>
            <p className="text-body text-neutral-500">
              صُممت راوي لتتعرف على احتياجات المتعلم وتدعمه بما يناسب
              مستواه، بدل تقديم تجربة واحدة للجميع.
            </p>
          </Reveal>

          <Reveal className="flex flex-col">
            {rows.map((row, i) => (
              <div
                key={row.title}
                className={`py-7 border-t border-neutral-200 ${
                  i === rows.length - 1 ? "border-b" : ""
                }`}
              >
                <h4 className="text-h3-sm text-neutral-900 mb-2">
                  {row.title}
                </h4>
                <p className="text-caption text-neutral-500">{row.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}