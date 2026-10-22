import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const doc = getLegalDoc("terms-and-conditions");

export const metadata: Metadata = buildMetadata({
  title: doc.seoTitle,
  description: doc.seoDescription,
  path: `/${doc.slug}`,
});

export default function TermsPage() {
  return <LegalPage doc={doc} />;
}
