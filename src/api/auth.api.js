import axiosInstance from "./index";

// Request OTP API
export const requestOtp = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/requestotp", payload);
  return response.data;
};

// Verify OTP API
export const verifyOtp = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/verifyotp", payload);
  return response.data;
};

// Sign Up API
export const signup = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/signup", payload);
  return response.data;
};

// Login API
export const login = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

// ME API
export const me = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/me", payload);
  return response.data;
};

// Logout API
export const logout = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/logout", payload);
  return response.data;
};

// Forgot API
export const forgotpwd = async (payload = {}) => {
  const response = await axiosInstance.post("/auth/forgot-pwd", payload);
  return response.data;
};
