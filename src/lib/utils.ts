import clsx, { type ClassValue } from "clsx";
import { SITE_URL } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Absolute URL on the canonical site origin. */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

/** Format square footage with Indian digit grouping, e.g. 10,400. */
export function formatSqFt(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}
