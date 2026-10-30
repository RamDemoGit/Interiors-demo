import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig, workMix } from "@/config/site";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ: Interior Design & Architecture, Chennai",
  description:
    "Answers to common questions about working with Lahima In-Des | Architects & Engineers, Chennai: services, enquiries, projects and images.",
  path: "/faq",
});

// Answers state only verified facts. Anything about price or timelines points
// to a written proposal; nothing is promised on this page.
const faqs = [
  {
    question: "Who is Lahima In-Des | Architects & Engineers?",
    answer: `${siteConfig.name} is an architecture and interior design practice established in ${siteConfig.established} by ${siteConfig.founder}, with its studio in ${siteConfig.address.locality}, ${siteConfig.address.city}.`,
  },
  {
    question: "Which services do you offer?",
    answer: `We offer ${services.length} services: ${services.map((s) => s.name).join("; ")}.`,
  },
  {
    question: "Where do you work?",
    answer: `The studio is in ${siteConfig.address.city} and serves ${siteConfig.areaServed.join(" and ")}. Our portfolio includes projects in Chennai and in other cities of South India.`,
  },
  {
    question: "How do I start a project with you?",
    answer: `Use the enquiry form on the Contact page, or write to ${siteConfig.email}. Tell us about the space, its location and what you have in mind, and we will get back to you to discuss it.`,
  },
  {
    question: "How much will my project cost, and how long will it take?",
    answer:
      "Cost and schedule depend on the size, scope, materials and site of each project, so we do not publish fixed prices or timelines. Both are discussed with you and set out in a written proposal.",
  },
  {
    question: "Do you take on both homes and commercial spaces?",
    answer: `Yes. About ${workMix.commercial}% of our work is commercial (offices, retail, hospitality and institutional spaces) and about ${workMix.homes}% is homes. The portfolio also includes architectural concepts and renovation work.`,
  },
  {
    question: "What does 'Photograph' or 'Design visualization' mean on a project?",
    answer:
      "A Photograph shows a completed space. A Design visualization is a rendering of a proposed or conceptual design and may differ from the finished result. Every project image is labelled one or the other.",
  },
  {
    question: "Can I share my experience of working with you?",
    answer:
      "Yes, we would be glad to hear it. See the Testimonials page for how to send us your experience.",
  },
  {
    question: "How is my personal information used?",
    answer:
      "Only to respond to your enquiry and discuss your project. Read the Privacy Policy and Cookie Policy for full details.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="Straight answers about working with the studio."
        crumbs={[{ label: "FAQ" }]}
        image="roomDining"
        variant="zoom"
      />

      <section className="bg-white py-14 sm:py-20 md:py-28">
        <div className="container-site max-w-4xl">
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
