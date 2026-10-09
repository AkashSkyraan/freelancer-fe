import icons from "../../config/Icons";
import images from "../../config/Images";

function SearchIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-sky-50 via-emerald-50 to-amber-50">
      {/* soft color blobs */}
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-2/3 bg-gradient-to-l from-orange-100/70 via-yellow-50/60 to-transparent" />
      <div className="pointer-events-none absolute -left-10 top-0 h-full w-1/3 bg-gradient-to-r from-blue-100/60 to-transparent" />

      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url(${images.GridBackground})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      />

      <div className="relative mx-auto w-[95%] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        {/* Search bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:py-2 sm:pl-5 sm:pr-2 mt-4"
        >
          <label className="flex flex-1 items-center gap-3">
            <img
              src={icons.SearchIcon}
              alt=""
              className="h-4.5 w-4.5 shrink-0 object-contain"
            />
            <input
              type="text"
              placeholder="Search by role, skill or key words"
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 outline-none"
            />
          </label>

          <span className="h-px w-full bg-gray-300 sm:mx-4 sm:h-7 sm:w-px" />

          <label className="flex flex-1 items-center gap-3">
            <img
              src={icons.LocationIcon}
              alt=""
              className="h-4.5 w-4.5 shrink-0 object-contain"
            />{" "}
            <input
              type="text"
              placeholder="Search by Locations"
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-1 rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-600 sm:mt-0 sm:ml-3 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Popular search */}
        <p className="mt-2 px-2 text-sm text-gray-600 sm:px-5">
          <span className="font-semibold text-gray-700">Popular Search :</span>{" "}
          UI UX Designer, Full stock Developer
        </p>

        {/* Content: 60% / 40% */}
        <div className="mt-8 flex flex-col items-center gap-8 md:mt-10 md:flex-row md:gap-6">
          {/* Left */}
          <div className="w-full md:w-[60%]">
            <h1 className="text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl md:max-w-xl">
              Find the Perfect Work Opportunities That Match Your Skills
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-700">
              Connect with skilled professionals from around the world and bring
              your projects to life — on time and on budget.
            </p>
            <a
              href="/projects"
              className="mt-6 inline-block w-full rounded-full bg-blue-500 px-14 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-600 sm:w-auto"
            >
              Find project
            </a>
          </div>

          {/* Right (40%) */}
          <div className="flex w-full justify-center md:w-[40%] md:justify-end">
            <img
              src={images.Hero}
              alt="Freelancer working on a laptop"
              className="h-auto w-full max-w-sm object-contain md:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
