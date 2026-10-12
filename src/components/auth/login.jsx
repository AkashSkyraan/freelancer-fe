import { useState } from "react";
import images from "../../config/Images";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.7 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5Z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5Z"
    />
    <path
      fill="#FBBC05"
      d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1Z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.7 2.2-7.7 2.2-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48Z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.200.8 1.300 0 2.100-1.200 2.900-2.300.9-1.300 1.300-2.600 1.300-2.700 0 0-2.400-.9-2.400-3.700ZM14.100 5.500c.7-.8 1.100-1.900 1-3-1 0-2.100.7-2.800 1.500-.6.700-1.200 1.800-1 2.900 1.100.1 2.100-.6 2.800-1.400Z" />
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M3 10c2 3 5.2 5 9 5s7-2 9-5" />
        <path d="m6 14-1.5 2.5M10 15.5 9.5 18M14 15.5l.5 2.5M18 14l1.500 2.500" />
      </>
    )}
  </svg>
);

const inputClass =
  "h-10 w-full rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const socialBtnClass =
  "flex h-10 w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-900 transition hover:bg-gray-50";

// `onSubmit({ email, password })`, `onBack`, `onGoogle`, `onApple` are optional props.
export default function LoginClient({
  onSubmit,
  onBack,
  onGoogle,
  onApple,
  submitLabel = "Login",
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    // Fills only the space under the header (h-14 on mobile, h-16 from sm up),
    // so the page never grows taller than the screen on desktop.
    <section className="flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center bg-gradient-to-br from-sky-50 via-emerald-50 to-orange-50 px-4 py-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:gap-5 md:p-3">
        {/* Left: form */}
        <div className="flex flex-col justify-center px-1 py-1 md:px-3 md:py-2">
          {/* Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="text-gray-900 transition hover:text-blue-500"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Login as a Client
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-base font-medium text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="skyraan123@gmail.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 transition hover:text-blue-500"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <div className="mt-2 text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-gray-800 underline underline-offset-2 hover:text-blue-500"
                >
                  Forgot password
                </a>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-10 w-full rounded-full bg-[#0088FF] text-base cursor-pointer font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {submitLabel}
            </button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3 text-xs text-gray-800">
            <span className="h-px flex-1 bg-gray-300" />
            or
            <span className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Social */}
          <div className="space-y-2.5">
            <button type="button" onClick={onGoogle} className={socialBtnClass}>
              <GoogleIcon />
              Google
            </button>
            <button type="button" onClick={onApple} className={socialBtnClass}>
              <AppleIcon />
              Apple
            </button>
          </div>

          {/* Footer link */}
          <p className="mt-4 text-center text-sm text-gray-900">
            You don’t have an Account ?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right: image (hidden on mobile).
            The img is absolutely positioned, so it fills the panel but never
            makes the card taller – the form decides the card height. */}
        <div className="relative hidden overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300 to-blue-500 md:block">
          <img
            src={images.AuthBannerImage}
            alt="Client login"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
