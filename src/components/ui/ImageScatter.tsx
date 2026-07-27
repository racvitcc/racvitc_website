"use client";

// Ported from vengenceui.com/r/image-scatter.json — brand-adapted, dup-key fixed.
import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined" && !ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

export interface ScatterSet {
  heading: string;
  images: string[];
}

export interface ImageScatterProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ScatterSet[];
  cardWidth?: number;
  cardHeight?: number;
  animationDuration?: number;
  animationOverlap?: number;
  headingFadeDuration?: number;
  interval?: number;
}

export function ImageScatter({
  data,
  cardWidth = 230,
  cardHeight = 290,
  animationDuration = 0.75,
  animationOverlap = 0.5,
  headingFadeDuration = 0.5,
  interval = 3000,
  className,
  ...props
}: ImageScatterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current || !headingRef.current || data.length === 0) return;
    const gallery = galleryRef.current;
    const galleryHeading = headingRef.current;

    const viewport = { centerX: 0, centerY: 0, rangeMin: 0, rangeMax: 0 };
    const state = { activeCards: [] as { element: HTMLDivElement; centerX: number; centerY: number }[], currentSection: 0, isAnimating: false };

    // Effective card size + scatter radius, shrunk on small screens so the
    // cards don't overflow a phone or bury the heading. Recomputed on resize.
    const aspect = cardHeight / cardWidth;
    let cw = cardWidth;
    let ch = cardHeight;

    function updateViewport() {
      const c = containerRef.current!;
      const w = c.clientWidth;
      const h = c.clientHeight;
      const small = w < 640;
      cw = small ? Math.max(116, Math.round(w * 0.4)) : cardWidth;
      ch = Math.round(cw * aspect);
      viewport.centerX = w / 2;
      viewport.centerY = h / 2;
      const base = Math.min(w, h);
      viewport.rangeMin = base * (small ? 0.26 : 0.35);
      viewport.rangeMax = base * (small ? 0.5 : 0.7);
    }
    updateViewport();

    function getEdgePosition(centerX: number, centerY: number) {
      const w = containerRef.current?.clientWidth || window.innerWidth;
      const h = containerRef.current?.clientHeight || window.innerHeight;
      const d = { left: centerX, right: w - centerX, top: centerY, bottom: h - centerY };
      const min = Math.min(...Object.values(d));
      const ov = () => (Math.random() - 0.5) * Math.min(400, w * 0.6);
      if (min === d.left) return { x: -cw - 100 - Math.random() * 200, y: centerY - ch / 2 + ov() };
      if (min === d.right) return { x: w + 50 + Math.random() * 200, y: centerY - ch / 2 + ov() };
      if (min === d.top) return { x: centerX - cw / 2 + ov(), y: -ch - 100 - Math.random() * 200 };
      return { x: centerX - cw / 2 + ov(), y: h + 50 + Math.random() * 200 };
    }

    function createCards(sectionIndex: number) {
      const cards: { element: HTMLDivElement; centerX: number; centerY: number }[] = [];
      const sectionData = data[sectionIndex];
      if (!sectionData?.images.length) return cards;
      const count = sectionData.images.length;
      sectionData.images.forEach((src, i) => {
        const card = document.createElement("div");
        card.className = "absolute rounded-2xl border-4 sm:border-8 border-paper-2 shadow-xl overflow-hidden will-change-transform";
        card.style.width = `${cw}px`;
        card.style.height = `${ch}px`;
        const img = document.createElement("img");
        img.src = src;
        img.className = "w-full h-full object-cover rounded-lg pointer-events-none";
        card.appendChild(img);
        // Spread cards evenly around the heading (with a little jitter) so they
        // never bunch into one corner — the fully-random angle looked buggy.
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * (Math.PI / count);
        const radius = viewport.rangeMin + Math.random() * (viewport.rangeMax - viewport.rangeMin);
        const centerX = viewport.centerX + Math.cos(angle) * radius;
        const centerY = viewport.centerY + Math.sin(angle) * radius;
        gsap.set(card, { left: centerX - cw / 2, top: centerY - ch / 2, rotation: Math.random() * 50 - 25 });
        gallery.appendChild(card);
        cards.push({ element: card, centerX, centerY });
      });
      return cards;
    }

    function animateHeading(newText: string) {
      return gsap.timeline()
        .to(galleryHeading, { opacity: 0, duration: headingFadeDuration, ease: "power2.inOut" })
        .call(() => { galleryHeading.textContent = newText; })
        .to(galleryHeading, { opacity: 1, duration: headingFadeDuration, ease: "power2.inOut" });
    }

    function animateCards(exiting: typeof state.activeCards, entering: typeof state.activeCards) {
      const tl = gsap.timeline();
      exiting.forEach(({ element, centerX, centerY }) => {
        const edge = getEdgePosition(centerX, centerY);
        tl.to(element, { left: edge.x, top: edge.y, rotation: Math.random() * 180 - 90, duration: animationDuration, ease: "power2.in", onComplete: () => element.remove() }, 0);
      });
      entering.forEach(({ element, centerX, centerY }) => {
        const edge = getEdgePosition(centerX, centerY);
        gsap.set(element, { left: edge.x, top: edge.y, rotation: Math.random() * 180 - 90 });
        tl.to(element, { left: centerX - cw / 2, top: centerY - ch / 2, rotation: Math.random() * 50 - 25, duration: animationDuration, ease: "power2.out" }, animationOverlap);
      });
      return tl;
    }

    galleryHeading.textContent = data[0]?.heading || "";
    gsap.set(galleryHeading, { opacity: 1 });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let started = false;
    function nextSection() {
      if (state.isAnimating) return;
      const target = (state.currentSection + 1) % data.length;
      state.isAnimating = true;
      const newCards = createCards(target);
      Promise.all([animateCards(state.activeCards, newCards).then(), animateHeading(data[target]?.heading || "").then()]).then(() => {
        state.activeCards = newCards;
        state.currentSection = target;
        state.isAnimating = false;
      });
    }

    // Only build the (eager-loaded) photo cards and run the cycle animation
    // while the section is near the viewport — otherwise it churns the main
    // thread and downloads every image far below the fold, tanking LCP/TBT.
    function ensureRunning() {
      if (!started) { started = true; state.activeCards = createCards(0); }
      if (!reduced && !intervalId) intervalId = setInterval(nextSection, interval);
    }
    function pause() { if (intervalId) { clearInterval(intervalId); intervalId = undefined; } }
    const io = new IntersectionObserver(
      (entries) => (entries.some((e) => e.isIntersecting) ? ensureRunning() : pause()),
      { rootMargin: "200px 0px" }
    );
    io.observe(containerRef.current);

    const onResize = () => { if (!started) return; state.activeCards.forEach(({ element }) => element.remove()); updateViewport(); state.activeCards = createCards(state.currentSection); };
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (intervalId) clearInterval(intervalId);
      state.activeCards.forEach(({ element }) => element.remove());
    };
  }, [data, cardWidth, cardHeight, animationDuration, animationOverlap, headingFadeDuration, interval]);

  return (
    <section ref={containerRef} className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent", className)} {...props}>
      <div ref={galleryRef} className="pointer-events-none absolute inset-0" />
      <h1 ref={headingRef} className="u-display z-10 w-[90%] text-center text-[clamp(2rem,6vw,5rem)] leading-tight tracking-tight text-ink will-change-[opacity] md:w-[55%]" />
    </section>
  );
}
