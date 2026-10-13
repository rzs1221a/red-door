import type { Photo } from "@/lib/projects";

// Responsive widths written by scripts/images.mjs into public/images/projects/_r/.
const WIDTHS = [480, 800, 1200, 1600];

/** srcSet/src/width/height for a project photo. Works for any Photo under /images/projects/. */
export function pictureAttrs(photo: Photo) {
  const m = photo.src.match(/^\/images\/projects\/([^/]+)\.webp$/);
  if (!m) return { src: photo.src, width: photo.w, height: photo.h };
  const name = m[1];
  const candidates = WIDTHS.filter((w) => w < photo.w).map((w) => `/images/projects/_r/${name}-${w}.webp ${w}w`);
  candidates.push(`${photo.src} ${photo.w}w`);
  return { src: photo.src, srcSet: candidates.join(", "), width: photo.w, height: photo.h };
}

export default function Picture({
  photo,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  draggable,
}: {
  photo: Photo;
  /** Required: the rendered width hint, e.g. "(min-width: 1024px) 40vw, 100vw". */
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  draggable?: boolean;
}) {
  const attrs = pictureAttrs(photo);
  return (
    <span className={`block bg-paper-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...attrs}
        sizes={sizes}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        draggable={draggable}
        className={`block h-auto w-full ${imgClassName}`}
      />
    </span>
  );
}
