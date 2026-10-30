import { Reveal } from "@/components/animation/Reveal";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featureFlags } from "@/config/site";
import { preferredBrands } from "@/content/brands";

/**
 * Home: moving strip of the interior product brands the studio prefers.
 * Renders nothing until the owner supplies the list in `content/brands.ts`
 * and turns on `featureFlags.showPreferredBrands`.
 */
export function PreferredBrands() {
  if (!featureFlags.showPreferredBrands || preferredBrands.length === 0) return null;

  // Two rows moving in opposite directions when there are enough brands.
  const split = Math.ceil(preferredBrands.length / 2);
  const rowA = preferredBrands.slice(0, split);
  const rowB = preferredBrands.slice(split);

  return (
    <section aria-label="Preferred brands" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Preferred brands"
          title="Quality products we like to specify."
          lead="The makers of fittings, finishes and furniture we turn to when a design calls for it."
          className="mb-10 md:mb-12"
        />
      </div>
      <Reveal className="space-y-2">
        <LogoMarquee
          items={rowA}
          label="Preferred interior product brands"
          duration={45}
        />
        {rowB.length > 0 && (
          <LogoMarquee
            items={rowB}
            label="More preferred interior product brands"
            duration={52}
            reverse
          />
        )}
      </Reveal>
    </section>
  );
}
