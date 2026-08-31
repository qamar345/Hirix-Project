import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

// ─── Employer API Slice ───────────────────────────────────────────────────────
export const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["EmpProfile", "EmpJobs", "EmpCompanies", "EmpApplicants", "EmpDashboard", "Messages"],
  endpoints: (builder) => ({
    // Dashboard
    getEmpDashboard: builder.query({
      query: (id) => `/DashEmpData/${id}`,
      providesTags: ["EmpDashboard"],
    }),
    getEmpDashboardData: builder.query({
      query: (id) => `/dashDataEmployer/${id}`,
      providesTags: ["EmpDashboard"],
    }),
    getEmployerGraph: builder.query({
      query: ({ id, days }) => `/EmployerGraph/${id}/${days}`,
    }),
    // Profile
    getEmployer: builder.query({
      query: (id) => `/getEmployer/${id}`,
      providesTags: (result, error, id) => [{ type: "EmpProfile", id }],
    }),
    getEmpWithCompanies: builder.query({
      query: (id) => `/GetEmployeesWithCompanies/${id}`,
    }),
    updateEmployeeProfile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/employee-profile-update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "EmpProfile", id }],
    }),
    changeEmployerPassword: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/Employer-password/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    // Jobs
    getHisPosts: builder.query({
      query: (id) => `/get-his-posts/${id}`,
      providesTags: ["EmpJobs"],
    }),
    getJobPost: builder.query({
      query: (id) => `/getjobPost/${id}`,
    }),
    postJob: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/postbyEmployee/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["EmpJobs"],
    }),
    saveAsDraft: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/saveAsDraft/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["EmpJobs"],
    }),
    editPost: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/edit-posts/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["EmpJobs"],
    }),
    deleteSoftPost: builder.mutation({
      query: (id) => ({ url: `/del-job-posts/${id}`, method: "PUT" }),
      invalidatesTags: ["EmpJobs"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({ url: `/deleteJob/${id}`, method: "DELETE" }),
      invalidatesTags: ["EmpJobs"],
    }),
    updateJobStatus: builder.mutation({
      query: (id) => ({ url: `/update-status-opening/${id}`, method: "PUT" }),
      invalidatesTags: ["EmpJobs"],
    }),
    pauseJob: builder.mutation({
      query: (id) => ({ url: `/status_Pause/${id}`, method: "PUT" }),
      invalidatesTags: ["EmpJobs"],
    }),
    // Companies
    getCompaniesForEmp: builder.query({
      query: (id) => `/GetCompanies/${id}`,
      providesTags: ["EmpCompanies"],
    }),
    selectCompany: builder.query({
      query: ({ id, page, limit, search }) => ({
        url: `/select-company/${id}`,
        params: { page, limit, search },
      }),
      providesTags: ["EmpCompanies"],
    }),
    addCompany: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/add-company/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["EmpCompanies"],
    }),
    editCompany: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/edit-company/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["EmpCompanies"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({ url: `/deletecompany/${id}`, method: "DELETE" }),
      invalidatesTags: ["EmpCompanies"],
    }),
    getSpecificCompany: builder.query({
      query: (id) => `/getSpecificCompany/${id}`,
    }),
    // Applicants
    getApplicants: builder.query({
      query: (id) => `/get-applicants/${id}`,
      providesTags: (result, error, id) => [{ type: "EmpApplicants", id }],
    }),
    setStatusReview: builder.mutation({
      query: (id) => ({ url: `/status-review/${id}`, method: "PUT" }),
      invalidatesTags: ["EmpApplicants"],
    }),
    setStatusSelected: builder.mutation({
      query: (id) => ({ url: `/statusselected/${id}`, method: "PUT" }),
      invalidatesTags: ["EmpApplicants"],
    }),
    setStatusRejected: builder.mutation({
      query: (id) => ({ url: `/statusrejected/${id}`, method: "PUT" }),
      invalidatesTags: ["EmpApplicants"],
    }),
    // Messages
    sendMessage: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/send-message/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Messages"],
    }),
    getInbox: builder.query({
      query: (id) => `/inbox/${id}`,
      providesTags: ["Messages"],
    }),
    getOutbox: builder.query({
      query: (id) => `/outbox/${id}`,
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetEmpDashboardQuery,
  useGetEmpDashboardDataQuery,
  useGetEmployerGraphQuery,
  useGetEmployerQuery,
  useGetEmpWithCompaniesQuery,
  useUpdateEmployeeProfileMutation,
  useChangeEmployerPasswordMutation,
  useGetHisPostsQuery,
  useGetJobPostQuery,
  usePostJobMutation,
  useSaveAsDraftMutation,
  useEditPostMutation,
  useDeleteSoftPostMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
  usePauseJobMutation,
  useGetCompaniesForEmpQuery,
  useSelectCompanyQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
  useGetSpecificCompanyQuery,
  useGetApplicantsQuery,
  useSetStatusReviewMutation,
  useSetStatusSelectedMutation,
  useSetStatusRejectedMutation,
  useSendMessageMutation,
  useGetInboxQuery,
  useGetOutboxQuery,
} = employerApi;
