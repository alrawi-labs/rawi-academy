"use client";

import { useRouter } from "next/navigation";
import PromoBanner from "../components/PromoBanner";
import { LINKS } from "../lib/links";

export default function StartWithWhatMatters() {
  const router = useRouter();
  return (
    <PromoBanner
      title="ليس كل ما يُدرَّس يستحق أن يُتعلَّم"
      description="كل معرفةٍ تتعلّمها تمنحها جزءًا من عمرك، فاختر ما يستحق أن تمنحه سنواتك."
      buttonText="ابدأ بما يستحق"
      onButtonClick={() => router.push(LINKS.courses)}
    />
  );
}
