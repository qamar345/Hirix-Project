import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.hirix.com.pk";

// Central Axios instance - saare API calls yahan se jayenge
const API = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to automatically attach the token
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global response interceptor to handle token expiration (401/403)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = sessionStorage.getItem("token");
    // Only force logout if user WAS logged in and token expired/invalid
    // Do NOT redirect guest/public users who get 401 on optional auth endpoints
    if (token && error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Session expired or unauthorized. Logging out...");
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Export base URL separately for image src construction
export const BASE_URL = API_BASE_URL;

export default API;
