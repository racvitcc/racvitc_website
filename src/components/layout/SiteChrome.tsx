"use client";

import { usePathname } from "next/navigation";

import CustomCursor from "./CustomCursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";
import Preloader from "./Preloader";
import ScrollRail from "./ScrollRail";
import SmoothScroll from "./SmoothScroll";

const onStudio = (pathname: string | null) => !!pathname?.startsWith("/studio");

/** Marketing-site chrome rendered above the page content. Hidden on /studio so
 *  the embedded Sanity Studio gets a clean, native-scrolling full-screen
 *  surface (no Lenis hijack, custom cursor, navbar, or preloader). */
export function SiteChromeTop() {
  if (onStudio(usePathname())) return null;
  return (
    <>
      <Preloader />
      <PageTransition />
      <SmoothScroll />
      <CustomCursor />
      <ScrollRail />
      <Navbar />
    </>
  );
}

/** Site footer, likewise hidden on /studio. */
export function SiteChromeFooter() {
  if (onStudio(usePathname())) return null;
  return <Footer />;
}
