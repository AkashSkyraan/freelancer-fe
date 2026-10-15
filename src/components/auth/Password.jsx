import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../config/Images";
import { forgotpwd, logout } from "../../api/auth.api";
import userProfileStore from "../../store/UserProfileStore";

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
        <path d="m6 14-1.5 2.5M10 15.5 9.5 18M14 15.5l.5 2.5M18 14l1.5 2.5" />
      </>
    )}
  </svg>
);

// Label + password input with show/hide toggle
const PasswordField = ({ id, label, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-base font-medium text-gray-900"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password"
          required
          className="h-10 w-full rounded-full border border-gray-300 bg-white px-5 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 transition hover:text-blue"
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
};

const PasswordStep = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const clearAuth = userProfileStore((state) => state.clearAuth);

  // Keep the existing step-based UI.
  const step = Number(state?.step) === 2 ? 2 : 1;
  const email = state?.email ?? "";
  const purpose = state?.purpose;

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Preserve the existing profile password verification flow.
    if (step === 1) {
      // Keep your existing check-password API logic here.
      return;
    }

    // Step 2: Forgot-password flow.
    if (!email) {
      setError("Email is missing. Please restart the password reset process.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError(
        "Password must be minimum 6 characters with atleast one uppercase and one lowercase and one symbol and number",
      );
      return;
    }

    // Check password match BEFORE calling the API.
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const payload = {
      password: newPassword,
    };

    try {
      const response = await forgotpwd(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to change password.");
      }

      // Clear the current browser's authentication cookie.
      try {
        await logout();
      } catch (logoutError) {
        console.error("Logout request failed:", logoutError);
      }

      // Clear the frontend authentication state.
      clearAuth();

      // Redirect to login.
      navigate("/login", {
        replace: true,
        state: {
          message: "Password changed successfully. Please log in.",
        },
      });
    } catch (error) {
      console.error("Change password failed:", error);

      setError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to change password. Please try again.",
      );
    }
  };

  // Clear the current error when the user edits a password.
  const handlePasswordChange = (setter) => (value) => {
    setter(value);
    setError("");
  };

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center bg-gradient-to-br from-sky-50 via-emerald-50 to-orange-50 px-4 py-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:gap-5 md:p-3">
        {/* Left: changes with step */}
        <form
          onSubmit={handleSubmit}
          className="flex min-h-[24rem] flex-col px-1 py-1 md:px-3 md:py-2"
        >
          {/* Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="text-gray-900 transition hover:text-blue cursor-pointer"
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

            <h1 className="text-lg font-semibold text-gray-900 sm:text-2xl">
              {step === 1 ? "Enter Password" : "Enter New Password"}
            </h1>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {step === 1
              ? "Verify your password to change Mobile Number"
              : "Enter your new password"}
          </p>

          {/* Fields */}
          <div className="mt-6 space-y-4">
            {step === 1 ? (
              <>
                <PasswordField
                  id="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange(setPassword)}
                />

                <div className="text-right">
                  <a
                    href="/forgot-password"
                    className="text-sm text-gray-800 underline underline-offset-2 hover:text-blue"
                  >
                    Forgot password
                  </a>
                </div>
              </>
            ) : (
              <>
                <PasswordField
                  id="newPassword"
                  label="New Password"
                  value={newPassword}
                  onChange={handlePasswordChange(setNewPassword)}
                />

                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={handlePasswordChange(setConfirmPassword)}
                />

                {/* Error with smooth expand/collapse */}
                <div
                  aria-live="polite"
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    error
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="min-h-0 overflow-hidden text-xs leading-5 text-red-500">
                    {error}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Button – pushed to the bottom */}
          <div className="mt-16 flex justify-center pt-8">
            <button
              type="submit"
              className="h-10 w-full max-w-[16rem] rounded-full bg-blue text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
            >
              {step === 1 ? "Continue" : "Change"}
            </button>
          </div>
        </form>

        {/* Right: same image for both steps (hidden on mobile) */}
        <div className="relative min-h-112 hidden overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300 to-blue md:block">
          <img
            src={images.AuthBannerImage}
            alt="Password verification"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default PasswordStep;
