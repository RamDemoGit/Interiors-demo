"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type MapLocation = {
  name: string;
  count: number;
  photographs: number;
  visualizations: number;
};

/** Stylised map of the southern peninsula, drawn from approximate lon/lat. */
const W = 560;
const H = 560;
const K = 60;
const project = (lon: number, lat: number): [number, number] => [
  (lon - 72.6) * K,
  (16.9 - lat) * K,
];

// Approximate coastline, clockwise from the north-west. Not survey-accurate.
const coast: [number, number][] = [
  [73.2, 17.2],
  [73.3, 16.0],
  [73.8, 15.5],
  [74.1, 14.8],
  [74.5, 13.9],
  [74.85, 12.9],
  [75.4, 11.9],
  [75.8, 11.25],
  [76.25, 9.95],
  [76.35, 9.4],
  [76.65, 8.85],
  [77.0, 8.45],
  [77.55, 8.08],
  [78.15, 8.75],
  [78.9, 9.15],
  [79.3, 9.3],
  [79.2, 10.1],
  [79.85, 10.75],
  [79.85, 11.9],
  [80.25, 13.05],
  [80.3, 13.7],
  [80.05, 14.5],
  [80.1, 15.5],
  [80.7, 15.9],
  [81.4, 16.5],
  [82.0, 17.2],
];

const points = coast.map(([lon, lat]) => project(lon, lat));

/** Smooth outline through the points using midpoint quadratic curves. */
function smoothPath(pts: [number, number][]) {
  const f = (n: number) => n.toFixed(1);
  const [first, ...rest] = pts;
  if (!first) return "";
  let d = `M ${f(first[0])} ${f(first[1])}`;
  rest.forEach((pt, i) => {
    const next = rest[i + 1];
    if (next) {
      d += ` Q ${f(pt[0])} ${f(pt[1])} ${f((pt[0] + next[0]) / 2)} ${f((pt[1] + next[1]) / 2)}`;
    } else {
      d += ` L ${f(pt[0])} ${f(pt[1])} Z`;
    }
  });
  return d;
}

const land = smoothPath(points);

// Pin positions (lon, lat). "South India" is pinned in the interior, between
// the two cities, to stand for work across the wider region.
const pinCoords: Record<string, [number, number]> = {
  Chennai: [80.27, 13.08],
  Bengaluru: [77.59, 12.97],
  "South India": [76.95, 10.9],
};

const pins = (locations: MapLocation[]) =>
  locations
    .map((l) => {
      const c = pinCoords[l.name];
      if (!c) return null;
      const [x, y] = project(c[0], c[1]);
      return { ...l, left: (x / W) * 100, top: (y / H) * 100 };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

function summary(l: MapLocation) {
  const parts: string[] = [];
  if (l.photographs)
    parts.push(`${l.photographs} photograph${l.photographs > 1 ? "s" : ""}`);
  if (l.visualizations)
    parts.push(
      `${l.visualizations} design visualization${l.visualizations > 1 ? "s" : ""}`,
    );
  return parts.join(" · ");
}

/** Location list on the left, a pinned map of the region on the right. */
export function LocationMap({ locations }: { locations: MapLocation[] }) {
  const [active, setActive] = useState<string | null>(null);
  const placed = pins(locations);

  return (
    <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <ul className="flex flex-col gap-3">
        {locations.map((l) => (
          <li key={l.name}>
            <Link
              href="/projects"
              onMouseEnter={() => setActive(l.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(l.name)}
              onBlur={() => setActive(null)}
              className={cn(
                "group flex items-center gap-4 border px-5 py-4 transition-colors duration-300",
                active === l.name
                  ? "text-ivory border-[#17342c] bg-[#17342c]"
                  : "border-line text-espresso bg-white",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                  active === l.name
                    ? "bg-bronze text-ivory"
                    : "bg-ivory text-bronze-deep",
                )}
              >
                <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-heading block text-2xl leading-tight">
                  {l.name}
                </span>
                <span
                  className={cn(
                    "block text-[0.8125rem] transition-colors duration-300",
                    active === l.name ? "text-ivory/80" : "text-taupe-deep",
                  )}
                >
                  {`${l.count} project${l.count > 1 ? "s" : ""}`} &middot; {summary(l)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="relative mx-auto w-full max-w-[34rem] overflow-hidden bg-gradient-to-br from-[#10261f] via-[#17342c] to-[#2b5a49] p-4 shadow-[0_30px_60px_-40px_rgba(16,38,31,0.7)] sm:p-6"
        role="group"
        aria-label="Map of project locations across Chennai, Bengaluru and South India"
      >
        <div className="relative aspect-square w-full">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <defs>
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#bfe3d3"
                  strokeOpacity="0.1"
                />
              </pattern>
              <linearGradient id="map-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#bfe3d3" stopOpacity="0" />
                <stop offset="0.25" stopColor="#bfe3d3" stopOpacity="0.9" />
                <stop offset="1" stopColor="#bfe3d3" stopOpacity="1" />
              </linearGradient>
              <mask id="map-land-mask">
                <rect width={W} height={H} fill="url(#map-fade)" />
              </mask>
            </defs>
            <rect width={W} height={H} fill="url(#map-grid)" />
            <path
              d={land}
              fill="#2b5a49"
              fillOpacity="0.85"
              stroke="#bfe3d3"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeLinejoin="round"
              mask="url(#map-land-mask)"
            />
            <text
              x="70"
              y="360"
              fill="#bfe3d3"
              fillOpacity="0.55"
              fontSize="12"
              letterSpacing="4"
              transform="rotate(-62 70 360)"
            >
              ARABIAN SEA
            </text>
            <text
              x="395"
              y="345"
              fill="#bfe3d3"
              fillOpacity="0.55"
              fontSize="12"
              letterSpacing="4"
            >
              BAY OF BENGAL
            </text>
          </svg>

          {placed.map((p) => {
            const on = active === p.name;
            return (
              <button
                key={p.name}
                type="button"
                aria-label={`${p.name}: ${p.count} project${p.count > 1 ? "s" : ""}`}
                onMouseEnter={() => setActive(p.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.name)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(on ? null : p.name)}
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
                className="absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
              >
                <span
                  aria-hidden="true"
                  className="bg-bronze-light/40 absolute size-7 animate-ping rounded-full"
                />
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={cn(
                    "relative -translate-y-2.5 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] transition-all duration-300",
                    on ? "size-10 text-[#f0d3a6]" : "size-8 text-[#d9b88a]",
                  )}
                  fill="currentColor"
                >
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <span
                  className={cn(
                    "pointer-events-none absolute top-full left-1/2 -translate-x-1/2 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300",
                    on ? "bg-ivory text-[#10261f]" : "text-ivory bg-[#0b1d17]/80",
                  )}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-ivory/70 mt-3 text-center text-[0.6875rem] tracking-[0.16em] uppercase">
          Illustrative map &middot; not to scale
        </p>
      </div>
    </div>
  );
}
