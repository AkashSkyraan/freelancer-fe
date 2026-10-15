import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import icons from "../../config/Icons";

// Mock data – pass your API response with <NotificationMenu notifications={data} />
// Shape: { id, name, avatar, role, message, date }
const mockNotifications = [
  {
    id: 1,
    name: "Aliey Joseph",
    avatar: "https://picsum.photos/seed/n1/80/80",
    role: "UI/UX Designer",
    message: "Accepted your project invite",
    date: "Oct 27",
  },
  {
    id: 2,
    name: "Jesey Robert",
    avatar: "https://picsum.photos/seed/n2/80/80",
    role: "UI Developer",
    message: "Accepted your project invite",
    date: "Jun 26, 2024",
  },
  {
    id: 3,
    name: "Robert Heak",
    avatar: "https://picsum.photos/seed/n3/80/80",
    role: "UI/UX Designer",
    message: "Reject the invite to your project",
    date: "Jun 26, 2024",
  },
  {
    id: 4,
    name: "Jesey Robert",
    avatar: "https://picsum.photos/seed/n4/80/80",
    role: "UI Developer",
    message: "Messaged you",
    date: "Jun 26, 2024",
  },
  {
    id: 5,
    name: "Jesey Robert",
    avatar: "https://picsum.photos/seed/n5/80/80",
    role: "UI Developer",
    message: "Reject the invite to your project",
    date: "Jun 26, 2024",
  },
];

const NotificationMenu = ({ notifications = mockNotifications }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);

  const handleClearAll = () => {
    // TODO: call clear-all API
    setItems([]);
  };

  const handleMarkRead = (id) => {
    // TODO: call mark-as-read API
    console.log("mark read", id);
  };

  const content = (
    <div className="w-80 max-w-[calc(100vw-2rem)] px-3 pb-3 pt-3 sm:w-[25rem]">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-gray-900">
          Recent Notifications
        </h3>
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="cursor-pointer text-xs text-red-500 underline underline-offset-2 hover:text-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {/* List */}
      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No notifications
        </p>
      ) : (
        <ul className="mt-3 max-h-[20rem] space-y-1 overflow-y-auto">
          {items.map(({ id, name, avatar, role, message, date }) => (
            <li
              key={id}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-[#DEF0FF]"
            >
              <img
                src={avatar}
                alt={name}
                className="h-10 w-10 shrink-0 rounded-full bg-gray-200 object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {name}{" "}
                  <span className="font-medium text-blue-500">{role}</span>
                </p>
                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {message}
                </p>
              </div>

              {/* date by default, mail icon on hover */}
              <div className="flex h-5 w-18 shrink-0 items-center justify-end">
                <span className="text-xs text-gray-600 group-hover:hidden">
                  {date}
                </span>
                <button
                  type="button"
                  aria-label="Mark as read"
                  onClick={() => handleMarkRead(id)}
                  className="hidden cursor-pointer group-hover:block"
                >
                  <img src={icons.MessageIcon} alt="" className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      {items.length > 0 && (
        <div className="mt-3 text-center">
          <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="text-sm text-blue-500 underline underline-offset-2 hover:text-blue-600"
          >
            View All
          </Link>
        </div>
      )}
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
        aria-label="Notifications"
        aria-expanded={open}
        className="relative cursor-pointer rounded-full p-1.5 text-gray-800 transition hover:bg-gray-100 hover:text-blue-500"
      >
        <img src={icons.NotificationIcon} alt="" className="h-5 w-5" />
        {/* shows only when there are notifications */}
        {items.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FC5151] ring-2 ring-white" />
        )}
      </button>
    </Popover>
  );
};

export default NotificationMenu;
