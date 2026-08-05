"use client";

import { Expand, Play, Video } from "lucide-react";
import Globe from "../3D/Globe";
import CyclingWord from "../CyclingWord";
import LanguageFlashcardStack from "./LanguageFlashcardStack";
import { CardHeader } from "./CardHeader";
import CardInteractiveShell from "./CardInteractiveShell";
import SubjectCoursesList from "./SubjectCoursesList";


function VideoPanel() {
  return (
    <div
      dir="rtl"
      className="hidden md:block absolute right-[28%] top-4 md:top-6 w-100 lg:w-150 rounded-lg overflow-hidden bg-neutral-0/40 backdrop-blur-xl border border-neutral-0/60 shadow-[0_30px_60px_-20px_rgba(20,16,40,0.25)] scale-90 lg:scale-100 origin-top-right"
    >
      <div className="flex items-center gap-1.5 px-5 py-3 bg-neutral-0/30 backdrop-blur-md border-b border-neutral-0/50">
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-0/70" />
        <span className="mx-auto flex items-center gap-1.5 text-[12px] text-neutral-500">
          <span className="w-2 h-2 rounded-full bg-visual-teal animate-pulse" />
          rawi.academy/live
        </span>
      </div>

      <div className="relative h-82.5 bg-neutral-0/15 backdrop-blur-sm overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 30%, transparent 55%)",
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-62 aspect-video rounded-xl overflow-hidden bg-neutral-0/30 backdrop-blur-md shadow-[0_18px_40px_-14px_rgba(20,16,40,0.3)] ring-1 ring-neutral-0/60">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.6) 0%, rgba(246,201,227,0.55) 55%, rgba(201,187,245,0.6) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, transparent 35%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(9,9,11,0.2) 100%)",
            }}
          />

          <span className="absolute top-2 right-2 w-6 h-6 rounded-md bg-neutral-0/50 backdrop-blur-md border border-neutral-0/60 flex items-center justify-center">
            <Video size={12} className="text-primary" />
          </span>

          <div
            dir="ltr"
            className="absolute bottom-6 inset-x-0 flex justify-center px-2"
          >
            <span className="text-[10px] text-neutral-700 bg-neutral-0/50 backdrop-blur-md px-2 py-0.5 rounded">
              "Are you ready?"
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              aria-label="تشغيل الدرس"
              className="w-11 h-11 rounded-full bg-neutral-0/55 backdrop-blur-md border border-neutral-0/70 flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(20,16,40,0.35)]"
            >
              <Play
                size={16}
                className="text-neutral-900 ml-0.5"
                fill="#09090B"
              />
            </button>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-neutral-0/25">
            <div className="h-full w-[38%] bg-primary" />
          </div>
        </div>

        <div className="absolute top-5 left-5 bg-neutral-0/45 backdrop-blur-md rounded-sm shadow-[0_14px_28px_-12px_rgba(20,16,40,0.15)] border border-neutral-0/60 px-4 py-2.5">
          <p className="text-caption font-bold text-neutral-900 whitespace-nowrap">
            افضل المدرسين
          </p>
          <p className="text-[10.5px] text-neutral-500 mt-0.5">افضل التعليم</p>
        </div>

        <div className="absolute bottom-5 right-5 bg-neutral-0/45 backdrop-blur-md rounded-full shadow-[0_14px_28px_-12px_rgba(20,16,40,0.15)] border border-neutral-0/60 pl-4 pr-2 py-2 flex items-center gap-1.5 ">
          <span className="text-[11.5px] text-neutral-700">تعليم تفاعلي</span>
        </div>

        <span className="absolute top-5 right-5 bg-neutral-0/45 backdrop-blur-md rounded-full shadow-[0_10px_20px_-10px_rgba(20,16,40,0.15)] border border-neutral-0/60 px-2.5 py-1.5 text-[10.5px] font-mono text-neutral-500 rotate-[4deg]">
          ١٢:٤٥
        </span>

        <span className="absolute bottom-5 left-5 bg-neutral-0/45 backdrop-blur-md rounded-sm shadow-[0_10px_20px_-10px_rgba(20,16,40,0.15)] border border-neutral-0/60 px-2.5 py-1.5 text-[10.5px] font-semibold text-visual-teal">
          كل ما يحتاجه المتعلم
        </span>
      </div>
    </div>
  );
}

function CyclingHeadline() {
  return (
    <div
      dir="rtl"
      className="absolute right-[4%] sm:right-[3%] top-[22%] md:top-1/2 md:-translate-y-1/2 z-10 w-48 sm:w-60 md:w-70 lg:w-75 text-center pointer-events-none"
    >
      <div className="absolute -inset-8 bg-neutral-0/55 blur-3xl -z-10" />
      <p className="font-thmanyah-display font-extrabold text-[22px] sm:text-[26px] md:text-[29px] lg:text-[32px] leading-[1.3] text-neutral-900 tracking-tight">
        <CyclingWord
          words={["تواصل", "تحدث", "أبدع", "تفاعل"]}
          className="text-primary"
        />{" "}
        بلغةٍ جديدة.
      </p>
    </div>
  );
}

export default function LanguagesCard() {
  return (
    <CardInteractiveShell
      accent="pink"
      title="اللغات — بوابة تواصلك مع العالم"
      description="جلسات ودورات مباشرة مع أفضل المدرسين، تفتح لك طريقًا حقيقيًا نحو التواصل بلغة جديدة."
      modalContent={<SubjectCoursesList subject="languages" />}
      className="lg:col-span-2"
    >
      <div className="relative bg-neutral-0 border-2 border-neutral-200 group-hover:border-pink-400/40 rounded-lg overflow-hidden shadow-sm">
        <CardHeader title="اللغات — بوابة تواصلك مع العالم" color="pink" />

        <div
          className="relative h-96 sm:h-105 md:h-115 lg:h-125 mt-2 overflow-hidden bg-cover bg-top"
          style={{
            backgroundImage: "url(/backgrounds/bg-25.png)",
          }}
        >
          {/* كومة بطاقات اللغات — يسار */}
          <div className="absolute left-4 sm:left-8 md:left-14 lg:left-20 bottom-4 sm:bottom-6 md:bottom-auto md:top-3/5 md:-translate-y-1/2 z-20 scale-75 sm:scale-90 lg:scale-100 origin-bottom-left md:origin-left">
            <LanguageFlashcardStack />
          </div>

          {/* الكرة الأرضية — يمين، تنسحب جزئيًا خارج الإطار */}
          <div className="absolute -right-10 sm:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 w-52 sm:w-72 md:w-90 lg:w-115 h-52 sm:h-72 md:h-90 lg:h-115">
            <div className="absolute inset-10 rounded-full" />
            <Globe className="relative w-full h-full" />
          </div>

          <VideoPanel />
          <CyclingHeadline />
        </div>
      </div>
    </CardInteractiveShell>
  );
}