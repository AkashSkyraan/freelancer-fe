import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "../../components/card/ProjectCard";

// Mock data – in index.jsx call your API and pass the response as `projects`.
const mockProjects = [
  {
    id: 1,
    companyName: "Skyraan Technologies",
    companyLogo: "https://picsum.photos/seed/skyraan/80/80",
    postedBy: "Jhone Mehathy",
    title: 'Simple logo for "VIP Creator" (Content creator website)',
    postedTime: "1 hour",
    location: "Saravanambatti-Coimbatore",
    description:
      'Project: Simple logo for "VIP Creator" ( creator website) I need a very simple logo for a website called LorranaVIP. Minimalistic, clean, modern. Not a complex brand design. Just a quick logo delivery. Requirements: • Text logo: "LorranaVIP" • Simple icon or monogram (optional)',
    skills: ["Figma", "Illustrator", "Photoshop", "Canva", "XD"],
    category: "UI/UX Designer",
    duration: "1 Year",
    freelancers: "0/3 Freelancers",
    budgetType: "Fixed Price",
    href: "/projects/1",
  },
  {
    id: 2,
    companyName: "Skyraan Technologies",
    companyLogo: "https://picsum.photos/seed/skyraan/80/80",
    postedBy: "Jhone Mehathy",
    title: 'Simple logo for "VIP Creator" (Content creator website)',
    postedTime: "1 hour",
    location: "Saravanambatti-Coimbatore",
    description:
      'Project: Simple logo for "VIP Creator" ( creator website) I need a very simple logo for a website called LorranaVIP. Minimalistic, clean, modern. Not a complex brand design. Just a quick logo delivery. Requirements: • Text logo: "LorranaVIP" • Simple icon or monogram (optional)',
    skills: ["Figma", "Illustrator", "Photoshop", "Canva", "XD"],
    category: "UI/UX Designer",
    duration: "1 Year",
    freelancers: "0/3 Freelancers",
    budgetType: "Fixed Price",
    href: "/projects/2",
  },
  {
    id: 3,
    companyName: "Skyraan Technologies",
    companyLogo: "https://picsum.photos/seed/skyraan/80/80",
    postedBy: "Jhone Mehathy",
    title: "Landing page design for a SaaS product Simple logo for VIP Creator",
    postedTime: "3 hours",
    location: "Peelamedu-Coimbatore",
    description:
      "Need a modern landing page design with hero, pricing and testimonial sections. Should be clean, responsive and.",
    skills: ["Figma", "Webflow"],
    category: "Designer",
    duration: "2 Months",
    freelancers: "1/3 Freelancers",
    budgetType: "Fixed Price",
    href: "/projects/3",
  },
  {
    id: 4,
    companyName: "Skyraan Technologies",
    companyLogo: "https://picsum.photos/seed/skyraan/80/80",
    postedBy: "Jhone Mehathy",
    title: "Mobile app UI kit for a fitness startup",
    postedTime: "5 hours",
    location: "Gandhipuram-Coimbatore",
    description:
      "Looking for a designer to create a complete mobile UI kit with onboarding, dashboard, workout and profile screens. Clean visuals, consistent components and a handoff-ready Figma file.",
    skills: ["Figma", "Photoshop", "XD", "Sketch"],
    category: "Designer",
    duration: "3 Months",
    freelancers: "2/3 Freelancers",
    budgetType: "Fixed Price",
    href: "/projects/4",
  },
];

const ChevronIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d={direction === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
  </svg>
);

export default function TrendingProjects({ projects = mockProjects }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, projects]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = el.firstElementChild.offsetWidth + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Trending Projects
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse high-demand projects and connect with skilled freelancers
              today.
            </p>
          </div>
          <a
            href="/freelancers"
            className="shrink-0 text-xs text-blue-500 underline underline-offset-2 hover:text-blue-600"
          >
            Explore All Freelancers
          </a>
        </div>

        {/* Carousel */}
        <div className="relative mt-6">
          {/* Left arrow */}
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="absolute -left-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500 bg-white text-blue-500 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex lg:-left-10"
          >
            <ChevronIcon direction="left" />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(40%-0.5rem)]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500 bg-white text-blue-500 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex lg:-right-10"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
