"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/projects";
import Picture, { pictureAttrs } from "./Picture";
import { ArrowLeft as ChevronLeft, ArrowRight as ChevronRight, Close } from "./icons";

// Grid of photos with explicit aspect ratios (no CLS) that opens a <dialog> lightbox.
export default function Gallery({
  photos,
  caption,
  columns = 3,
  className = "",
}: {
  photos: Photo[];
  /** Appended to each caption, e.g."Atlanta area". */
  caption?: string;
  columns?: 2 | 3;
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastButton = useRef<HTMLElement | null>(null);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) {
      d.showModal();
      document.body.classList.add("scroll-locked");
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key ==="ArrowRight") step(1);
      if (e.key ==="ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  function onClose() {
    document.body.classList.remove("scroll-locked");
    setIndex(null);
    lastButton.current?.focus();
  }

  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className={`grid gap-2 ${cols} ${className}`}>
        {photos.map((ph, i) => (
          <li key={ph.src} className={ph.w / ph.h > 1.6 ? "sm:col-span-2" : ""}>
            <button
              type="button"
              className="ph group block w-full text-left focus-visible:outline-offset-4"
              onClick={(e) => {
                lastButton.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Open photo: ${ph.alt}`}
            >
              <Picture
                photo={ph}
                sizes={columns === 2 ? "(min-width: 640px) 48vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"}
                className={`overflow-hidden ${ph.w / ph.h > 1.6 ? "aspect-[2/1] sm:aspect-[2.1/1]" : "aspect-[4/3]"}`}
                imgClassName="h-full w-full object-cover"
              />
              <span className="sr-only">{caption ? `${ph.alt}, ${caption}` : ph.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={onClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label="Photo viewer"
        className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-ink"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 small text-muted">
              <span>
                {index! + 1} / {photos.length}
              </span>
              <button type="button" onClick={close} className="link inline-flex items-center gap-2" aria-label="Close">
                Close <Close size={18} />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...pictureAttrs(current)}
                sizes="100vw"
                alt={current.alt}
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                className="square-btn absolute left-2 top-1/2 -translate-y-1/2"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="square-btn absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            <p className="mx-auto px-4 py-4 text-center small text-muted">
              {current.alt}
              {caption && <span>, {caption}</span>}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
