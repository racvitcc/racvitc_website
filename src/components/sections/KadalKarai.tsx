import type { Project } from "@/content/types";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitReveal from "@/components/motion/SplitReveal";
import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Placeholder from "@/components/ui/Placeholder";
import { ArrowRight } from "lucide-react";

/**
 * Signature Project — Kadal Karai (§5.9). Static teaser shown on mobile /
 * reduced-motion (the desktop cinematic scene falls back to this). Carries the
 * one sanctioned palette break in the site (ocean → seafoam → sand) and an
 * auto-scrolling strip of the real cleanup photos used in the pinned scene.
 */
export default function KadalKarai({ project }: { project: Project | null }) {
  if (!project) return null;
  const p = project;
  const photos = p.sceneImages ?? [];
  // Duplicate the list so the CSS marquee loops seamlessly at translateX(-50%).
  const marquee = [...photos, ...photos];

  return (
    <section
      id="kadal-karai"
      className="relative overflow-hidden py-28 text-white sm:py-36"
      style={{
        background:
          "linear-gradient(180deg,#06273a 0%,#0a3d5c 45%,#116a72 80%,#3a8f86 100%)",
      }}
    >
      {/* seafoam glow + sand base */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#5fd0c5]/20 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(180deg,transparent,#e8d9b5)" }}
      />

      <div className="u-container relative z-10">
        <Eyebrow className="text-[#8fe9dd]">Signature Project</Eyebrow>

        <SplitReveal
          as="h2"
          type="chars"
          stagger={0.03}
          className="u-display mt-6 text-[clamp(3rem,12vw,10rem)] leading-[0.9] text-white"
        >
          Kadal Karai
        </SplitReveal>

        <p className="mt-4 max-w-xl text-white/70">{p.tagline}</p>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <p className="text-lg leading-relaxed text-white/80 lg:col-span-7">
            {p.paragraphs[0]}
          </p>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* stacked stat list — never crowds the way a 3-across grid did */}
            <Reveal
              stagger={0.1}
              className="flex flex-col divide-y divide-white/15 rounded-2xl border border-white/15 bg-black/25 px-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md"
            >
              {p.stats?.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="u-display text-3xl text-[#8fe9dd] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-right text-sm font-medium text-white/85">{s.label}</span>
                </div>
              ))}
            </Reveal>
            <Button href="/#join" variant="gold" magnetic cursor="join" className="w-max">
              Join a cleanup <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* auto-scrolling strip of real cleanup photos (same set as the pinned
          parallax scene). Pure-CSS marquee — pauses under reduced motion. */}
      {photos.length > 0 && (
        <div
          className="relative z-10 mt-16 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
            maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
          }}
        >
          <div className="flex w-max animate-marquee">
            {marquee.map((src, i) => (
              <div
                key={i}
                className="mr-4 h-28 w-44 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 sm:h-36 sm:w-56"
              >
                <Placeholder
                  seed={`kk-teaser-${i}`}
                  src={src}
                  label="Kadal Karai"
                  kind="scene"
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
