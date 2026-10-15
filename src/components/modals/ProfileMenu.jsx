import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Avatar } from "antd";
import images from "../../config/Images";
import icons from "../../config/Icons";
import userProfileStore from "../../store/UserProfileStore";
import { logout } from "../../api/auth.api";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-4 w-4 shrink-0",
  "aria-hidden": true,
};

const BookmarkIcon = () => (
  <img src={icons.BookmarkIcon} alt="" className="h-5 w-5 object-contain" />
);

const HistoryIcon = () => (
  <img src={icons.RecentIcon} alt="" className="h-5 w-5 object-contain" />
);

const LogoutIcon = () => (
  <img src={icons.LogoutIcon} alt="" className="h-5 w-5 object-contain" />
);

const itemClass =
  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-medium text-gray-900 transition hover:bg-gray-50 hover:text-blue-500";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const userProfile = userProfileStore((state) => state.user);
  const clearAuth = userProfileStore((state) => state.clearAuth);

  // TODO: replace with the real user from your store
  const profile = {
    name: userProfile.name || "User",
    email: userProfile?.email,
    profile_pic: userProfile?.profile_pic,
  };

  const close = () => setOpen(false);

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (!response?.success) {
        throw new Error(response?.message || "Logout failed.");
      }

      clearAuth();
      close();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const content = (
    <div className="w-56 max-w-[calc(100vw-2rem)] pt-4">
      {/* Profile info */}
      <div className="flex flex-col items-center px-4 pb-3 text-center">
        {profile.profile_pic ? (
          <img
            src={profile.profilePic}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088FF] text-white">
            {profile.email.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="mt-2 max-w-full truncate !text-xs font-semibold">
          {profile.name}
        </p>
        <p className="mt-2 max-w-full truncate !text-xs text-gray-600">
          {profile.email}
        </p>
      </div>

      <div className="border-t border-gray-100" />

      {/* Links */}
      <div className="py-1">
        <Link
          to="/saved-freelancers"
          onClick={close}
          className={`${itemClass} !text-black no-underline hover:!text-black !text-sm`}
        >
          <BookmarkIcon />
          Saved Freelancers
        </Link>
        <Link
          to="/recently-viewed"
          onClick={close}
          className={`${itemClass} !text-black no-underline hover:!text-black !text-sm`}
        >
          <HistoryIcon />
          Recently Viewed Talents
        </Link>
      </div>

      <div className="border-t border-gray-100" />

      {/* Logout */}
      <div className="py-1">
        <button
          type="button"
          onClick={handleLogout}
          className={`${itemClass} hover:text-red-500 cursor-pointer !text-sm`}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      arrow={false}
      open={open}
      onOpenChange={setOpen}
      content={content}
      styles={{ body: { padding: 0, borderRadius: 12, overflow: "hidden" } }}
    >
      <button
        type="button"
        aria-label="Profile menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="shrink-0 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <img
          src={images.userAvatar}
          alt="Profile"
          className="h-8 w-8 rounded-full bg-gray-200 object-cover sm:h-10 sm:w-10"
        />
      </button>
    </Popover>
  );
};

export default ProfileMenu;
