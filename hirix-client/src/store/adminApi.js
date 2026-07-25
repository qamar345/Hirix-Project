import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.hirix.com.pk";

// Helper to get token from sessionStorage
const getToken = () => sessionStorage.getItem("token");

// ─── Admin API Slice ─────────────────────────────────────────────────────────
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("x-access-token", token);
      return headers;
    },
  }),
  tagTypes: ["AdminDashboard", "Employees", "Candidates", "Companies", "Jobs", "Managers", "AdminProfile"],
  endpoints: (builder) => ({
    // Dashboard
    getDashboardData: builder.query({
      query: () => "/DashboardData",
      providesTags: ["AdminDashboard"],
    }),
    // Graph
    getAdminGraph: builder.query({
      query: (days) => `/graph/${days}`,
    }),
    getCandidateGraph: builder.query({
      query: (days) => `/Candidategraph/${days}`,
    }),
    // Admin Profile
    getAdmin: builder.query({
      query: (id) => `/GetAdmin/${id}`,
      providesTags: ["AdminProfile"],
    }),
    updateAdminProfile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin-profile/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["AdminProfile"],
    }),
    changeAdminPassword: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/change-password/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    // Employees
    getEmployees: builder.query({
      query: () => "/get-data",
      providesTags: ["Employees"],
    }),
    activateEmployee: builder.mutation({
      query: (id) => ({ url: `/active-employee/${id}`, method: "PUT" }),
      invalidatesTags: ["Employees"],
    }),
    freezeEmployee: builder.mutation({
      query: (id) => ({ url: `/freeze-employee/${id}`, method: "POST" }),
      invalidatesTags: ["Employees"],
    }),
    // Candidates (users)
    getCandidates: builder.query({
      query: () => "/getusers",
      providesTags: ["Candidates"],
    }),
    activateUser: builder.mutation({
      query: (id) => ({ url: `/active-employee/${id}`, method: "PUT" }),
      invalidatesTags: ["Candidates"],
    }),
    freezeUser: builder.mutation({
      query: (id) => ({ url: `/freezeusers/${id}`, method: "PUT" }),
      invalidatesTags: ["Candidates"],
    }),
    // Companies
    getCompanies: builder.query({
      query: () => "/getcompanies",
      providesTags: ["Companies"],
    }),
    approveCompany: builder.mutation({
      query: (id) => ({ url: `/approvedCompany/${id}`, method: "PUT" }),
      invalidatesTags: ["Companies"],
    }),
    rejectCompany: builder.mutation({
      query: (id) => ({ url: `/rejectCompany/${id}`, method: "PUT" }),
      invalidatesTags: ["Companies"],
    }),
    getCompanyById: builder.query({
      query: (id) => `/getSpecificCompany/${id}`,
    }),
    // Jobs (admin view)
    getAdminJobs: builder.query({
      query: () => "/get-postsBYAdmin",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => `/get-post-by-id/${id}`,
    }),
    getSpecificPost: builder.query({
      query: (id) => `/getPostSpecific/${id}`,
    }),
    deleteJob: builder.mutation({
      query: (id) => ({ url: `/deleteJob/${id}`, method: "DELETE" }),
      invalidatesTags: ["Jobs"],
    }),
    // Managers
    getManagers: builder.query({
      query: () => "/getManagers",
      providesTags: ["Managers"],
    }),
    addManager: builder.mutation({
      query: (payload) => ({ url: "/addManager", method: "POST", body: payload }),
      invalidatesTags: ["Managers"],
    }),
    activateManager: builder.mutation({
      query: (id) => ({ url: `/activeManager/${id}`, method: "PUT" }),
      invalidatesTags: ["Managers"],
    }),
    freezeManager: builder.mutation({
      query: (id) => ({ url: `/freezeManager/${id}`, method: "PUT" }),
      invalidatesTags: ["Managers"],
    }),
    // Applicant Full Profile
    getFullApplicantProfile: builder.query({
      query: (id) => `/GetAllProfileData/${id}`,
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetAdminGraphQuery,
  useGetCandidateGraphQuery,
  useGetAdminQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,
  useGetEmployeesQuery,
  useActivateEmployeeMutation,
  useFreezeEmployeeMutation,
  useGetCandidatesQuery,
  useActivateUserMutation,
  useFreezeUserMutation,
  useGetCompaniesQuery,
  useApproveCompanyMutation,
  useRejectCompanyMutation,
  useGetCompanyByIdQuery,
  useGetAdminJobsQuery,
  useGetJobByIdQuery,
  useGetSpecificPostQuery,
  useDeleteJobMutation,
  useGetManagersQuery,
  useAddManagerMutation,
  useActivateManagerMutation,
  useFreezeManagerMutation,
  useGetFullApplicantProfileQuery,
} = adminApi;
