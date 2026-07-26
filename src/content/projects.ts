import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "kadal-karai",
    name: "Kadal Karai",
    tagline: "Preserving Chennai's coastline, one cleanup at a time.",
    paragraphs: [
      "Kadal Karai is the flagship environmental initiative of the Rotaract Club of VIT Chennai, dedicated to preserving Chennai's coastline through consistent beach clean-up drives and environmental awareness. Conducted every alternate weekend, the project brings together volunteers who are passionate about protecting marine ecosystems and promoting sustainable living.",
      "With each cleanup, volunteers remove plastic waste, bottles, packaging materials, and other non-biodegradable debris from the shoreline, restoring cleaner and safer beaches for both people and marine life. Beyond waste collection, Kadal Karai aims to educate participants and the public on the importance of responsible waste disposal, environmental conservation, and collective action.",
      "More than just a clean-up drive, Kadal Karai has grown into a movement that inspires youth to become active environmental stewards. Through consistency, community participation, and a shared commitment to sustainability, the initiative continues to create a lasting impact — one beach, one volunteer and one cleanup at a time.",
    ],
    images: [
      "/projects/kadal-karai-1.jpg",
      "/projects/kadal-karai-2.jpg",
      "/projects/kadal-karai-3.jpg",
    ],
    // Real cleanup-drive photos for the pinned scene's parallax strips.
    sceneImages: [
      "/kk/kk-1.jpg",
      "/kk/kk-2.jpg",
      "/kk/kk-3.jpg",
      "/kk/kk-4.jpg",
      "/kk/kk-5.jpg",
      "/kk/kk-6.jpg",
      "/kk/kk-7.jpg",
    ],
    stats: [
      { value: 40, suffix: "+", label: "Cleanup drives" },
      { value: 5000, suffix: "kg+", label: "Waste removed" },
      { value: 2, suffix: "×", label: "South Asia awards" },
    ],
  },
];

export const signatureProject = projects[0];
