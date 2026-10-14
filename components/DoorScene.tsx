import type { CSSProperties } from "react";
import type { Photo } from "@/lib/projects";
import { pictureAttrs } from "./Picture";

function Leaf() {
  return (
    <div className="door-leaf">
      <div className="door-back" />
      <div className="door-face">
        <div className="door-panels">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              <i className="door-panel-well" />
              <i className="door-panel-top" />
              <i className="door-panel-bottom" />
              <i className="door-panel-left" />
              <i className="door-panel-right" />
              <i className="door-panel-rim" />
            </span>
          ))}
        </div>
        <div className="door-escutcheon">
          <span className="door-screw" />
          <i className="door-spindle" />
          <b className="door-lever">
            <span />
          </b>
          <em className="door-keyhole" />
          <span className="door-screw door-screw-bottom" />
        </div>
        <div className="door-kickplate" />
        <div className="door-sheen" />
      </div>
      <div className="door-edge">
        <i className="door-latch" />
      </div>
      <div className="door-top-edge" />
    </div>
  );
}

/** Shared door artwork. Angles are actual degrees; animation is owned by DoorIntro. */
export default function DoorScene({
  rooms, angle = 38, className = "", region = "Atlanta area", caption = false,
}: {
  rooms: { label: string; photo: Photo }[];
  angle?: number;
  className?: string;
  region?: string;
  caption?: boolean;
}) {
  const room = rooms[0];
  if (!room) return null;
  return (
    <div className={className}>
      <figure data-ui className="door" style={{ "--door-angle": Math.min(52, Math.max(0, angle)) } as CSSProperties}
        aria-label={`A red door opening onto a ${room.label.toLowerCase()}, a Red Door Revivals project in the ${region}`}>
        <div className="door-scene" aria-hidden="true">
          <div className="door-halo" />
          <div className="door-floor" />
          <div className="door-portal">
            <div className="door-cornice" />
            <div className="door-transom"><span /><span /><span /></div>
            <div className="door-opening">
              <div className="door-interior">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...pictureAttrs(room.photo)} sizes="320px" alt="" className="is-on" decoding="async" draggable={false} />
              </div>
              <div className="door-reveal-shadow" />
              <Leaf />
              <span className="door-hinge door-hinge-top" />
              <span className="door-hinge door-hinge-middle" />
              <span className="door-hinge door-hinge-bottom" />
            </div>
            <div className="door-threshold" />
          </div>
        </div>
        {caption && <figcaption className="door-caption small">{room.label} — {region}<span className="door-caption-note">A Red Door Revivals renovation</span></figcaption>}
      </figure>
    </div>
  );
}
