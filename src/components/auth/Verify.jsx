import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../config/Images";
import { requestOtp, verifyOtp } from "../../api/auth.api";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 150;

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// Mock API — replace with your actual Verify OTP API later.
const mockVerifyOtp = async (payload) => {
  console.log("Mock Verify OTP payload:", payload);

  return {
    success: true,
    message: "OTP verified successfully",
  };
};

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data received through route state
  const {
    email = "",
    purpose,
    returnto = "/signup",
    type = "email",
    phn_num = "",
    c_code = "",
  } = location.state || {};

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const inputs = useRef([]);

  // Countdown
  useEffect(() => {
    if (seconds <= 0) return;

    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);

    return () => clearTimeout(id);
  }, [seconds]);

  // Handle individual OTP digits
  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];

    next[index] = digit;

    setOtp(next);
    setVerifyError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Handle pasted OTP
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    setOtp(Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] ?? ""));

    setVerifyError("");

    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  // Resend OTP — connect your Resend OTP API later
  const handleResend = async () => {
    if (seconds > 0) return;

    setVerifyError("");

    const payload = {
      email: email.trim(),
      phn_num: "",
      c_code: "",
      type: purpose === "signup" ? 2 : 0,
    };

    try {
      const response = await requestOtp(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to resend OTP.");
      }

      setOtp(Array(OTP_LENGTH).fill(""));
      setSeconds(RESEND_SECONDS);
      inputs.current[0]?.focus();
    } catch (error) {
      setVerifyError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to resend OTP. Please try again.",
      );
    }
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !purpose || !otp.every(Boolean) || isVerifying) {
      return;
    }

    const code = otp.join("");

    const payload = {
      email: email.trim(),
      otp: code,
      type: 0,
      phn_num,
      c_code,
    };

    setIsVerifying(true);
    setVerifyError("");

    try {
      const response = await verifyOtp(payload);

      if (!response?.success) {
        throw new Error(response?.message || "OTP verification failed");
      }

      const nextRoute =
        purpose === "forgot-password" ? "/change-password" : "/signup";
      const step = purpose === "forgot-password" ? 2 : 1;

      navigate(nextRoute, {
        replace: true,
        state: {
          email,
          step,
          purpose,
          is_verified: 1,
        },
      });
    } catch (error) {
      console.error("OTP verification failed:", error);

      setVerifyError(
        error?.message || "Unable to verify OTP. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBack = () => {
    navigate(returnto, {
      replace: true,
      state: {
        email,
        purpose,
        is_verified: 0,
      },
    });
  };

  const isComplete = otp.every(Boolean);

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center bg-gradient-to-br from-sky-50 via-emerald-50 to-orange-50 px-4 py-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:gap-5 md:p-3">
        {/* Left: form */}
        <form
          onSubmit={handleSubmit}
          className="flex min-h-[26rem] flex-col px-1 py-1 md:px-3 md:py-2"
        >
          {/* Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="text-gray-900 transition hover:text-blue"
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
              Verify Your Email
            </h1>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
            We’ve sent a one-time password (OTP) to your registered email
            address.
          </p>

          {/* Email + edit */}
          <p className="mt-3 flex flex-wrap items-center gap-x-3 text-sm text-gray-900">
            <span className="break-all">{email}</span>

            <button
              type="button"
              onClick={handleBack}
              className="cursor-pointer text-blue hover:underline"
            >
              Edit
            </button>
          </p>

          {/* OTP */}
          <label className="mt-8 block text-base font-medium text-gray-900">
            Enter OTP
          </label>

          <div className="mt-6 flex gap-2 sm:gap-3" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                aria-label={`OTP digit ${i + 1}`}
                className="h-10 min-w-0 flex-1 border-0 border-b-2 border-gray-400 bg-transparent text-center text-lg text-gray-900 outline-none transition focus:border-blue"
              />
            ))}
          </div>

          {/* Verification error with smooth expand/collapse */}
          <div
            aria-live="polite"
            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
              verifyError
                ? "mt-3 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="min-h-0 overflow-hidden text-sm text-red-500">
              {verifyError}
            </p>
          </div>

          {/* Resend */}
          <p className="mt-8 text-sm text-gray-900">
            {seconds > 0 ? (
              <>
                Resend Code in{" "}
                <span className="text-blue">{formatTime(seconds)}</span>
              </>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue hover:underline"
              >
                Resend Code
              </button>
            )}
          </p>

          {/* Verify */}
          <div className="mt-16 flex justify-center pt-8">
            <button
              type="submit"
              disabled={!isComplete || isVerifying}
              className="h-10 w-full max-w-[13rem] cursor-pointer rounded-full bg-blue text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-blue"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {/* Right: image */}
        <div className="relative hidden overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300 to-blue md:block">
          <img
            src={images.AuthVerifyBannerImage}
            alt="Email verification"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
