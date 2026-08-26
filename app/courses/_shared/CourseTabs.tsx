"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Course, CourseSection } from "@/app/src/data/courses";
import type { Instructor } from "@/app/src/data/instructors";
import { getInstructorDisplayName } from "@/app/src/data/instructors";
import { LINKS } from "@/app/src/lib/links";

type Tab = "overview" | "curriculum" | "instructor";

const TAB_LABELS: Record<Tab, string> = {
  overview: "وصف الدورة",
  curriculum: "منهج الدورة",
  instructor: "عن المعلم",
};

function CurriculumAccordion({ sections, accent }: { sections: CourseSection[]; accent: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={section.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
              aria-expanded={isOpen}
            >
              <span className="font-thmanyah-display text-h3 text-neutral-900">
                {section.title}
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-body text-neutral-500">
                  {section.lessons.length} دروس
                </span>
                <span
                  className={`text-h3-sm transition-transform duration-300 ${accent} ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </span>
            </button>
            {isOpen && (
              <ul className="space-y-1 px-5 pb-4">
                {section.lessons.map((lesson) => (
                  <li
                    key={lesson.title}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-h3-sm text-neutral-600"
                  >
                    <span className={`h-1 w-1 shrink-0 rounded-full ${accent.replace("text-", "bg-")}`} />
                    {lesson.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function CourseTabs({
  course,
  instructor,
  accentText,
  accentBg,
  accentRing,
}: {
  course: Course;
  instructor: Instructor | undefined;
  accentText: string;
  accentBg: string;
  accentRing: string;
}) {
  const availableTabs: Tab[] = [
    "overview",
    ...(course.curriculum && course.curriculum.length > 0 ? (["curriculum"] as Tab[]) : []),
    ...(instructor ? (["instructor"] as Tab[]) : []),
  ];

  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div>
      <div className="flex gap-6 border-b border-neutral-200">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative -mb-px pb-3 text-body font-medium transition-colors ${
              activeTab === tab ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {TAB_LABELS[tab]}
            {activeTab === tab && (
              <span className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full ${accentBg.replace("/15", "")}`} />
            )}
          </button>
        ))}
      </div>

      <div className="pt-8">
        {activeTab === "overview" && (
          <div className="max-w-2xl space-y-5">
            {(course.overview ?? [course.description]).map((paragraph, i) => (
              <p key={i} className="font-thmanyah-text text-lead leading-10 text-neutral-700">
                {paragraph}
              </p>
            ))}

            {course.features && course.features.length > 0 && (
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-h3-sm text-neutral-700">
                    <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${accentBg.replace("/15", "")}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "curriculum" && course.curriculum && (
          <div className="max-w-2xl">
            <CurriculumAccordion sections={course.curriculum} accent={accentText} />
          </div>
        )}

        {activeTab === "instructor" && instructor && (
          <div className="flex max-w-2xl flex-col gap-5 sm:flex-row">
            <div className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ${accentRing}`}>
              <Image
                src={instructor.avatar}
                alt={getInstructorDisplayName(instructor)}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-thmanyah-display text-h3-sm text-neutral-900">
                {getInstructorDisplayName(instructor)}
              </p>
              {instructor.position && (
                <p className="mt-0.5 text-caption text-neutral-500">{instructor.position}</p>
              )}
              <p className="mt-3 font-thmanyah-text text-lead leading-10 text-neutral-700">
                {instructor.bio}
              </p>
              <Link
                href={LINKS.instructor(instructor.id)}
                className={`mt-3 inline-block text-caption font-medium ${accentText}`}
              >
                عرض الملف الكامل ←
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}