"use client";

import { useRouter } from "next/navigation";
import PromoBanner from "../components/PromoBanner";
import { LINKS } from "../lib/links";

export default function StartWithWhatMatters() {
  return (
    <PromoBanner
      title="ليس كل ما يُدرَّس يستحق أن يُتعلَّم"
      description="كل معرفةٍ تتعلّمها تمنحها جزءًا من عمرك، فاختر ما يستحق أن تمنحه سنواتك."
      buttonText="ابدأ بما يستحق"
      href={LINKS.courses}
    />
  );
}
