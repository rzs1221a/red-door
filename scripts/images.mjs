// Generates responsive widths for project photos, per-page OpenGraph crops, and a 2x header logo.
// Run with `npm run images` after adding or replacing photos; outputs are committed so the
// Netlify build never needs sharp. Idempotent: skips outputs newer than their source.
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const projects = path.join(root, "public/images/projects");
const responsive = path.join(projects, "_r");
const og = path.join(root, "public/og");

export const WIDTHS = [480, 800, 1200, 1600];

async function fresh(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

async function responsiveWidths() {
  await mkdir(responsive, { recursive: true });
  const files = (await readdir(projects)).filter((f) => f.endsWith(".webp"));
  let made = 0;
  for (const file of files) {
    const src = path.join(projects, file);
    const name = file.replace(/\.webp$/, "");
    const { width } = await sharp(src).metadata();
    for (const w of WIDTHS) {
      if (w >= width) continue;
      const out = path.join(responsive, `${name}-${w}.webp`);
      if (await fresh(src, out)) continue;
      await sharp(src).resize({ width: w }).webp({ quality: 78, effort: 4 }).toFile(out);
      made++;
    }
  }
  console.log(`responsive: ${files.length} photos, ${made} files written`);
}

// Page → photo for the share image. Home keeps public/og.png (the door).
const ogMap = {
  projects: "marietta-after",
  services: "res-kitchen-white",
  "design-process": "res-kitchen-beams",
  about: "res-foursquare",
  contact: "res-living",
  "client-portal": "int-office",
  privacy: "res-porch",
};

async function ogImages() {
  await mkdir(og, { recursive: true });
  let made = 0;
  for (const [page, photo] of Object.entries(ogMap)) {
    const src = path.join(projects, `${photo}.webp`);
    const out = path.join(og, `${page}.jpg`);
    if (await fresh(src, out)) continue;
    await sharp(src)
      .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    made++;
  }
  console.log(`og: ${made} files written`);
}

async function logos() {
  const dir = path.join(root, "public/images");
  for (const name of ["reddoor-logo", "reddoor-logo-reverse"]) {
    const src = path.join(dir, `${name}.png`);
    const out = path.join(dir, `${name}-2x.png`);
    if (await fresh(src, out)) continue;
    await sharp(src).resize({ height: 104 }).png({ compressionLevel: 9 }).toFile(out);
    console.log(`logo: ${name}-2x.png`);
  }
}

await responsiveWidths();
await ogImages();
await logos();
