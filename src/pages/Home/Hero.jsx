import icons from "../../config/Icons";
import images from "../../config/Images";
import useHomeModeStore from "../../store/HomeModeStore";

const Hero = () => {
  const homeMode = useHomeModeStore((state) => state.homeMode);

  // Decide content based on home mode
  const heroContent =
    homeMode === "freelancer"
      ? {
          title: "Find the Perfect Work Opportunities That Match Your Skills",
          description:
            "Connect with skilled professionals from around the world and bring your projects to life — on time and on budget.",
          searchPlaceholder: "Search by role, skill or key words",
          locationPlaceholder: "Search by Locations",
          popularSearch: "UI UX Designer, Full stock Developer",
          buttonText: "Find project",
          buttonLink: "/projects",
          image: images.Hero,
          imageAlt: "Freelancer working on a laptop",
        }
      : {
          // Change these values for Client Home
          title: "Hire top Freelancers. Get Work Done Faster.",
          description:
            "Connect with skilled professionals from around the world and bring your projects to life — on time and on budget.",
          searchPlaceholder: "Search by project, skill or keywords",
          locationPlaceholder: "Search by Locations",
          popularSearch: "Web Development, UI UX Design",
          buttonText: "Post project",
          buttonLink: "/post-project",
          image: images.Hero1, // Replace with your client hero image
          imageAlt: "Client connecting with freelancers",
        };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-sky-50 via-emerald-50 to-amber-50">
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
          className="mt-4 flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:py-2 sm:pl-5 sm:pr-2"
        >
          <label className="flex flex-1 items-center gap-3">
            <img
              src={icons.SearchIcon}
              alt=""
              className="h-5 w-5 shrink-0 object-contain"
            />
            <input
              type="text"
              placeholder={heroContent.searchPlaceholder}
              className="w-full bg-transparent text-base text-gray-800 placeholder-gray-500 outline-none"
            />
          </label>

          <span className="h-px w-full bg-gray-300 sm:mx-4 sm:h-7 sm:w-px" />

          <label className="flex flex-1 items-center gap-3">
            <img
              src={icons.LocationIcon}
              alt=""
              className="h-5 w-5 shrink-0 object-contain"
            />
            <input
              type="text"
              placeholder={heroContent.locationPlaceholder}
              className="w-full bg-transparent text-base text-gray-800 placeholder-gray-500 outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-1 cursor-pointer rounded-full bg-blue-500 px-6 py-2  font-medium text-white transition hover:bg-blue-600 sm:ml-3 sm:mt-0 text-base"
          >
            Search
          </button>
        </form>

        {/* Popular search */}
        <p className="mt-2 px-2 text-base text-gray-600 sm:px-5">
          <span className="font-semibold text-gray-700">Popular Search :</span>{" "}
          {heroContent.popularSearch}
        </p>

        {/* Content: 60% / 40% */}
        <div className="mt-8 flex flex-col items-center gap-8 md:mt-10 md:flex-row md:gap-6">
          {/* Left */}
          <div className="w-full md:w-[60%]">
            <h1 className="text-3xl font-semibold leading-snug text-gray-900 sm:text-3xl md:max-w-xl">
              {heroContent.title}
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-700">
              {heroContent.description}
            </p>

            <a
              href={heroContent.buttonLink}
              className="mt-6 inline-block w-full rounded-full bg-blue-500 px-14 py-2.5 text-center text-base font-medium text-white transition hover:bg-blue-600 sm:w-auto"
            >
              {heroContent.buttonText}
            </a>
          </div>

          {/* Right (40%) */}
          <div className="flex w-full justify-center md:w-[40%] md:justify-end">
            <img
              src={heroContent.image}
              alt={heroContent.imageAlt}
              className="h-[260px] w-full max-w-sm object-contain md:h-[450px] md:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
