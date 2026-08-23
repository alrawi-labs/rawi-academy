"use client";

import { SectionContainer } from "../components/layout/SectionContainer";
import { SectionLede } from "../components/layout/SectionLede";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { instructors } from "../data/instructors";

// TeamSection sadece öne çıkan (featured: true) eğitmenleri gösterir.
// Kimin öne çıkacağını değiştirmek için tek yapman gereken
// app/src/data/instructors.ts içindeki ilgili kaydın `featured` alanını
// true/false yapmak — burada başka bir şey değiştirmene gerek yok.
const featuredInstructors = instructors.filter((person) => person.featured);

export default function TeamSection() {
  return (
    <section dir="rtl" className="relative pt-28">
      <SectionContainer>
        <SectionLede
          lead="كادرنا المميز"
          sub="خلف كل درسٍ في راوي شخصٌ اختبر ما يعلّمه فعليًا، في شركاتٍ ومؤسساتٍ حقيقية، قبل أن يقف أمام الطالب."
          className="mb-16"
        />
        <div className="divide-y divide-neutral-200">
          {featuredInstructors.map((person, i) => {
            const isReversed = i % 2 === 1;
            return (
              <div
                key={person.id}
                className="group relative py-16 overflow-hidden"
              >
                {/* Arkaplan: Framer Motion'ın tamamen dışında, düz img, sabit görünür */}
                <img
                  src="/backgrounds/bg-1.png"
                  alt=""
                  aria-hidden="true"
                  className={`opacity-40 pointer-events-none h-full select-none absolute top-0 z-0 ${
                    isReversed ? "right-0 scale-x-[-1]" : "left-0"
                  } w-70 sm:w-95`}
                />

                {/* Animasyonlu içerik: motion.div + whileInView */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`group relative z-10 flex flex-col ${
                    isReversed ? "sm:flex-row-reverse sm:pr-15" : "sm:flex-row"
                  } items-center sm:items-start gap-10 sm:gap-16 px-5 sm:px-0`}
                  // ⬆️ DEĞİŞTİ: px-5 sm:px-0 eklendi. Mobilde görsel+metin
                  // ekranın kenarına çok yakın duruyordu; sm ve üzerinde
                  // SectionContainer zaten kendi yatay boşluğunu sağladığı
                  // için orada padding'i sıfırlayıp çift boşluk oluşmasını
                  // engelledik.
                >
                  <div className="shrink-0 w-55 sm:w-85">
                    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-100 ring-1 ring-neutral-200 transition-shadow duration-500 group-hover:ring-primary/25">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-right">
                    <span
                      aria-hidden="true"
                      className="hidden sm:block font-thmanyah-display text-hero leading-none text-neutral-300 select-none -mb-5"
                    >
                      “
                    </span>
                    <p className="font-thmanyah-text text-body leading-9 text-neutral-700 max-w-xl mx-auto sm:mx-0">
                      {person.bio}
                    </p>

                    <div className="mt-8">
                      <p className="font-thmanyah-display font-bold text-h3-sm text-neutral-900">
                        {person.name}
                      </p>
                      <p className="font-thmanyah-text text-body text-primary mt-1">
                        {person.role ?? person.title}
                      </p>
                    </div>

                    {person.companies && person.companies.length > 0 && (
                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-5">
                        {person.companies.map((company, idx) => (
                          <span key={company} className="flex items-center gap-3">
                            {idx > 0 && (
                              <span
                                aria-hidden="true"
                                className="w-1 h-1 rounded-full bg-neutral-300"
                              />
                            )}
                            <span className="font-thmanyah-text text-micro tracking-wider uppercase text-neutral-500">
                              {company}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mt-16"
        >
          <Button href="/about_us" variant="primary" size="lg">
            تعلم من الأفضل
          </Button>
        </motion.div>
      </SectionContainer>
    </section>
  );
}