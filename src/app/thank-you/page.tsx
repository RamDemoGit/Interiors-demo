import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank you",
  description: "Thank you for your enquiry to Lahima In-Des | Architects & Engineers.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Enquiry received"
        title="Thank you"
        crumbs={[{ label: "Thank you" }]}
        image="bedroom"
      />
      <section className="bg-white py-16 md:py-24">
        <div className="container-site flex flex-wrap gap-4">
          <ButtonLink href="/projects">View Projects</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
