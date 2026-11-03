import { readdirSync } from "node:fs";
import path from "node:path";

export type ClientImage = {
  /** Public URL, e.g. "/clients/01-acme.png". */
  src: string;
  /** Readable name derived from the file name (used for alt text and captions). */
  name: string;
};

const IMAGE_FILE = /\.(png|jpe?g|webp|avif|svg)$/i;

/** Brand spellings that a file name cannot carry (no ":" or "+" in file names). */
const DISPLAY_NAMES: Record<string, string> = {
  "b live": "b:live",
  "titan eye plus": "Titan Eye+",
};

/**
 * Client logos / images for the Clientele page.
 *
 * Drop the files into `public/clients/` and they appear automatically, in
 * natural file-name order (01-, 02-, ...). A file called `acme-interiors.png`
 * is shown as "Acme Interiors". The section stays hidden while the folder is
 * empty, so nothing is ever invented.
 */
export function getClientImages(): ClientImage[] {
  const dir = path.join(process.cwd(), "public", "clients");
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((file) => IMAGE_FILE.test(file));
  } catch {
    return [];
  }

  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const base = file
        .replace(IMAGE_FILE, "")
        .replace(/^\d+[-_.\s]*/, "")
        .replace(/[-_]+/g, " ")
        .trim();
      const name =
        DISPLAY_NAMES[base.toLowerCase()] ??
        (base
          ? base.replace(/\b\w/g, (letter) => letter.toUpperCase())
          : `Client ${file.replace(IMAGE_FILE, "")}`);
      return { src: `/clients/${encodeURIComponent(file)}`, name };
    });
}
