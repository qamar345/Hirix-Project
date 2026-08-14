import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.hirix.com.pk";
const getToken = () => sessionStorage.getItem("token");

// Shared RTK Query baseQuery: attaches the auth token to every request and
// forces a logout + redirect on 401/403, so an expired/invalid session
// behaves the same way across the admin, employer, and candidate API
// slices instead of failing silently on some of them.
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("x-access-token", token);
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    console.warn("Session expired or unauthorized. Logging out...");
    sessionStorage.clear();
    window.location.href = "/";
  }

  return result;
};
