/**
 * Build-time guard for placeholder project images.
 *
 * Placeholder images live in public/projects/<slug>/ next to a marker file
 * named `.placeholder`. Delete the marker once real images are exported.
 *
 * - Always prints a warning when placeholders remain.
 * - FAILS the build on Vercel production (VERCEL_ENV=production) unless
 *   ALLOW_PLACEHOLDER_IMAGES=true, so placeholders never ship by accident.
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "public", "projects");
const remaining = [];

if (existsSync(root)) {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isDirectory() && existsSync(join(root, entry.name, ".placeholder"))) {
      remaining.push(entry.name);
    }
  }
}

if (remaining.length === 0) {
  process.exit(0);
}

const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

console.warn(
  yellow(
    `\n[placeholder-guard] ${remaining.length} project folder(s) still use placeholder images:\n  ` +
      remaining.join("\n  ") +
      "\n  Replace them with real exports (see each folder's README.md) and delete the .placeholder marker.\n",
  ),
);

const isProd = process.env.VERCEL_ENV === "production";
const allowed = process.env.ALLOW_PLACEHOLDER_IMAGES === "true";

if (isProd && !allowed) {
  console.error(
    red(
      "[placeholder-guard] Refusing to build a production deploy with placeholder images.",
    ),
  );
  process.exit(1);
}
