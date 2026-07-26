"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { signatureProject } from "@/content/projects";
import { nextKadalKaraiEvent } from "@/content/events";
import { formatEventDate, cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import Placeholder from "@/components/ui/Placeholder";
import KadalKarai from "./KadalKarai";

/**
 * Kadal Karai — pinned parallax scene (§5.9). A sticky stage holds the title
 * while beach strips drift and an ocean overlay scrubs away to reveal the
 * photos. Falls back to the static teaser on mobile / reduced motion.
 */
// Field-log HUD target — a plausible per-drive haul, not the lifetime total
// already shown in the big pinned stats (5,000kg+). Ticks up as its own beat
// so the two numbers read as "one drive" vs. "the whole campaign."
const HUD_KG_TARGET = 42;

// Seamless wave path: 6 full periods across a 1440 viewBox, so a translateX of
// -50% (720 = 3 periods) loops without a visible seam. preserveAspectRatio is
// off so it stretches to each band's height.
const WAVE_D =
  "M0 60 q 60 -22 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 V120 H0 Z";

// Stacked wave bands — darker/slower at the back, brighter/faster foam in front.
const WAVE_LAYERS = [
  { color: "#0e4a63", height: "72%", dur: "23s", opacity: 0.3, reverse: false },
  { color: "#12707a", height: "56%", dur: "16s", opacity: 0.34, reverse: true },
  { color: "#3f9d92", height: "40%", dur: "11s", opacity: 0.45, reverse: false },
];

export default function KadalKaraiScene() {
  const [enhanced, setEnhanced] = useState(false);
  const hudKgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (desktop && !reduced) setEnhanced(true);
  }, []);

  // useGsapContext's setup only ever runs once its returned scope ref is
  // attached to an element (it no-ops otherwise) — attach it below instead of
  // the plain useRef this used to hold, or every animation here (not just the
  // new HUD counter) silently never plays.
  const scope = useGsapContext<HTMLDivElement>(
    () => {
      if (!enhanced || !scope.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      tl.to(".kk-strip", { xPercent: -18, ease: "none" }, 0);
      tl.to(".kk-strip-2", { xPercent: 12, ease: "none" }, 0);
      tl.fromTo(".kk-overlay", { opacity: 0.9 }, { opacity: 0.25, ease: "none" }, 0);
      tl.fromTo(".kk-title", { scale: 1.14 }, { scale: 1, ease: "none" }, 0);
      tl.from(".kk-stat", { yPercent: 40, opacity: 0, stagger: 0.1, ease: "power2.out" }, 0.15);
      tl.from(".kk-hud", { opacity: 0, y: -12, ease: "power2.out" }, 0.1);
      const hud = { kg: 0 };
      tl.to(
        hud,
        {
          kg: HUD_KG_TARGET,
          ease: "power1.out",
          onUpdate: () => {
            if (hudKgRef.current) hudKgRef.current.textContent = String(Math.round(hud.kg));
          },
        },
        0.15
      );
    },
    [enhanced]
  );

  if (!enhanced) return <KadalKarai />;

  const p = signatureProject;
  const nextDrive = nextKadalKaraiEvent;
  // 8 tiles (2 strips × 4) from the 7 real photos. Explicit arrangement:
  // kk-1 appears once, centered in the top strip; kk-3 fills the 8th tile so
  // it's the only photo shown twice. All seven photos appear.
  const [k1, k2, k3, k4, k5, k6, k7] = p.sceneImages ?? [];
  const stripA = [k2, k4, k1, k5]; // kk-1 in the middle of the top strip
  const stripB = [k3, k6, k7, k3]; // kk-3 twice, no other repeats

  return (
    <div ref={scope} className="relative h-[165vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#06273a] text-white">
        {/* parallax photo strips */}
        <div className="kk-strip absolute inset-x-[-10%] top-[12%] flex gap-4 opacity-90">
          {stripA.map((src, i) => (
            <div key={i} className="h-56 w-[28vw] shrink-0 overflow-hidden rounded-2xl">
              <Placeholder seed={`kk-a-${i}`} src={src} label="Kadal Karai" kind="scene" className="h-full w-full" />
            </div>
          ))}
        </div>
        <div className="kk-strip-2 absolute inset-x-[-10%] bottom-[10%] flex gap-4 opacity-90">
          {stripB.map((src, i) => (
            <div key={i} className="h-56 w-[28vw] shrink-0 overflow-hidden rounded-2xl">
              <Placeholder seed={`kk-b-${i}`} src={src} label="Beach cleanup" kind="scene" className="h-full w-full" />
            </div>
          ))}
        </div>

        {/* ocean overlay */}
        <div
          className="kk-overlay absolute inset-0"
          style={{ background: "linear-gradient(180deg,#06273a,#0a3d5c 60%,#116a72)" }}
        />

        {/* underwater caustic shimmer drifting across the stage */}
        <div className="kk-caustics pointer-events-none absolute inset-0" aria-hidden />

        {/* sliding wave bands at the waterline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]" aria-hidden>
          {WAVE_LAYERS.map((w, i) => (
            <div
              key={i}
              className="kk-wave absolute bottom-0 left-0"
              style={{
                height: w.height,
                color: w.color,
                opacity: w.opacity,
                ["--kk-wave-dur" as string]: w.dur,
                animationDirection: w.reverse ? "reverse" : "normal",
              }}
            >
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full">
                <path d={WAVE_D} fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>

        {/* live field-log HUD — this drive's own numbers, distinct from the
            campaign-lifetime stats pinned center-stage */}
        <div className="kk-hud absolute left-6 top-24 z-20 hidden flex-col gap-1.5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur sm:flex md:left-10 md:top-28">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#8fe9dd]">Field Log · Live</span>
          {nextDrive && (
            <>
              <span className="flex items-center gap-2 text-xs text-white/80">
                <MapPin className="h-3 w-3 shrink-0 text-[#8fe9dd]" /> {nextDrive.location}
              </span>
              <span className="flex items-center gap-2 text-xs text-white/80">
                <Clock className="h-3 w-3 shrink-0 text-[#8fe9dd]" /> {nextDrive.time}
              </span>
            </>
          )}
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className="u-display text-xl text-[#8fe9dd]"><span ref={hudKgRef}>0</span>kg</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/50">this drive</span>
          </span>
        </div>

        {/* pinned title + stats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8fe9dd]">Signature Project</span>
          <h2 className="kk-title u-display text-[clamp(3rem,14vw,12rem)] leading-[0.85]">Kadal Karai</h2>
          <p className="max-w-xl text-white/80">{p.tagline}</p>
          <div className="mt-4 flex items-stretch gap-6 rounded-2xl border border-white/15 bg-black/30 px-6 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md sm:gap-10 sm:px-9 sm:py-5">
            {p.stats?.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "kk-stat flex flex-col items-center",
                  i > 0 && "border-l border-white/15 pl-6 sm:pl-10"
                )}
              >
                <span className="u-display text-4xl text-[#8fe9dd] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-5xl">
                  {s.value.toLocaleString("en-IN")}{s.suffix}
                </span>
                <span className="mt-1 text-xs font-medium text-white/85">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
