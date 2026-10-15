import { useEffect, useState } from "react";
import { Form } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import images from "../../config/Images";
import { requestOtp, signup, login } from "../../api/auth.api";
import useHomeModeStore from "../../store/HomeModeStore";
import userProfileStore from "../../store/UserProfileStore";
import useLoadingStore from "../../store/LoadingStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{6,}$/;

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
    <path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.4-.9-2.4-3.7ZM14.1 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z" />
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
        <path d="m6 14-1.5 2.5M10 15.5 9.5 18M14 15.5l.5 2.5M18 14l1.5 2.5" />
      </>
    )}
  </svg>
);

const inputClass =
  "h-10 w-full rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const socialBtnClass =
  "flex h-10 w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-900 transition hover:bg-gray-50";

const LoginClient = ({ onSubmit, onBack, onGoogle, onApple, submitLabel }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const user_role = useHomeModeStore((state) => state.homeMode);
  const fetchMe = userProfileStore((state) => state.fetchMe);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const isSignup = location.pathname.replace(/\/+$/, "").endsWith("/signup");

  const roleTitle = user_role === "freelancer" ? "Freelancer" : "Client";
  const title = isSignup
    ? `Sign up as a ${roleTitle}`
    : `Login as a ${roleTitle}`;
  const buttonText = submitLabel ?? (isSignup ? "Sign Up" : "Login");

  const [email, setEmail] = useState(location.state?.email ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Restore email when returning from OTP verification.
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);

      form.setFieldsValue({
        email: location.state.email,
      });
    }
  }, [location.state?.email, form]);

  // Validate email before showing Verify Email.
  const isValidEmail = EMAIL_REGEX.test(email.trim());

  // Check whether the returned email is verified.
  const isEmailVerified =
    isSignup &&
    Number(location.state?.is_verified) === 1 &&
    String(location.state?.email ?? "")
      .trim()
      .toLowerCase() === email.trim().toLowerCase();

  // Validate fields only when signup or login is submitted.
  const validateCredentials = (values) => {
    const enteredEmail = String(values.email ?? "").trim();
    const enteredPassword = String(values.password ?? "");

    let nextEmailError = "";
    let nextPasswordError = "";

    if (!enteredEmail) {
      nextEmailError = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(enteredEmail)) {
      nextEmailError = "Please enter a valid email address.";
    }

    if (!enteredPassword) {
      nextPasswordError = "Please enter your password.";
    } else if (!PASSWORD_REGEX.test(enteredPassword)) {
      nextPasswordError =
        "Password must be minimum 6 characters with atleast one uppercase and one lowercase and one symbol and number";
    }

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);

    return !nextEmailError && !nextPasswordError;
  };

  // Request OTP and navigate to verification.
  const handleVerifyEmail = async () => {
    if (!isSignup || !isValidEmail || isRequestingOtp || isEmailVerified) {
      return;
    }

    setIsRequestingOtp(true);
    setOtpError("");

    const payload = {
      email: email.trim(),
      phn_num: "",
      c_code: "",
      type: 2,
    };

    try {
      setIsLoading(true);

      const response = await requestOtp(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to request OTP.");
      }

      navigate("/verify", {
        state: {
          email: email.trim(),
          purpose: "signup",
          returnto: "/signup",
        },
      });
    } catch (error) {
      console.error("Request OTP failed:", error);

      setOtpError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to send OTP. Please try again.",
      );
    } finally {
      setIsRequestingOtp(false);
      setIsLoading(false);
    }
  };

  // Signup
  const handleSignup = async (values) => {
    setOtpError("");

    if (!validateCredentials(values)) {
      return;
    }

    if (!isEmailVerified) {
      setOtpError("Please verify your email before signing up.");
      return;
    }

    const payload = {
      email: values.email.trim(),
      password: values.password,
      user_role: user_role === "freelancer" ? "FREELANCER" : "CLIENT",
    };

    setIsLoading(true);

    try {
      const response = await signup(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Signup failed.");
      }

      const sessionLoaded = await fetchMe();

      if (!sessionLoaded) {
        throw new Error("Account created, but unable to load user details.");
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Signup failed:", error);

      setOtpError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to sign up. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const handleLogin = async (values) => {
    setOtpError("");

    if (!validateCredentials(values)) {
      return;
    }

    const payload = {
      email: values.email.trim(),
      password: values.password,
      role: user_role === "freelancer" ? "FREELANCER" : "CLIENT",
    };

    setIsLoading(true);

    try {
      const response = await login(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Login failed.");
      }

      const sessionLoaded = await fetchMe();

      if (!sessionLoaded) {
        throw new Error("Login succeeded, but unable to load user details.");
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

      setOtpError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to log in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Clear validation and API errors when the user edits fields.
  const handleValuesChange = (changedValues) => {
    if ("email" in changedValues) {
      setEmail(changedValues.email ?? "");
      setEmailError("");
      setOtpError("");
    }

    if ("password" in changedValues) {
      setPasswordError("");
      setOtpError("");
    }
  };

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center bg-gradient-to-br from-sky-50 via-emerald-50 to-orange-50 px-4 py-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:gap-5 md:p-3">
        {/* Left: form */}
        <div className="flex flex-col justify-center px-1 py-1 md:px-3 md:py-2">
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={onBack ?? (() => navigate("/"))}
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
              {title}
            </h1>
          </div>

          <Form
            form={form}
            noValidate
            initialValues={{
              email: location.state?.email ?? "",
              password: "",
            }}
            onValuesChange={handleValuesChange}
            onFinish={isSignup ? handleSignup : handleLogin}
            className="mt-4 space-y-3"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-base font-medium text-gray-900"
              >
                Email
              </label>

              <Form.Item name="email" noStyle>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  className={inputClass}
                />
              </Form.Item>

              {/* Email/API error: animate height only while showing a message. */}
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                  emailError || otpError
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <p
                  aria-live="polite"
                  className="min-h-0 overflow-hidden text-xs leading-5 text-red-500"
                >
                  {emailError || otpError}
                </p>
              </div>

              {/* Email verification status */}
              <div className="mt-1 min-h-5 text-right">
                {isSignup && isEmailVerified ? (
                  <span className="inline-flex items-center justify-end gap-1 text-sm text-blue">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10.5 8 14.5 16 5.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Email verified
                  </span>
                ) : isSignup && isValidEmail ? (
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isRequestingOtp}
                    className="cursor-pointer text-sm text-blue hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRequestingOtp ? "Sending OTP..." : "Verify email"}
                  </button>
                ) : null}
              </div>
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
                <Form.Item name="password" noStyle>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    placeholder="Enter password"
                    className={`${inputClass} pr-12`}
                  />
                </Form.Item>

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-5 -translate-y-1/2 text-gray-800 transition hover:text-blue-500"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Password error: animate height only while showing a message. */}
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                  passwordError
                    ? "mt-1 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <p
                  aria-live="polite"
                  className="min-h-0 overflow-hidden text-xs leading-5 text-red-500"
                >
                  {passwordError}
                </p>
              </div>

              {/* Forgot password: Login only */}
              <div className="mt-2 h-5 text-right">
                {!isSignup && (
                  <Link
                    to="/forgot-password"
                    state={{ purpose: "forgot-password" }}
                    className="text-sm leading-5 !text-gray-800 underline underline-offset-2 hover:text-blue-500!"
                  >
                    Forgot password
                  </Link>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-10 w-full cursor-pointer rounded-full bg-[#0088FF] text-base font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {buttonText}
            </button>
          </Form>

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
            {isSignup ? (
              <>
                Already have an Account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </>
            ) : (
              <>
                You don’t have an Account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Right: image */}
        <div className="relative hidden overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300 to-blue-500 md:block">
          <img
            src={images.AuthBannerImage}
            alt="Client authentication"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginClient;
