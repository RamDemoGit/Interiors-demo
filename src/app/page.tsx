import { Marquee } from "@/components/animation/Marquee";
import { Consultancy } from "@/components/sections/Consultancy";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Founder } from "@/components/sections/Founder";
import { PracticeMix } from "@/components/sections/PracticeMix";
import { Hero } from "@/components/sections/Hero";
import { ScopeOfWork } from "@/components/sections/ScopeOfWork";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Welcome } from "@/components/sections/Welcome";
import { services } from "@/content/services";

/**
 * Home. Sections without master-document copy yet (Philosophy, Expertise, Why,
 * Approach, Client Voices) are added in Phase 2/3.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-line border-y bg-white py-6 md:py-8">
        <Marquee label="Our services" items={services.map((s) => s.name)} />
      </div>
      <Welcome />
      <PracticeMix />
      <ServicesGrid />
      <ScopeOfWork />
      <Consultancy />
      <ScrollTextBand
        className="bg-white"
        top="Commercial · Workplace · Retail · Hospitality"
        bottom="Homes · Renovation · Architecture · Chennai"
      />
      <FeaturedProjects />
      <Founder />
      <CtaBand />
    </>
  );
}
