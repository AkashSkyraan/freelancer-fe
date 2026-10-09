import icons from "../../config/Icons";
import images from "../../config/Images";

// Expected shape per item: { id, title, image, projectsCount, icon, href }
const mockCategories = [
  {
    id: 1,
    title: "Design & Creativity",
    image: images.CategoryImage,
    projectsCount: 323,
    icon: "palette",
    href: "/categories/design-creativity",
  },
  {
    id: 2,
    title: "Technology & Development",
    image: images.CategoryImage,
    projectsCount: 100,
    icon: "code",
    href: "/categories/technology-development",
  },
  {
    id: 3,
    title: "Digital Marketing",
    image: images.CategoryImage,
    projectsCount: 342,
    icon: "megaphone",
    href: "/categories/digital-marketing",
  },
  {
    id: 4,
    title: "Design & Creativity",
    image: images.CategoryImage,
    projectsCount: 432,
    icon: "palette",
    href: "/categories/design-creativity-2",
  },
  {
    id: 5,
    title: "AI Services",
    image: images.CategoryImage,
    projectsCount: 500,
    icon: "atom",
    href: "/categories/ai-services",
  },
  //   {
  //     id: 6,
  //     title: "Video & Animation",
  //     image: "https://picsum.photos/seed/video/400/300",
  //     projectsCount: 100,
  //     icon: "palette",
  //     href: "/categories/video-animation",
  //   },
];

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6",
  "aria-hidden": true,
};

const Icons = {
  palette: icons.PaletteIcon,
  code: icons.CodeIcon,
  megaphone: icons.MarketingIcon,
  atom: icons.AiIcon,
};

export default function Categories({ categories = mockCategories }) {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="mx-auto w-[90%] px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Browse by categories
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Browse talent by category and hire experts who match perfectly.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ id, title, image, projectsCount, icon, href }) => (
            <a
              key={id}
              href={href}
              className="group flex flex-col rounded-lg border border-gray-200 bg-white p-1.5 transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-2 pb-3 pt-4 text-gray-800">
                <img
                  src={Icons[icon] ?? Icons.palette}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                <h3 className="mt-3 text-sm font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-xs text-gray-500">
                  {projectsCount} + Projects
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
