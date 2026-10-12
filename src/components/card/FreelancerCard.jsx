// Single freelancer card – receives ONE freelancer object from the API.
//
// Usage:
//   {freelancers.map((freelancer) => (
//     <FreelancerCard key={freelancer.id} freelancer={freelancer} />
//   ))}
//
// Expected object shape (rename the destructured keys below if your API differs):
// {
//   id, name, avatar, coverImage, category, location, isAvailable,
//   totalJobs, completedPercent, rating, skills: [], href
// }

import icons from "../../config/Icons";

const MAX_VISIBLE_SKILLS = 6;

const svgBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const BookmarkIcon = () => (
  <img src={icons.BookmarkIcon} alt="Bookmark" className="h-4 w-4" />
);

const CategoryIcon = () => (
  <img src={icons.DesignationIcon} alt="Bookmark" className="h-4 w-4" />
);

const PinIcon = () => (
  <img src={icons.LocationIcon} alt="Bookmark" className="h-4 w-4" />
);

const StarIcon = () => (
  <img src={icons.StarIcon} alt="star" className="h-4 w-4" />
);

function Stat({ label, children }) {
  return (
    <div className="flex flex-col items-center px-1 py-1.5 text-center">
      <span className="text-xs font-medium text-gray-900">{label}</span>
      <span className="mt-1 flex items-center gap-1 text-sm text-gray-700">
        {children}
      </span>
    </div>
  );
}

const FreelancerCard = ({ freelancer }) => {
  const {
    name = "",
    avatar,
    coverImage,
    category = "",
    location = "",
    isAvailable = false,
    totalJobs = 0,
    completedPercent = 0,
    rating = 0,
    skills = [],
    href = "#",
  } = freelancer ?? {};

  const visibleSkills = skills.slice(0, MAX_VISIBLE_SKILLS);
  const extraSkills = Math.max(skills.length - MAX_VISIBLE_SKILLS, 0);

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      {/* Cover */}
      <div className="relative h-20 w-full bg-gradient-to-br from-sky-400 to-blue-600 sm:h-24">
        {coverImage && (
          <img
            src={coverImage}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <button
          type="button"
          aria-label="Save freelancer"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900 shadow transition hover:text-blue-500 cursor-pointer"
        >
          <BookmarkIcon />
        </button>
      </div>

      {/* Avatar + basic info.
          items-end puts the avatar and the text on the same bottom baseline;
          the small negative margin lets the avatar only slightly overlay the cover. */}
      <div className="flex items-end gap-3 px-4 sm:px-5">
        <img
          src={avatar}
          alt={name}
          className="relative -mt-5 h-[4.5rem] w-[4.5rem] shrink-0 rounded-full border-4 border-white bg-gray-200 object-cover shadow-sm sm:-mt-6 sm:h-22 sm:w-22"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate pt-1 text-base font-semibold capitalize text-gray-900">
            {name}
          </h3>
          <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-blue-500">
            <CategoryIcon />
            <span className="truncate">{category}</span>
          </p>
          <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-gray-500">
            <span className="flex min-w-0 items-center gap-1">
              <PinIcon />
              <span className="truncate">{location}</span>
            </span>
            {isAvailable && (
              <span className="flex shrink-0 items-center gap-1 font-medium text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Available Now
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-3 grid grid-cols-3 divide-x divide-gray-200 rounded-lg border border-gray-100 bg-white shadow-md sm:mx-5">
        <Stat label="Total Jobs">{totalJobs}</Stat>
        <Stat label="Completed">{completedPercent}%</Stat>
        <Stat label="Rating">
          {rating}/5 <StarIcon />
        </Stat>
      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap content-start items-center gap-1.5 px-4 sm:px-5">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="flex h-7 min-w-0 flex-grow items-center justify-center truncate rounded-full bg-[#E4F3FF] px-4 text-xs font-medium text-blue-500"
          >
            {skill}
          </span>
        ))}
        {extraSkills > 0 && (
          <span className="px-1 text-xs font-medium text-blue-500">
            +{extraSkills}
          </span>
        )}
      </div>

      {/* CTA – pinned to the bottom */}
      <div className="mt-auto px-4 pb-3 pt-3 sm:px-5 sm:pb-4">
        <a
          href={href}
          className="block w-full rounded-full bg-blue-500 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-600"
        >
          View Profile
        </a>
      </div>
    </article>
  );
};

export default FreelancerCard;
