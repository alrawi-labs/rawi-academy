import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

/**
 * SupportQuickPanel — FAQAskInput'un cam (glass) reçetesini birebir
 * paylaşan, statik bir hızlı-bilgi paneli. Hero'nun sağ sütununda
 * asimetrik bir görsel ağırlık oluşturmak için kullanılıyor.
 *
 * §4'teki opaklık kademesini (header/content/footer → /30 → /15 → /85)
 * kullanarak tek düz bir cam kutu yerine katmanlı bir yüzey kuruyor.
 * İki bilgi satırı kasıtlı olarak birbirinden farklı ele alınıyor —
 * aynı "ikon kutusu + başlık + açıklama" satırının iki kez tekrarı
 * (§0'ın uyardığı şablon his) yerine biri canlı durum göstergesi,
 * diğeri tıklanabilir bir e-posta çipi.
 */
export function SupportQuickPanel() {
  return (
    <div
      dir="rtl"
      className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] backdrop-blur-xl"
    >
      {/* Diyagonal parıltı — §4 reçetesi birebir */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.08)_30%,transparent_55%)]" />

      <div className="relative z-10">
        {/* Header — §4 zone: /30 */}
        <div className="border-b border-white/40 bg-white/30 px-6 pb-4 pt-5">
          <div className="flex items-center gap-2">
            <span className="h-[3px] w-4 rounded-full bg-primary" />
            <span className="font-thmanyah-text text-micro font-semibold text-primary">
              الدعم
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" strokeWidth={2} />
            <h3 className="font-thmanyah-text text-body font-semibold text-neutral-900">
              تحتاج مساعدة سريعة؟
            </h3>
          </div>
        </div>

        {/* İçerik — §4 zone: /15 */}
        <div className="bg-white/15 px-6 py-4">
          <p className="max-w-[32ch] font-thmanyah-text text-caption leading-[1.8] text-neutral-600">
            فريق راوي جاهز لمساعدتك في أي وقت. أرسل طلبك وسنعود إليك في أقرب وقت.
          </p>
        </div>

        {/* Footer şeridi — §4 zone: /85, daha opak "aksiyon" tabanı */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/50 bg-white/85 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <p className="flex items-baseline gap-1 text-caption text-neutral-600">
              <span>الرد خلال</span>
              <span className="text-h3-sm font-semibold leading-none text-neutral-900">
                24
              </span>
              <span>ساعة عمل</span>
            </p>
          </div>

          <a
            href="mailto:support@rawi.academy"
            className="group flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-caption text-neutral-700 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            <Mail className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span dir="ltr" className="font-thmanyah-text">
              support@rawi.academy
            </span>
            <ArrowUpRight
              className="h-3 w-3 text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </div>
  );
}