// Single project card. Pass ONE project object via the `project` prop.
// Expected shape:
// { id, companyName, companyLogo, postedBy, title, postedTime, location,
//   description, skills[], category, duration, freelancers, budgetType, href }

import icons from "../../config/Icons";

const MAX_VISIBLE_SKILLS = 3;

const svgBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const BookmarkIcon = () => (
  <svg {...svgBase} className="h-5 w-5">
    <path d="M6 3h12v18l-6-4-6 4V3Z" />
  </svg>
);

const MoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </svg>
);

const SendIcon = () => (
  <svg {...svgBase} className="h-4 w-4 shrink-0">
    <path d="M21 3 3 10.5l7 3 3 7L21 3Z" />
    <path d="m10 13.5 11-10.5" />
  </svg>
);

const PinIcon = () => (
  <svg {...svgBase} className="h-4 w-4 shrink-0">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DesignerIcon = () => (
  <svg {...svgBase} className="h-4 w-4 shrink-0">
    <path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z" />
    <circle cx="7.5" cy="11" r="1" />
    <circle cx="10" cy="7.5" r="1" />
    <circle cx="14.5" cy="7.5" r="1" />
  </svg>
);

const ClockIcon = () => (
  <svg {...svgBase} className="h-4 w-4 shrink-0">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const UsersIcon = () => (
  <svg {...svgBase} className="h-4 w-4 shrink-0">
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.3" />
    <path d="M16 14.2c2.8-.4 5 1.7 5 4.8" />
  </svg>
);

const CoinIcon = () => (
  <svg {...svgBase} className="h-4 w-4 shrink-0">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 8h6M9 11h6M9 8c3.5 0 3.5 5 0 5l4 3" />
  </svg>
);

// Icon + text. Text is truncated so it never wraps onto a second line.
function Meta({ icon, children, className = "" }) {
  return (
    <span
      className={`flex min-w-0 items-center gap-1.5 whitespace-nowrap ${className}`}
    >
      {icon}
      <span className="truncate">{children}</span>
    </span>
  );
}

export default function ProjectCard({ project }) {
  const {
    companyName,
    companyLogo,
    postedBy,
    title,
    postedTime,
    location,
    description,
    skills = [],
    category,
    duration,
    freelancers,
    budgetType,
    href,
  } = project;

  const visibleSkills = skills.slice(0, MAX_VISIBLE_SKILLS);
  const extra = skills.length - visibleSkills.length;

  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={companyLogo}
            alt={companyName}
            className="h-11 w-11 shrink-0 rounded-full bg-indigo-100 object-cover sm:h-14 sm:w-14"
          />
          <div className="min-w-0">
            <h4 className="truncate text-base font-semibold text-gray-900">
              {companyName}
            </h4>
            <p className="truncate text-sm text-blue-500">@{postedBy}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-gray-800">
          <button
            type="button"
            aria-label="Save project"
            className="hover:text-blue-500"
          >
            <img
              src={icons.BookmarkIcon}
              alt=""
              className="h-5 w-5 shrink-0 object-contain cursor-pointer"
            />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="hover:text-blue-500"
          >
            <img
              src={icons.MoreIcon}
              alt=""
              className="h-5 w-5 shrink-0 object-contain cursor-pointer"
            />{" "}
          </button>
        </div>
      </div>

      {/* Title – always reserves exactly 2 lines (1 line or 2 lines look the same) */}
      <h3 className="mt-2 text-lg font-semibold leading-7 text-gray-900 sm:text-lg line-clamp-1">
        {title}
      </h3>

      {/* Posted + location – always a single line */}
      <div className="mt-3 flex h-5 items-center gap-x-4 text-xs text-[#EA4335] sm:text-sm">
        <Meta
          icon={
            <img
              src={icons.ShareIcon}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          }
          className="shrink-0"
        >
          Posted {postedTime}
        </Meta>
        <Meta
          icon={
            <img
              src={icons.LocationIcon}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          }
        >
          {location}
        </Meta>
      </div>

      {/* Description – always reserves exactly 3 lines */}
      <p className="mt-4 line-clamp-2 text-sm leading-5 text-gray-500">
        {description}
      </p>

      {/* Skills – fixed height row */}
      <div className="mt-4 flex h-8 items-center gap-2">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="min-w-0 truncate rounded-full border border-blue-500 bg-blue-50/60 px-4 py-1.5 text-sm font-medium text-blue-500 sm:px-6"
          >
            {skill}
          </span>
        ))}
        {extra > 0 && (
          <span className="shrink-0 text-xs font-medium text-blue-500">
            {extra}+
          </span>
        )}
      </div>

      {/* Info row – reserves room for 2 lines so it can wrap on narrow cards without shifting the layout */}
      <div className="mt-4 flex min-h-[1.75rem] flex-wrap content-start items-start gap-x-4 gap-y-3 text-xs text-[#009D18]">
        <Meta
          icon={
            <img
              src={icons.DesignationIcon}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          }
        >
          {category}
        </Meta>
        <Meta
          icon={
            <img
              src={icons.TimeIcon}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          }
        >
          {duration}
        </Meta>
        <Meta
          icon={
            <img
              src={icons.PersonsIcon}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          }
        >
          {freelancers}
        </Meta>
        <Meta
          icon={
            <img
              src={icons.DollarIcon}
              alt=""
              className="h-4 w-4 shrink-0 object-contain"
            />
          }
        >
          {budgetType}
        </Meta>
      </div>

      {/* CTA – pinned to the bottom of the card */}
      <a
        href={href}
        className="block w-full rounded-full bg-[#0088FF] py-3 text-center text-sm font-medium text-white transition hover:bg-blue-600"
      >
        View Details
      </a>
    </article>
  );
}
