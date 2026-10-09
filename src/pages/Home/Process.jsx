import icons from "../../config/Icons";
import images from "../../config/Images";

const steps = [
  {
    id: 1,
    title: "Create Profile",
    description:
      "Browse high-demand projects and connect with skilled freelancers today.",
    color: "bg-amber-400",
  },
  {
    id: 2,
    title: "Document Verify",
    description:
      "Browse high-demand projects and connect with skilled freelancers today.",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Explore Projects",
    description:
      "Browse high-demand projects and connect with skilled freelancers today.",
    color: "bg-green-500",
  },
];

// `position` only applies on lg screens (floating around the section).
// On mobile/tablet the icons are shown as a vertical column on the right.
const appIcons = [
  {
    id: "figma",
    name: "Figma",
    src: icons.FigmaIcon,
    position: "lg:left-[16%] lg:top-[15%]",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    src: icons.IllustratorIcon,
    position: "lg:left-[78%] lg:top-[15%]",
  },
  {
    id: "wordpress",
    name: "WordPress",
    src: icons.WordpressIcon,
    position: "lg:left-[35%] lg:top-[77%]",
  },
  {
    id: "flutter",
    name: "Flutter",
    src: icons.FlutterIcon,
    position: "lg:left-[66%] lg:top-[83%]",
  },
];

export default function Process() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-sky-50 via-emerald-50 to-orange-50 py-10 sm:py-20">
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url(${images.GridBackground})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      />

      {/* App icons: vertical column on mobile/tablet, floating on lg */}
      <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-6 sm:right-8 sm:gap-8 lg:inset-0 lg:right-0 lg:block lg:translate-y-0">
        {appIcons.map(({ id, name, src, position }) => (
          <div
            key={id}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md sm:h-11 sm:w-11 lg:absolute lg:h-13 lg:w-13 ${position}`}
          >
            <img
              src={src}
              alt={name}
              className="h-5 w-5 object-contain sm:h-7 sm:w-7"
            />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Process of find Projects
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">
            Browse high-demand projects and connect with skilled freelancers
            today.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-10 pr-14 sm:mt-12 sm:pr-16 lg:pr-0">
          {/* vertical line (mobile/tablet) */}
          <span className="absolute bottom-6 left-[22px] top-6 w-px bg-gray-300 lg:hidden" />
          {/* horizontal line (lg) */}
          <span className="absolute left-[16.66%] right-[16.66%] top-[22px] hidden h-px bg-gray-300 lg:block" />

          <ol className="relative flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-6">
            {steps.map(({ id, title, description, color }) => (
              <li
                key={id}
                className="flex items-start gap-4 text-left lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white ${color}`}
                >
                  {id}
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-gray-600 sm:max-w-xs lg:mx-auto">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
