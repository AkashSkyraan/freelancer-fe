import { useState } from "react";
import { Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../config/Images";
import { onlyDigits } from "../../utils/helper";
import { requestOtp } from "../../api/auth.api";

const MOBILE_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EnterContact = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { type = "email", purpose, email = "", phn_num = "" } = state ?? {};

  const [form] = Form.useForm();
  const [error, setError] = useState("");

  const isMobile = type === "mobile";
  const isForgotPassword = purpose === "forgot-password";

  const initialValue = isMobile ? phn_num : email;

  const handleSubmit = async (values) => {
    setError("");

    const contact = String(values.contact ?? "").trim();

    const payload = {
      email: isMobile ? "" : contact,
      phn_num: isMobile ? contact : "",
      c_code: "",
      type: 1,
    };

    try {
      const response = await requestOtp(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to send OTP.");
      }

      navigate("/verify", {
        state: {
          email: contact,
          purpose: "forgot-password",
          returnto: "/forgot-password",
          type: "email",
        },
      });
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Unable to send OTP. Please try again.",
      );
    }
  };

  const handleSubmitFailed = ({ errorFields }) => {
    setError(
      errorFields?.[0]?.errors?.[0] || "Please enter valid contact details.",
    );
  };

  const handleValuesChange = () => {
    setError("");
  };

  const contactRules = isMobile
    ? [
        {
          required: true,
          message: "Please enter your mobile number.",
        },
        {
          pattern: new RegExp(`^[0-9]{${MOBILE_LENGTH}}$`),
          message: `Please enter a valid ${MOBILE_LENGTH}-digit mobile number.`,
        },
      ]
    : [
        {
          required: true,
          message: "Please enter your email address.",
        },
        {
          validator: (_, value) => {
            if (!value || EMAIL_REGEX.test(String(value).trim())) {
              return Promise.resolve();
            }

            return Promise.reject(
              new Error("Please enter a valid email address."),
            );
          },
        },
      ];

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] w-full items-center justify-center bg-gradient-to-br from-sky-50 via-emerald-50 to-orange-50 px-4 py-4 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:gap-5 md:p-4">
        {/* Left: form */}
        <Form
          form={form}
          noValidate
          initialValues={{
            contact: initialValue,
          }}
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
          onValuesChange={handleValuesChange}
          className="flex min-h-[22rem] flex-col px-1 py-1 md:px-3 md:py-2"
        >
          {/* Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
              {isMobile
                ? "Enter your mobile number"
                : isForgotPassword
                  ? "Reset your password"
                  : "Enter your email address"}
            </h1>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {isMobile
              ? isForgotPassword
                ? "Enter your mobile number to reset your password."
                : "Verify your mobile number to continue."
              : isForgotPassword
                ? "Enter the email address associated with your account. We'll send you an OTP to reset your password."
                : "Enter your email address to continue with verification."}
          </p>

          {/* Field */}
          <div className="mt-6">
            <label
              htmlFor="contact"
              className="mb-1 block text-base font-medium text-gray-900"
            >
              {isMobile ? "Mobile Number" : "Email"}
            </label>

            <Form.Item
              name="contact"
              noStyle
              normalize={(nextValue) =>
                isMobile
                  ? onlyDigits(nextValue ?? "", MOBILE_LENGTH)
                  : nextValue
              }
              rules={contactRules}
              validateTrigger={[]}
            >
              <input
                id="contact"
                type={isMobile ? "tel" : "email"}
                inputMode={isMobile ? "numeric" : "email"}
                autoComplete={isMobile ? "tel" : "email"}
                maxLength={isMobile ? MOBILE_LENGTH : undefined}
                placeholder={
                  isMobile ? "Enter your mobile number" : "Enter your email"
                }
                className="h-10 w-full rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </Form.Item>

            {/* Error: smoothly expands and collapses */}
            <div
              aria-live="polite"
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                error
                  ? "mt-1 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="min-h-0 overflow-hidden text-sm leading-5 text-red-500">
                {error}
              </p>
            </div>
          </div>

          {/* Button – pushed to the bottom */}
          <div className="mt-auto flex justify-center pt-8">
            <button
              type="submit"
              className="h-10 w-full max-w-[14rem] cursor-pointer rounded-full bg-blue-500 text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Verify
            </button>
          </div>
        </Form>

        {/* Right: image (hidden on mobile) */}
        <div className="relative hidden min-h-112 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-300 to-blue-500 md:block">
          <img
            src={images.AuthVerifyBannerImage}
            alt="Verification"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default EnterContact;
