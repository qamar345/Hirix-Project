import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.hirix.com.pk";
const getToken = () => sessionStorage.getItem("token");

// ─── Candidate (Job Seeker) API Slice ─────────────────────────────────────────
export const candidateApi = createApi({
  reducerPath: "candidateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("x-access-token", token);
      return headers;
    },
  }),
  tagTypes: ["CanDashboard", "CanProfile", "Applications", "Wishlist", "Skills", "Reviews", "Education", "Experience", "Projects"],
  endpoints: (builder) => ({
    // Dashboard
    getCanDashboard: builder.query({
      query: (id) => `/DasboardJobseeker/${id}`,
      providesTags: ["CanDashboard"],
    }),
    getUserGraph: builder.query({
      query: ({ id, days }) => `/UserGraph/${id}/${days}`,
    }),
    // Profile
    getProfile: builder.query({
      query: (id) => `/getProfile/${id}`,
      providesTags: (result, error, id) => [{ type: "CanProfile", id }],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update-user-profile/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "CanProfile", id }],
    }),
    postBasicProfile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/postProfile/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CanProfile"],
    }),
    getProfileStatus: builder.query({
      query: (id) => `/profile-status/${id}`,
    }),
    // Education
    addEducation: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/AddEducation/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Education"],
    }),
    getEducation: builder.query({
      query: (id) => `/get-candidate-qualification/${id}`,
      providesTags: ["Education"],
    }),
    // Experience
    addExperience: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/AddExperience/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Experience"],
    }),
    getExperience: builder.query({
      query: (id) => `/get-candidate-exp/${id}`,
      providesTags: ["Experience"],
    }),
    // Projects
    addProject: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/AddProject/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Projects"],
    }),
    getCandidateProjects: builder.query({
      query: (id) => `/get-candidate-projects/${id}`,
      providesTags: ["Projects"],
    }),
    // Awards
    addAward: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/AddAward/${id}`,
        method: "POST",
        body: payload,
      }),
    }),
    // Skills
    getSkills: builder.query({
      query: () => "/get-skills",
      providesTags: ["Skills"],
    }),
    getCandidateSkills: builder.query({
      query: (id) => `/get-candidate-skills/${id}`,
      providesTags: (result, error, id) => [{ type: "Skills", id }],
    }),
    addSkillset: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/add-skillset/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Skills"],
    }),
    removeSkill: builder.mutation({
      query: (id) => ({ url: `/remove-skill/${id}`, method: "DELETE" }),
      invalidatesTags: ["Skills"],
    }),
    // Applications
    getAppliedJobs: builder.query({
      query: ({ id, type, search }) => ({
        url: `/appliedTo/${id}`,
        params: { type, search },
      }),
      providesTags: ["Applications"],
    }),
    applyForJob: builder.mutation({
      query: ({ id, job_id }) => ({
        url: `/apply-for-job/${id}`,
        method: "POST",
        params: { job_id },
      }),
      invalidatesTags: ["Applications", "Wishlist"],
    }),
    applyFromWishlist: builder.mutation({
      query: (id) => ({ url: `/apply/${id}`, method: "PUT" }),
      invalidatesTags: ["Applications", "Wishlist"],
    }),
    cancelApplication: builder.mutation({
      query: (id) => ({ url: `/cancleApplication/${id}`, method: "DELETE" }),
      invalidatesTags: ["Applications"],
    }),
    deleteFromTable: builder.mutation({
      query: (id) => ({ url: `/Deleted/${id}`, method: "PUT" }),
      invalidatesTags: ["Applications"],
    }),
    // Wishlist
    addToWishlist: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/addWishlist/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlist: builder.query({
      query: (id) => `/getWishlists/${id}`,
      providesTags: ["Wishlist"],
    }),
    // Reviews
    addReview: builder.mutation({
      query: (payload) => ({
        url: "/add-review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    editReview: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/edit-review/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    // Password
    changePassword: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/updatePassword/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCanDashboardQuery,
  useGetUserGraphQuery,
  useGetProfileQuery,
  useUpdateUserProfileMutation,
  usePostBasicProfileMutation,
  useGetProfileStatusQuery,
  useAddEducationMutation,
  useGetEducationQuery,
  useAddExperienceMutation,
  useGetExperienceQuery,
  useAddProjectMutation,
  useGetCandidateProjectsQuery,
  useAddAwardMutation,
  useGetSkillsQuery,
  useGetCandidateSkillsQuery,
  useAddSkillsetMutation,
  useRemoveSkillMutation,
  useGetAppliedJobsQuery,
  useApplyForJobMutation,
  useApplyFromWishlistMutation,
  useCancelApplicationMutation,
  useDeleteFromTableMutation,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useAddReviewMutation,
  useEditReviewMutation,
  useChangePasswordMutation,
} = candidateApi;
