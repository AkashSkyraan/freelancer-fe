import { useState } from "react";
import { Drawer } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import images from "../config/Images";
import useHomeModeStore from "../store/HomeModeStore";
import userProfileStore from "../store/UserProfileStore";
import useLoadingStore from "../store/LoadingStore";
import { logout } from "../api/auth.api";
import ProfileMenu from "./modals/ProfileMenu";
import NotificationMenu from "./modals/NotificationMenu";
import icons from "../config/Icons";

const navLinkClass = ({ isActive }) =>
  `text-base font-medium transition hover:text-blue-500 ${
    isActive ? "text-blue-500" : "text-gray-900"
  }`;

const BookmarkIcon = () => (
  <img src={icons.BookmarkIcon} alt="" className="h-5 w-5 object-contain" />
);

const HistoryIcon = () => (
  <img src={icons.RecentIcon} alt="" className="h-5 w-5 object-contain" />
);

const LogoutIcon = () => (
  <img src={icons.LogoutIcon} alt="" className="h-5 w-5 object-contain" />
);

const Header = ({ purpose = "main" }) => {
  const [open, setOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const navigate = useNavigate();

  const setHomeMode = useHomeModeStore((state) => state.setHomeMode);
  const homeMode = useHomeModeStore((state) => state.homeMode);

  const user = userProfileStore((state) => state.user);
  const isAuthenticated = userProfileStore((state) => state.isAuthenticated);
  const clearAuth = userProfileStore((state) => state.clearAuth);

  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  // Keep the existing logged-in header links.
  const userLinks = [
    { label: "Home", to: "/" },
    homeMode === "freelancer"
      ? { label: "Projects", to: "/projects" }
      : { label: "Hire Freelancers", to: "/freelancers" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  const showLoggedIn = isAuthenticated;
  const showGuest = !isAuthenticated;

  // Use the authenticated user's role for drawer-specific links.
  const userRole = String(
    user?.user_role ?? user?.role ?? homeMode,
  ).toLowerCase();

  const isFreelancer = userRole === "freelancer";

  const drawerLinks = isFreelancer
    ? [
        { label: "Saved Projects", to: "/saved-projects" },
        {
          label: "Recently Viewed Projects",
          to: "/recently-viewed-projects",
        },
      ]
    : [
        { label: "Saved Freelancers", to: "/saved-freelancers" },
        { label: "Recently Viewed Talents", to: "/recently-viewed" },
      ];

  const displayName = user?.name || user?.full_name || user?.username || "User";

  const displayEmail = user?.email || "";

  const profileImage =
    user?.profile_image ||
    user?.profileImage ||
    user?.profile_pic ||
    user?.avatar ||
    "";

  const handleLogout = async () => {
    setLogoutError("");
    setIsLoading(true);

    try {
      const response = await logout();

      if (!response?.success) {
        throw new Error(response?.message || "Logout failed.");
      }

      clearAuth();
      setOpen(false);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);

      setLogoutError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to log out. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="relative w-full bg-white shadow-sm">
      <div className="mx-auto flex h-14 w-[95%] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-blue-500">
          <img src={images.logo} alt="Company logo" className="w-55 h-55" />
        </a>

        {/* ---------- Logged-in header ---------- */}
        {purpose !== "auth" && showLoggedIn && (
          <>
            {/* Center nav (desktop / tablet) */}
            <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
              {userLinks.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={to === "/"}
                  className={navLinkClass}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right: notifications, profile, mobile drawer button */}
            <div className="flex items-center gap-3 sm:gap-5">
              <NotificationMenu />

              <div className="hidden lg:block">
                <ProfileMenu />
              </div>

              <button
                type="button"
                onClick={() => {
                  setLogoutError("");
                  setOpen(true);
                }}
                aria-expanded={open}
                aria-label="Open menu"
                className="rounded-md p-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:hidden"
              >
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
              </button>
            </div>
          </>
        )}

        {/* ---------- Guest header ---------- */}
        {/* Desktop / tablet actions */}
        {purpose !== "auth" && showGuest && (
          <div className="hidden items-center sm:flex">
            <a
              href="/login"
              className="rounded-full bg-blue-500 px-8 py-2 text-base font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </a>

            <span className="mx-5 h-8 w-px bg-gray-300" aria-hidden="true" />

            {homeMode === "freelancer" ? (
              <a
                onClick={() => setHomeMode("client")}
                className="cursor-pointer text-base font-medium text-gray-800 transition hover:text-blue-500"
              >
                For Client / Post a Projects
              </a>
            ) : (
              <a
                onClick={() => setHomeMode("freelancer")}
                className="cursor-pointer text-base font-medium text-gray-800 transition hover:text-blue-500"
              >
                For Freelancer / Find Projects
              </a>
            )}
          </div>
        )}

        {/* Mobile guest actions */}
        {purpose !== "auth" && showGuest && (
          <div className="flex items-center gap-3 sm:hidden">
            <a
              href="/login"
              className="rounded-full bg-blue-500 px-5 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              Login
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
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
        )}
      </div>

      {/* Mobile dropdown – guest (existing UI) */}
      {purpose !== "auth" && showGuest && open && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          {homeMode === "freelancer" ? (
            <a
              onClick={() => {
                setHomeMode("client");
                setOpen(false);
              }}
              className="block cursor-pointer rounded-md px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-500"
            >
              For Client / Post a Projects
            </a>
          ) : (
            <a
              onClick={() => {
                setHomeMode("freelancer");
                setOpen(false);
              }}
              className="block cursor-pointer rounded-md px-2 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-500"
            >
              For Freelancer / Find Projects
            </a>
          )}
        </nav>
      )}

      {/* Mobile drawer – logged-in user */}
      {purpose !== "auth" && showLoggedIn && (
        <Drawer
          title={null}
          placement="right"
          width={320}
          open={open}
          onClose={() => setOpen(false)}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <div className="flex min-h-full flex-col px-5 py-6">
            {/* Profile details */}
            <div className="flex flex-col items-center border-b border-gray-100 pb-6 text-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088FF] text-white">
                  {displayEmail.charAt(0).toUpperCase()}
                </div>
              )}

              <h2 className="mt-3 text-base font-semibold">{displayName}</h2>

              <p className="mt-1 max-w-full break-all text-sm text-gray-500">
                {displayEmail}
              </p>
            </div>

            <nav className="flex flex-col gap-1 border-b border-gray-100 py-4">
              {userLinks.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-blue-50 hover:text-blue-500 !text-black ${
                      isActive ? "text-blue-500" : "text-gray-800"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Role-specific links */}
            <nav className="flex flex-col gap-1 py-5">
              {drawerLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-blue-50 hover:text-blue-500 !text-black"
                >
                  {label === "Saved Freelancers" ||
                  label === "Saved Projects" ? (
                    <BookmarkIcon />
                  ) : (
                    <HistoryIcon />
                  )}

                  {label}
                </Link>
              ))}
            </nav>

            {/* Logout error with smooth expand/collapse */}
            <div
              aria-live="polite"
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                logoutError
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="min-h-0 overflow-hidden text-sm text-red-500">
                {logoutError}
              </p>
            </div>

            {/* Logout */}
            <div className="mt-auto border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text transition hover:bg-red-50 hover:text-[#EA4335]"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        </Drawer>
      )}

      {/* Soft gradient strip under the main header */}
      {purpose !== "auth" && !isAuthenticated && (
        <div className="pointer-events-none absolute inset-x-0 top-full h-3 bg-gradient-to-b from-blue-50/70 via-yellow-50/40 to-transparent" />
      )}
    </header>
  );
};

export default Header;
