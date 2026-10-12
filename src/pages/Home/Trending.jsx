import { useCallback, useEffect, useRef, useState } from "react";

import ProjectCard from "../../components/card/ProjectCard";
import FreelancerCard from "../../components/card/FreelancerCard";
import useHomeModeStore from "../../store/HomeModeStore";

// Mock project data
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

// Replace this with freelancer data matching your FreelancerCard props.
const mockFreelancers = [
  {
    id: 1,
    name: "Arun Kumar",
    avatar: "https://i.pravatar.cc/150?img=12",
    coverImage: "https://picsum.photos/seed/design-cover/500/250",
    category: "UI/UX Designer",
    location: "Coimbatore, Tamil Nadu",
    isAvailable: true,
    totalJobs: 42,
    completedPercent: 95,
    rating: 4.9,
    skills: ["Figma", "Photoshop", "Adobe XD", "Prototyping"],
    href: "/freelancers/1",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=47",
    coverImage: "https://picsum.photos/seed/development-cover/500/250",
    category: "Full Stack Developer",
    location: "Chennai, Tamil Nadu",
    isAvailable: true,
    totalJobs: 36,
    completedPercent: 92,
    rating: 4.8,
    skills: ["React", "Node.js", "MongoDB", "Express"],
    href: "/freelancers/2",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    avatar: "https://i.pravatar.cc/150?img=33",
    coverImage: "https://picsum.photos/seed/marketing-cover/500/250",
    category: "Digital Marketing Specialist",
    location: "Bengaluru, Karnataka",
    isAvailable: false,
    totalJobs: 58,
    completedPercent: 97,
    rating: 4.9,
    skills: [
      "SEO",
      "Google Ads",
      "Content Marketing",
      "Analytics",
      "AI",
      "new skill",
      "322",
    ],
    href: "/freelancers/3",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    avatar: "https://i.pravatar.cc/150?img=44",
    coverImage: "https://picsum.photos/seed/graphic-design-cover/500/250",
    category: "Graphic Designer",
    location: "Hyderabad, Telangana",
    isAvailable: true,
    totalJobs: 29,
    completedPercent: 90,
    rating: 4.7,
    skills: ["Illustrator", "Photoshop", "Canva", "Branding"],
    href: "/freelancers/4",
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

const TrendingProjects = ({
  projects = mockProjects,
  freelancers = mockFreelancers,
}) => {
  const homeMode = useHomeModeStore((state) => state.homeMode);

  const isFreelancerMode = homeMode === "freelancer";

  // Choose content based on Home mode
  const sectionContent = isFreelancerMode
    ? {
        title: "Trending Projects",
        description:
          "Browse high-demand projects and connect with skilled freelancers today.",
        linkText: "Explore All Projects",
        link: "/projects",
        items: projects,
      }
    : {
        title: "Top rated Freelancers",
        description:
          "Browse high-demand projects and connect with skilled freelancers today.",
        linkText: "Explore All Freelancers",
        link: "/freelancers",
        items: freelancers,
      };

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
    const el = trackRef.current;

    if (el) {
      el.scrollLeft = 0;
    }

    updateArrows();

    window.addEventListener("resize", updateArrows);

    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, homeMode, projects, freelancers]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;

    if (!el || !el.firstElementChild) return;

    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = el.firstElementChild.offsetWidth + gap;

    el.scrollBy({
      left: dir * step,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-[95%] mx-auto bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              {sectionContent.title}
            </h2>

            <p className="mt-2 text-base text-gray-600">
              {sectionContent.description}
            </p>
          </div>

          <a
            href={sectionContent.link}
            className="shrink-0 text-sm text-blue-500 underline underline-offset-2 hover:text-blue-600"
          >
            {sectionContent.linkText}
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
            {sectionContent.items.map((item) => (
              <div
                key={item.id}
                className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(40%-0.5rem)]"
              >
                {isFreelancerMode ? (
                  <ProjectCard project={item} />
                ) : (
                  <FreelancerCard freelancer={item} />
                )}
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
};

export default TrendingProjects;
