import images from "../config/Images";
import icons from "../config/Icons";

const columns = [
  {
    title: "Categories",
    links: [
      { label: "Design", href: "/categories/design" },
      {
        label: "Writing & Translation",
        href: "/categories/writing-translation",
      },
      { label: "Video Animation", href: "/categories/video-animation" },
      { label: "Auditing", href: "/categories/auditing" },
      { label: "Digital marketing", href: "/categories/digital-marketing" },
      { label: "Graphics Designer", href: "/categories/graphics-designer" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About us", href: "/about" },
      { label: "FAQ'S", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Freelancers", href: "/freelancers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Privacy & Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Help Centre", href: "/help" },
    ],
  },
];

const socials = [
  {
    name: "LinkedIn",
    href: "#",
    icon: icons.LinkedInIcon,
  },
  {
    name: "Instagram",
    href: "#",
    icon: icons.InstagramIcon,
  },
  {
    name: "Facebook",
    href: "#",
    icon: icons.FacebookIcon,
  },
  {
    name: "X",
    href: "#",
    icon: icons.TwitterIcon,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="w-[90%] mx-auto px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-medium text-xl leading-tight text-white">
                {col.title}
              </h3>

              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-base leading-none text-gray-300 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-600" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 pt-5 text-center md:flex-row md:justify-between md:text-left">
          <a href="/" className="shrink-0 md:w-1/3">
            <img
              src={images.whiteLogo}
              alt="Freelancer.in"
              className="h-6 w-auto sm:h-7"
            />
          </a>

          <div className="flex items-center justify-center gap-3 md:w-1/3">
            <span className="text-gray-300">Follow us</span>

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-6 w-6 items-center justify-center rounded-[3px] text-black transition"
                >
                  <img src={s.icon} alt="" className="object-contain" />
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-300 md:w-1/3 md:text-right">
            2024 - 2025 @Skyraan Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
