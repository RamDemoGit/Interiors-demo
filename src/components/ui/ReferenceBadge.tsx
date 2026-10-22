import { featureFlags } from "@/config/site";

/** Chip marking stock imagery. Hidden once `showReferenceBadges` is false. */
export function ReferenceBadge() {
  if (!featureFlags.showReferenceBadges) return null;
  return (
    <span className="text-taupe-deep absolute top-3 left-3 rounded-sm bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase backdrop-blur-sm">
      Reference image
    </span>
  );
}
