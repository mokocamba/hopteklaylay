import sustainability from "@/assets/sustain-option-1-tescon.jpg";
import innovation from "@/assets/frame-innovation.jpg";
import intelligence from "@/assets/frame-intelligence.jpg";
import investment from "@/assets/frame-investment.jpg";
import development from "@/assets/frame-development.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  video: string;
};

const VIDEO_URLS = {
  sustainability: "https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/sustain-option-1-tescon.mp4",
  innovation: "https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/loop-innovation.mp4",
  intelligence: "https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/loop-intelligence.mp4",
  investment: "https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/loop-investment.mp4",
  development: "https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/loop-development.mp4",
};

export const services: Service[] = [
  {
    slug: "sustainability",
    title: "Sustainability",
    short: "Passive House envelopes, all-electric homes.",
    description:
      "Sustainability is the foundation of every Lefka City project. We build new construction to Passive House (PHIUS and PHI) standards: super-insulated, airtight envelopes with thermal-bridge-f[...]",
    image: sustainability,
    video: VIDEO_URLS.sustainability,
  },
  {
    slug: "innovation",
    title: "Innovation",
    short: "Modern building science, rigorously applied.",
    description:
      "We treat every new build as an applied building-science project. Advanced framing, continuous exterior insulation, mineral-wool and wood-fiber assemblies, high-performance glazing, WUFI moi[...]",
    image: innovation,
    video: VIDEO_URLS.innovation,
  },
  {
    slug: "intelligence",
    title: "Intelligence",
    short: "Data-driven design, smart-home ready.",
    description:
      "Intelligence runs through the entire build, from pre-construction modeling to the way the home operates. We use energy modeling and life-cycle cost analysis to make informed decisions early[...]",
    image: intelligence,
    video: VIDEO_URLS.intelligence,
  },
  {
    slug: "investment",
    title: "Investment",
    short: "Construction management that protects capital.",
    description:
      "A high-performance home is a long-term asset. As construction manager, we act as the owner's representative — managing budgets, schedules, trades and quality control with real-time report[...]",
    image: investment,
    video: VIDEO_URLS.investment,
  },
  {
    slug: "land-development",
    title: "Land Development",
    short: "From raw parcels to build-ready sites.",
    description:
      "As an active developer, we acquire and entitle land across the Hudson Valley, Catskills and Capital Region. Feasibility, due diligence, subdivision, zoning and permitting, civil engineering[...]",
    image: development,
    video: VIDEO_URLS.development,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
