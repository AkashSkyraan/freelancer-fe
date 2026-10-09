import { useState } from "react";
import images from "../config/Images";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full bg-white shadow-sm">
      <div className="mx-auto flex h-14 w-[95%] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-blue-500">
          <img src={images.logo} alt="Company logo" className="w-50 h-50" />
        </a>

        {/* Desktop / tablet actions */}
        <div className="hidden items-center sm:flex">
          <a
            href="/login"
            className="rounded-full bg-blue-500 px-8 py-2 text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </a>
          <span className="mx-5 h-8 w-px bg-gray-200" aria-hidden="true" />
          <a
            href="/post-project"
            className="text-sm font-medium text-gray-800 transition hover:text-blue-500"
          >
            For Client/ Post a Projects
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 sm:hidden">
          <a
            href="/login"
            className="rounded-full bg-blue-500 px-5 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            Login
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-md p-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {open ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          <a
            href="/post-project"
            className="block rounded-md px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-500"
          >
            For Client/ Post a Projects
          </a>
        </nav>
      )}

      {/* Soft gradient strip under the header */}
      <div className="pointer-events-none absolute inset-x-0 top-full h-3 bg-gradient-to-b from-blue-50/70 via-yellow-50/40 to-transparent" />
    </header>
  );
}
