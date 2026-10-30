import type { Metadata } from "next";
import { ScrollTextBand } from "@/components/animation/ScrollEffects";
import { CtaBand } from "@/components/sections/CtaBand";
import { PracticeMix } from "@/components/sections/PracticeMix";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Interior Design & Architecture Services in Chennai",
  description:
    "Commercial, retail, workplace, hospitality and institutional interiors, plus homes, renovation and architectural concepts, from our T. Nagar, Chennai studio.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Architecture and interior design services in Chennai"
        crumbs={[{ label: "Our Services" }]}
        image="living"
        variant="slide"
      />
      <PracticeMix />
      <ServiceIndex />
      <ScrollTextBand
        className="bg-white"
        top="Interiors · Architecture · Concepts"
        bottom="Commercial · Homes · Renovation"
      />
      <CtaBand />
    </>
  );
}
