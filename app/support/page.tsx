import type { Metadata } from "next";
import { buildMetadata } from "@/app/src/lib/seo";
import SupportPageClient from "./SupportPageClient";

export const metadata: Metadata = buildMetadata("support");

export default function SupportPage() {
  return <SupportPageClient />;
}