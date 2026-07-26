import type { Member } from "./types";

const YEAR = "2026–27";

/**
 * The 2026–27 board — nine confirmed members with real names and photos.
 */
export const coreTeam: Member[] = [
  { name: "Surajiv Arul", role: "President", year: YEAR, img: "/team/president.jpg", confirmed: true },
  { name: "Iniyaa S", role: "Secretary", year: YEAR, img: "/team/secretary.jpeg", confirmed: true },
  { name: "S G Anjana", role: "Vice President", year: YEAR, img: "/team/vice-president.jpg", confirmed: true },
  { name: "N V Tejaharshini", role: "Joint Secretary", year: YEAR, img: "/team/joint-secretary.webp", confirmed: true },
  { name: "Nirmal", role: "Chief Sergeant", year: YEAR, img: "/team/chief-sergeant.webp", confirmed: true },
  { name: "Thanmayya", role: "Head of Avenue", year: YEAR, img: "/team/head-of-avenue.jpg", confirmed: true },
  { name: "G Shobini", role: "Immediate Past President", year: YEAR, img: "/team/immediate-past-president.jpg", confirmed: true },
  { name: "S Srinath", role: "Chief Advisory", year: YEAR, img: "/team/chief-advisory.jpg", confirmed: true },
  { name: "Guhan", role: "Advisory", year: YEAR, img: "/team/advisory.jpeg", confirmed: true },
];

/** Officers only — the tight Home teaser (confirmed faces). */
export const homeTeam = coreTeam.filter((m) => m.confirmed);

/** Avatar set for the MaskedAvatars reveal strip (name shown on hover). */
export const teamAvatars = coreTeam.slice(0, 7).map((m) => ({
  name: m.name,
  avatar: m.img,
}));

/** Past Presidents roster (2019 → 2027), newest first. */
export const pastPresidents: { year: string; name: string; img: string }[] = [
  { year: "2026–27", name: "Surajiv Arul", img: "/presidents/2026-surajiv-arul.jpg" },
  { year: "2025–26", name: "Shobini G", img: "/presidents/2025-shobini-g.jpg" },
  { year: "2024–25", name: "Kavin Priyadarrsan M", img: "/presidents/2024-kavin-priyadarrsan.jpg" },
  { year: "2023–24", name: "Sruthi Jain", img: "/presidents/2023-sruthi-jain.jpg" },
  { year: "2022–23", name: "Saravanan G", img: "/presidents/2022-saravanan-g.jpg" },
  { year: "2021–22", name: "Varun Vignesh R", img: "/presidents/2021-varun-vignesh.jpg" },
  { year: "2020–21", name: "Lenin M", img: "/presidents/2020-lenin-m.jpg" },
  { year: "2019–20", name: "Parvathi Suresh", img: "/presidents/2019-parvathi-suresh.jpg" },
];
