"use client";

/**
 * Apple / Stripe kayıt sayfalarındaki "fotoğraf + bindirilmiş metin" kart
 * dilini referans alır. Arka planlar açık/pastel gradyan görseller
 * olduğundan metin KOYU renkte yazılıyor ve okunabilirlik için herhangi
 * bir karartma (scrim) katmanı KULLANILMIYOR — arka planın kendi
 * açıklığı yeterli kontrastı sağlıyor.
 *
 * İlk kart (اختبارات) için referans görseldeki bileşik illüstrasyon
 * birebir kod olarak yeniden üretildi: soru kartı (radio seçenekler +
 * ilerleme çubuğu), sağ üstte çakışan "٪92" başarı rozeti, ve sağda
 * mor konturlu bir avatar figürü. Bu sadece görsel bir kompozisyon
 * olduğu için (gerçek okunabilir bir arayüz değil) iç hizalama bilinçli
 * olarak orijinal görseldeki gibi LTR bırakıldı.
 *
 * Tüm renkler globals.css içindeki CSS değişkenlerine (tema renklerine)
 * bağlandı; birebir eşleşme olmayan yerlerde paletteki en yakın renk
 * kullanıldı. Aynı şekilde metin boyutları da tema tipografi ölçeğindeki
 * (--text-*) en yakın adıma bağlandı.
 *
 * Arka plan fotoğrafını kendiniz ekleyeceğiniz için `backgroundImage`
 * alanını boş bıraktım — CSS class'ı üzerinden kendi görselinizi
 * bağlayabilirsiniz. Görsel gelene kadar açık, nötr bir yer tutucu
 * kullanılıyor.
 */

type Feature = {
  title: string;
  description: string;
  status: string;
  statusTone: "neutral" | "live";
  backgroundImage?: string; // örn: "/features/tests.jpg"
};

const FEATURES: Feature[] = [
  {
    title: "اختبارات تقيس الفهم",
    description:
      "اختبارات مدروسة تكشف نقاط القوة، وتوضح ما يحتاج إلى مراجعة، لتصبح كل خطوة مبنية على فهمٍ حقيقي.",
    status: "٨٦٪ من الإجابات صحيحة",
    statusTone: "neutral",
    backgroundImage: "/backgrounds/bg-6.png",
  },
  {
    title: "شهادات التخرج",
    description:
      "يحصل الطالب على شهادة إتمام الدورة وإثبات مستواه، لتكون انعكاسًا لما تعلّمه وما أنجزه.",
    status: "شهادة رقم ٤٨٢١ · موثّقة",
    statusTone: "neutral",
    backgroundImage: "/backgrounds/bg-7.png",
  },
  {
    title: "مجتمع ينمو معك",
    description:
      "انضم إلى مجتمعٍ يشارك المعرفة، ويجيب عن الأسئلة، ويحفّزك على الاستمرار، لتبقى محاطًا بمن يسير معك في الرحلة.",
    status: "١٢٨ عضوًا نشطًا الآن",
    statusTone: "live",
    backgroundImage: "/backgrounds/bg-8.png",
  },
];

const ANSWER_ROWS = [
  { selected: false, width: "82%" },
  { selected: false, width: "62%" },
  { selected: true, width: "74%" },
  { selected: false, width: "54%" },
];

function TestIllustration() {
  return (
    <div className="relative z-10 mt-4 flex flex-1 items-center justify-center px-5 pb-5 sm:px-6 sm:pb-6">
      <div className="relative w-full aspect-660/798">
        {/* Sağdaki avatar figürü */}
        {/* Avatar figürü — premium gradyan + glow tekniği */}
        <svg
          className="absolute"
          style={{
            left: "56%",
            top: "42%",
            width: "40%",
            aspectRatio: "200 / 260",
          }}
          viewBox="0 0 200 260"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="charGradCert" x1="6" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-purple)" />
              <stop offset="45%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-alt-hover)" />
            </linearGradient>
            <filter
              id="charGlowCert"
              x="-80%"
              y="-80%"
              width="260%"
              height="260%"
            >
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
          </defs>

          <ellipse
            cx="100"
            cy="248"
            rx="62"
            ry="10"
            fill="var(--color-primary)"
            opacity="0.12"
          />

          {/* arka glow kopyası */}
          <path
            d="M28 246c0-58 32-98 72-98s72 40 72 98"
            stroke="url(#charGradCert)"
            strokeWidth="10"
            strokeOpacity="0.32"
            filter="url(#charGlowCert)"
          />
          <circle
            cx="100"
            cy="78"
            r="46"
            stroke="url(#charGradCert)"
            strokeWidth="10"
            strokeOpacity="0.28"
            filter="url(#charGlowCert)"
          />

          {/* keskin ön çizgi */}
          <path
            d="M28 246c0-58 32-98 72-98s72 40 72 98"
            stroke="url(#charGradCert)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* parlaklık vurgusu */}
          <path
            d="M40 240c-6-46 4-82 26-100"
            stroke="var(--color-primary-light)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* yaka */}
          <path
            d="M84 162L100 180L116 162"
            stroke="url(#charGradCert)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="100"
            cy="78"
            r="46"
            stroke="url(#charGradCert)"
            strokeWidth="3.5"
          />
        </svg>

        {/* Soru kartı */}
        <div
          dir="ltr"
          className="absolute flex flex-col rounded-2xl bg-neutral-0 p-4 shadow-[0_25px_50px_-20px_var(--color-primary)]/35 sm:p-5"
          style={{ left: "3%", top: "8%", width: "51%", height: "76%" }}
        >
          <span className="absolute -left-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-accent-orange" />
          <span className="absolute -bottom-1.5 -left-1.5 h-2 w-2 rounded-full bg-primary-light" />

          <p className="font-thmanyah-text text-micro font-bold text-neutral-900 sm:text-caption">
            السؤال 5 من 10
          </p>
          <div className="mt-2.5 h-1.5 w-[68%] rounded-full bg-primary-light" />

          <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
            {ANSWER_ROWS.map((row, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 rounded-lg px-1.5 py-1 -mx-1.5 transition-colors ${
                  row.selected ? "bg-primary-light" : ""
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    row.selected ? "border-primary" : "border-neutral-200"
                  }`}
                >
                  {row.selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </span>
                <span
                  className={`h-1.5 rounded-full ${row.selected ? "bg-accent-purple" : "bg-neutral-200"}`}
                  style={{ width: row.width }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2.5 border-t border-primary-light pt-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary-light">
              <div className="h-full w-[70%] rounded-full bg-primary" />
            </div>
            <span className="font-thmanyah-text text-micro font-bold text-neutral-700">
              70%
            </span>
          </div>
        </div>

        {/* Başarı rozeti — soru kartının üstünde çakışıyor */}
        <div
          dir="ltr"
          className="absolute flex items-center gap-2.5 rounded-2xl bg-neutral-0 p-3 shadow-[0_20px_40px_-18px_var(--color-primary)]/40 sm:gap-3 sm:p-3.5"
          style={{ left: "39%", top: "12%", width: "36%", minWidth: "148px" }}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-visual-teal/20 sm:h-9 sm:w-9">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-visual-teal)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="font-thmanyah-display text-h3-sm font-bold leading-none text-outline-hover">
              92%
            </p>
            <p className="mt-1 whitespace-nowrap font-thmanyah-text text-micro leading-tight text-neutral-500">
              ممتاز استمر هكذا
            </p>
          </div>
        </div>

        {/* Dekoratif noktalar */}
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-purple"
          style={{ left: "80%", top: "4%" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-purple"
          style={{ left: "92%", top: "52%" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-orange"
          style={{ left: "1%", top: "58%" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-primary-light"
          style={{ left: "22%", top: "94%" }}
        />
      </div>
    </div>
  );
}

function CertificateIllustration() {
  return (
    <div className="relative z-10 mt-4 flex flex-1 items-center justify-center px-5 pb-8 sm:px-6 sm:pb-9">
      <div className="relative w-full aspect-600/898 lg:aspect-660/708 sm:aspect-660/798">
        {/* Arkada hafif kaydırılmış ikinci sayfa — yığın hissi */}
        <div
          className="absolute rounded-xl bg-neutral-100"
          style={{ left: "6%", top: "16%", width: "57%", height: "66%" }}
        />

        {/* Sertifika kağıdı */}
        <div
          className="absolute rounded-xl bg-gradient-to-b from-neutral-0 to-neutral-100 p-3 shadow-[0_25px_55px_-22px_var(--color-primary)]/40 sm:p-4"
          style={{ left: "3%", top: "20%", width: "57%", height: "66%" }}
        >
          <div className="relative flex h-full flex-col items-center rounded-lg border border-primary-light px-3 pt-4 text-center sm:px-4">
            {/* Köşe noktaları */}
            <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-neutral-200" />
            <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-neutral-200" />
            <span className="absolute -left-[3px] -bottom-[3px] h-1.5 w-1.5 rounded-full bg-neutral-200" />
            <span className="absolute -right-[3px] -bottom-[3px] h-1.5 w-1.5 rounded-full bg-neutral-200" />

            {/* Defne yaprağı + yıldız */}
            <svg
              width="46"
              height="34"
              viewBox="0 0 46 34"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M20 30c-7-2-12-9-11-17 5 1 9 5 10 11"
                stroke="var(--color-accent-purple)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M17 25c-4-1-7-5-7-10"
                stroke="var(--color-accent-purple)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M26 30c7-2 12-9 11-17-5 1-9 5-10 11"
                stroke="var(--color-accent-purple)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M29 25c4-1 7-5 7-10"
                stroke="var(--color-accent-purple)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M23 6l2.3 4.8 5.2.7-3.8 3.7.9 5.2-4.6-2.5-4.6 2.5.9-5.2-3.8-3.7 5.2-.7z"
                fill="var(--color-accent-purple)"
              />
            </svg>

            {/* ⬇️ DEĞİŞTİ: leading-none/varsayılan sıkı satır yüksekliği yerine
                leading-snug + küçük bir pb payı eklendi. Arapça glifin alt
                kısmı (harf kuyrukları) artık satır kutusunun dışına taşıp
                dıştaki overflow-hidden tarafından kesilmiyor. */}
            <h4 className="mt-2 font-thmanyah-display text-body font-bold leading-snug pb-0.5 text-outline-hover sm:text-h3-sm">
              شهادة إتمام
            </h4>
            <p className="mt-1 font-thmanyah-text text-micro leading-relaxed text-neutral-400">
              تم منح هذه الشهادة إلى
            </p>

            <div className="mt-3 h-px w-[55%] bg-neutral-200" />

            <p className="mt-3 max-w-[85%] font-thmanyah-text text-micro leading-[1.6] text-neutral-400">
              لاستكماله بنجاح جميع متطلبات البرنامج التدريبي
            </p>

            {/* İmza */}
            <svg
              width="34"
              height="16"
              viewBox="0 0 34 16"
              fill="none"
              className="absolute bottom-3 left-3 opacity-70"
            >
              <path
                d="M1 12c2-6 4-8 6-6s1 7 3 7 2-9 5-9 1 8 4 8 3-6 6-6 2 5 4 3 2-4 4-4"
                stroke="var(--color-accent-purple)"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Madalya / kurdele — sertifikanın alt kenarına biniyor */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: "24%", top: "76%", width: "13%" }}
        >
          <svg viewBox="0 0 60 70" fill="none" className="w-full">
            <path d="M18 30L8 66l14-7 8 9 4-38z" fill="var(--color-primary)" />
            <path d="M42 30l10 36-14-7-8 9-4-38z" fill="var(--color-primary-hover)" />
            <circle
              cx="30"
              cy="26"
              r="22"
              fill="var(--color-accent-purple)"
              stroke="var(--color-primary-light)"
              strokeWidth="3"
            />
            <path
              d="M30 15l3.2 6.6 7.3.9-5.3 5.1 1.3 7.2-6.5-3.5-6.5 3.5 1.3-7.2-5.3-5.1 7.3-.9z"
              fill="var(--color-neutral-0)"
            />
          </svg>
        </div>

        {/* Mezuniyet kepi rozeti */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-0 to-primary-light shadow-[0_18px_36px_-16px_var(--color-primary)]/45"
          style={{ left: "63%", top: "6%", width: "22%", aspectRatio: "1 / 1" }}
        >
          <svg viewBox="0 0 64 64" className="h-[52%] w-[52%]">
            <defs>
              <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-accent-purple)" />
                <stop offset="100%" stopColor="var(--color-primary-hover)" />
              </linearGradient>
            </defs>
            <path d="M32 12L58 25L32 38L6 25Z" fill="url(#capGrad)" />
            <path
              d="M18 29v9c0 5 6.3 9 14 9s14-4 14-9v-9"
              fill="none"
              stroke="url(#capGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <line
              x1="52"
              y1="26"
              x2="52"
              y2="42"
              stroke="url(#capGrad)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <circle cx="52" cy="45" r="3" fill="url(#capGrad)" />
          </svg>
        </div>

        {/* Sağdaki avatar figürü — kutlama pozunda, premium gradyan + glow */}
        <svg
          className="absolute"
          style={{
            left: "56%",
            top: "36%",
            width: "46%",
            aspectRatio: "200 / 260",
          }}
          viewBox="0 0 200 260"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="charGradWave" x1="0" y1="6" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-purple)" />
              <stop offset="45%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-alt-hover)" />
            </linearGradient>
            <filter
              id="charGlowWave"
              x="-80%"
              y="-80%"
              width="260%"
              height="260%"
            >
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
          </defs>

          <ellipse
            cx="100"
            cy="252"
            rx="60"
            ry="9"
            fill="var(--color-primary)"
            opacity="0.12"
          />

          <path
            d="M62 190c0-42 17-70 38-70s38 28 38 70"
            stroke="url(#charGradWave)"
            strokeWidth="10"
            strokeOpacity="0.3"
            filter="url(#charGlowWave)"
          />
          <circle
            cx="100"
            cy="56"
            r="44"
            stroke="url(#charGradWave)"
            strokeWidth="10"
            strokeOpacity="0.26"
            filter="url(#charGlowWave)"
          />

          <circle
            cx="100"
            cy="56"
            r="44"
            fill="var(--color-neutral-0)"
            fillOpacity="0.5"
            stroke="url(#charGradWave)"
            strokeWidth="3.5"
          />

          <path
            d="M62 190c0-42 17-70 38-70s38 28 38 70"
            fill="var(--color-neutral-0)"
            fillOpacity="0.5"
            stroke="url(#charGradWave)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70 184c-5-32 3-58 20-72"
            stroke="var(--color-primary-light)"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M88 122L100 136L112 122"
            stroke="url(#charGradWave)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M74 188c-6 20-10 40-8 60"
            stroke="url(#charGradWave)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M126 188c6 20 10 40 8 60"
            stroke="url(#charGradWave)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <path
            d="M72 130c-14-18-22-40-20-62"
            stroke="url(#charGradWave)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="52"
            cy="64"
            r="7"
            fill="var(--color-neutral-0)"
            fillOpacity="0.6"
            stroke="url(#charGradWave)"
            strokeWidth="3"
          />

          <path
            d="M128 130c12 12 18 26 16 42"
            stroke="url(#charGradWave)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Dekoratif noktalar */}
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-purple"
          style={{ left: "90%", top: "3%" }}
        />
        <span
          className="absolute h-2 w-2 rounded-full bg-accent-teal"
          style={{ left: "97%", top: "55%" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-primary-light"
          style={{ left: "1%", top: "74%" }}
        />
      </div>
    </div>
  );
}

function CommunityIllustration() {
  const avatars = [
    { cx: 15, cy: 32, size: 15, bg: "var(--color-primary-light)", ring: "var(--color-accent-purple)" },
    { cx: 75, cy: 34, size: 15, bg: "var(--color-orange-bg-hover)", ring: "var(--color-accent-orange)" },
    { cx: 40, cy: 90, size: 15, bg: "var(--color-primary-light)", ring: "var(--color-accent-teal)" },
  ];

  return (
    <div className="relative z-10 mt-4 flex flex-1 items-end px-5 pb-5 sm:px-6 sm:pb-6">
      <div className="relative w-full aspect-660/798">
        {/* Sohbet penceresi */}
        <div
          className="absolute flex flex-col overflow-hidden rounded-2xl bg-neutral-0 shadow-[0_25px_55px_-22px_var(--color-primary)]/40"
          style={{ left: "0%", top: "4%", width: "78%", height: "88%" }}
        >
          <div className="flex items-center gap-1.5 border-b border-primary-light px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-accent-orange" />
            <span className="h-2 w-2 rounded-full bg-primary-light" />
            <span className="h-2 w-2 rounded-full bg-accent-purple" />
            <span className="mx-auto flex items-center gap-1.5 font-thmanyah-text text-micro font-bold text-outline-hover sm:text-caption">
              مجتمع راوي
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent-purple)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="9" r="3" />
                <circle cx="17" cy="9" r="2.4" />
                <path d="M3.5 20c.6-3.2 2.7-5 4.5-5s3.9 1.8 4.5 5" />
                <path d="M14.2 15.3c1.5.1 3 1.7 3.5 4.7" />
              </svg>
            </span>
          </div>

          {/* İçerik alanı — tüm konumlar bu kutuya göre yüzdesel */}
          <div className="relative flex-1">
            {/* Bağlantı çizgileri */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="42"
                y1="55"
                x2="15"
                y2="32"
                stroke="var(--color-neutral-200)"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <line
                x1="42"
                y1="55"
                x2="75"
                y2="34"
                stroke="var(--color-neutral-200)"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <line
                x1="42"
                y1="55"
                x2="40"
                y2="90"
                stroke="var(--color-neutral-200)"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <circle
                cx="42"
                cy="55"
                r="20"
                fill="none"
                stroke="var(--color-primary-light)"
                strokeWidth="0.5"
                strokeDasharray="1.5 2.5"
              />
              <circle
                cx="42"
                cy="55"
                r="28"
                fill="none"
                stroke="var(--color-primary-light)"
                strokeWidth="0.5"
                strokeDasharray="1.5 2.5"
              />
            </svg>

            {/* Robot maskot */}
            <div
              className="absolute"
              style={{
                left: "42%",
                top: "55%",
                width: "17%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <svg viewBox="0 0 100 130" className="w-full">
                <defs>
                  <linearGradient id="botGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent-purple)" />
                    <stop offset="100%" stopColor="var(--color-primary-hover)" />
                  </linearGradient>
                </defs>
                <line
                  x1="50"
                  y1="6"
                  x2="50"
                  y2="17"
                  stroke="url(#botGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="5" r="4" fill="url(#botGrad)" />
                <rect
                  x="20"
                  y="17"
                  width="60"
                  height="46"
                  rx="18"
                  fill="url(#botGrad)"
                />
                <ellipse cx="38" cy="41" rx="5" ry="7" fill="var(--color-primary-light)" />
                <ellipse cx="62" cy="41" rx="5" ry="7" fill="var(--color-primary-light)" />
                <rect
                  x="26"
                  y="69"
                  width="48"
                  height="42"
                  rx="16"
                  fill="url(#botGrad)"
                />
                <circle cx="50" cy="90" r="10" fill="var(--color-neutral-0)" />
                <text
                  x="50"
                  y="95"
                  fontSize="13"
                  fill="var(--color-primary-hover)"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  R
                </text>
              </svg>
            </div>

            {/* Robotun konuşma balonu */}
            <div
              dir="rtl"
              className="absolute rounded-xl rounded-bl-sm bg-neutral-100 px-2.5 py-1.5 shadow-sm"
              style={{ left: "33%", top: "6%", width: "34%" }}
            >
              <p className="font-thmanyah-text text-micro leading-[1.5] text-neutral-700">
                جرّب هذه الطريقة، ستجدها أسهل! ⭐
              </p>
            </div>

            {/* Avatarlar */}
            {avatars.map((a, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center rounded-full border-2"
                style={{
                  left: `${a.cx}%`,
                  top: `${a.cy}%`,
                  width: `${a.size}%`,
                  aspectRatio: "1 / 1",
                  transform: "translate(-50%,-50%)",
                  backgroundColor: a.bg,
                  borderColor: a.ring,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[55%] w-[55%]"
                >
                  <circle
                    cx="12"
                    cy="8.5"
                    r="4"
                    stroke={a.ring}
                    strokeWidth="1.8"
                  />
                  <path
                    d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                    stroke={a.ring}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}

            {/* Konuşma balonları */}
            <div
              dir="rtl"
              className="absolute rounded-xl rounded-br-sm bg-neutral-0 px-2.5 py-1.5 shadow-sm"
              style={{ left: "1%", top: "4%", width: "26%" }}
            >
              <p className="font-thmanyah-text text-micro leading-[1.5] text-neutral-700">
                كيف أحل هذا السؤال؟
              </p>
            </div>
            <div
              dir="rtl"
              className="absolute rounded-xl rounded-bl-sm bg-neutral-0 px-2.5 py-1.5 shadow-sm"
              style={{ left: "70%", top: "6%", width: "28%" }}
            >
              <p className="font-thmanyah-text text-micro leading-[1.5] text-neutral-700">
                فهمت الآن، شكرًا! 👍
              </p>
            </div>
            <div
              dir="rtl"
              className="absolute rounded-xl rounded-tr-sm bg-neutral-0 px-2.5 py-1.5 shadow-sm"
              style={{ left: "50%", top: "76%", width: "34%" }}
            >
              <p className="font-thmanyah-text text-micro leading-[1.5] text-neutral-700">
                شرح ممتاز! ساعدني كثيرًا ⭐
              </p>
            </div>
          </div>
        </div>

        {/* Sağda: grup ikonu — premium gradyan + glow tekniği */}
        <svg
          className="absolute"
          style={{ left: "50%", top: "44%", width: "48%", aspectRatio: "220 / 140" }}
          viewBox="0 0 220 140"
          fill="none"
        >
          <defs>
            <linearGradient id="charGradGroupBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary-light)" />
              <stop offset="100%" stopColor="var(--color-accent-purple)" />
            </linearGradient>
            <linearGradient id="charGradGroupFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-purple)" />
              <stop offset="45%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-alt-hover)" />
            </linearGradient>
            <filter id="charGlowGroup" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
 
          {/* Arkadaki iki figür — önce çizilir, ön figürün altında kalır */}
          <path
            d="M6 136c0-26 15-42 36-42s36 16 36 42"
            stroke="url(#charGradGroupBack)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="64" r="20" stroke="url(#charGradGroupBack)" strokeWidth="3.5" />
 
          <path
            d="M142 136c0-26 15-42 36-42s36 16 36 42"
            stroke="url(#charGradGroupBack)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="178" cy="64" r="20" stroke="url(#charGradGroupBack)" strokeWidth="3.5" />
 
          {/* Öndeki figür — arka glow kopyası */}
          <path
            d="M62 134c0-30 21-48 48-48s48 18 48 48"
            stroke="url(#charGradGroupFront)"
            strokeWidth="8"
            strokeOpacity="0.3"
            filter="url(#charGlowGroup)"
          />
          <circle cx="110" cy="50" r="27" stroke="url(#charGradGroupFront)" strokeWidth="8" strokeOpacity="0.26" filter="url(#charGlowGroup)" />
 
          {/* Öndeki figür — tam ortada, en üstte, keskin çizgi */}
          <path
            d="M62 134c0-30 21-48 48-48s48 18 48 48"
            stroke="url(#charGradGroupFront)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="110" cy="50" r="27" stroke="var(--color-accent-purple)" strokeWidth="4" />
        </svg>
 
        {/* Sohbet ikonu */}
        <div
          className="absolute flex items-center justify-center rounded-2xl rounded-bl-sm bg-neutral-0 shadow-[0_16px_30px_-14px_var(--color-primary)]/40"
          style={{ left: "76%", top: "12%", width: "13%", aspectRatio: "1 / 1" }}
        >
          <svg viewBox="0 0 24 24" width="40%" height="40%" fill="none">
            <circle cx="6" cy="12" r="1.6" fill="var(--color-accent-purple)" />
            <circle cx="12" cy="12" r="1.6" fill="var(--color-accent-purple)" />
            <circle cx="18" cy="12" r="1.6" fill="var(--color-accent-purple)" />
          </svg>
        </div>
 
        {/* Kesikli yay + noktalar */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M72 4c14 6 22 20 22 34" fill="none" stroke="var(--color-neutral-200)" strokeWidth="0.5" strokeDasharray="1.5 2" />
        </svg>
        <span className="absolute h-1.5 w-1.5 rounded-full bg-accent-purple" style={{ left: "80%", top: "2%" }} />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-primary-light" style={{ left: "95%", top: "40%" }} />
      </div>
    </div>
  );
}

// FeatureCards.tsx — sadece değişen kısımlar aşağıda işaretli, geri kalanı aynı

export default function FeatureCards() {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3"
    >
      {FEATURES.map((feature, index) => (
        <div
          key={feature.title}
          // ⬇️ DEĞİŞTİ: lg:h-[540px] → lg:min-h-135
          // Sabit yükseklik yerine min-height: lg'de 3 sütuna geçince kart
          // daralıp başlık daha fazla satıra sarabiliyor; sabit h ile bu durumda
          // illüstrasyon overflow-hidden tarafından kesiliyordu.
          className="relative flex flex-col justify-start overflow-hidden rounded-lg min-h-110 sm:min-h-120 lg:min-h-135 bg-neutral-100"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: feature.backgroundImage
                ? `url(${feature.backgroundImage})`
                : undefined,
              backgroundColor: feature.backgroundImage ? undefined : "var(--color-neutral-100)",
            }}
          />

          <div className="relative z-10 px-6 pt-7 sm:px-7 sm:pt-8">
            {/* ⬇️ DEĞİŞTİ: line-clamp eklendi — çok dar ekranlarda satır sayısı
                öngörülemez artmasın, kart yüksekliği tutarlı kalsın */}
            <h3 className="font-thmanyah-display font-bold text-h3 sm:text-h2-sm leading-[1.28] tracking-[-0.01em] text-neutral-900 line-clamp-2">
              {feature.title}
            </h3>
            <p className="mt-3 font-thmanyah-text text-body leading-[1.85] text-neutral-700 max-w-[34ch] line-clamp-3 sm:line-clamp-none">
              {feature.description}
            </p>
          </div>

          {index === 0 && <TestIllustration />}
          {index === 1 && <CertificateIllustration />}
          {index === 2 && <CommunityIllustration />}
        </div>
      ))}
    </div>
  );
}