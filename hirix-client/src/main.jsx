import { createRoot } from "react-dom/client";
import React from "react";

// Self-hosted Inter font - the site's CSS has always assumed a "Poppins"
// typeface was loaded, but no @font-face/Google Fonts link ever actually
// existed anywhere in the project, so every visitor was silently seeing
// their OS default font instead. Inter is a better fit for a recruitment
// platform anyway (neutral, highly legible, reads as professional/trustworthy
// rather than playful) and is self-hosted here for privacy/reliability.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";
// import { ClerkProvider } from "@clerk/clerk-react";
// Candidate
import {
  HomePage,
  JobPage,
  CanDashboard,
  CanFollow,
  CanJobs,
  CanMeeting,
  CanMessage,
  CanPackage,
  CanProfile,
  CanReview,
  CanSetting,
  Candidate,
  AddEducation,
  Error,
} from "./candidate/index.js";

// Employer
import {
  Employer,
  EmpApplicants,
  EmpCandidates,
  EmpCompany,
  EmpDashboard,
  EmpJobs,
  EmpMeetings,
  EmpMessages,
  EmpPackage,
  EmpSettings,
  AddCompany,
  PostJob,
  EmpJobEdit,
  EmpEditCompany,
} from "./employer/index.js";

// Admin
import {
  Admin,
  AdDashboard,
  AdJobs,
  AdCandidates,
  AdCompany,
  AdSettings,
  AdManagement,
  AddManager,
  AdEmployee,
  JobList,
  ApplicantList,
  EmployeeList,
  AdBlogs,
  AdBlogEditor,
} from "./Admin/index.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import JobDetail from "./Admin/tables/jobdetail.jsx";
import EmployeeDetail from "./Admin/tables/EmployeesDetails.jsx";
import CompanyDetail from "./Admin/tables/CompanyDetails.jsx";
import ApplicantDetail from "./Admin/tables/ApplicantsDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Home Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/JobPage/:id" element={<JobPage />} />
      <Route path="*" element={<Error />} />
      {/* Candidate */}
      <Route
        path="candidate"
        element={
          <ProtectedRoute allow={["jobseeker"]}>
            <Candidate />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CanDashboard />} />
        <Route path="profile" element={<CanProfile />} />
        <Route path="jobs" element={<CanJobs />} />
        <Route path="package" element={<CanPackage />} />
        <Route path="reviews" element={<CanReview />} />
        <Route path="following" element={<CanFollow />} />
        <Route path="messages" element={<CanMessage />} />
        <Route path="meetings" element={<CanMeeting />} />
        <Route path="settings" element={<CanSetting />} />

        <Route path="add-education" element={<AddEducation />} />
      </Route>
      {/* Employer */}
      <Route
        path="employer"
        element={
          <ProtectedRoute allow={["employee"]}>
            <Employer />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EmpDashboard />} />

        <Route path="candidates" element={<EmpCandidates />} />
        <Route path="package" element={<EmpPackage />} />
        <Route path="messages" element={<EmpMessages />} />
        <Route path="meetings" element={<EmpMeetings />} />
        <Route path="settings" element={<EmpSettings />} />
        <Route path="add-company" element={<AddCompany />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="Edit_job" element={<EmpJobEdit />} />
        <Route path="Edit_Company" element={<EmpEditCompany />} />
      </Route>
      <Route
        path="employer/jobs"
        element={
          <ProtectedRoute allow={["employee"]}>
            <EmpJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="employer/jobs/list"
        element={
          <ProtectedRoute allow={["employee"]}>
            <JobList />
          </ProtectedRoute>
        }
      />
      <Route
        path="employer/applicants"
        element={
          <ProtectedRoute allow={["employee"]}>
            <EmpApplicants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/applicants/list"
        element={
          <ProtectedRoute allow={["employee"]}>
            <ApplicantList />
          </ProtectedRoute>
        }
      />
      <Route
        path="employer/company"
        element={
          <ProtectedRoute allow={["employee"]}>
            <EmpCompany />
          </ProtectedRoute>
        }
      />
      {/* Admin */}
      <Route path="/admin-login" element={<HomePage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdDashboard />} />

        <Route path="/admin/settings" element={<AdSettings />} />
        <Route path="/admin/add-manager" element={<AddManager />} />
      </Route>
      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs/list"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <JobList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobdetail/:id"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <JobDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/company"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdCompany />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CompanyDetails/:id"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <CompanyDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidates"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdCandidates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidates/list"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <ApplicantList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ApplicantDetails/:id"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <ApplicantDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/employees/list"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <EmployeeList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employeeDetails/:id"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <EmployeeDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user-management"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdBlogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs/new"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdBlogEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs/edit/:id"
        element={
          <ProtectedRoute allow={["admin"]} redirectTo="/admin-login">
            <AdBlogEditor />
          </ProtectedRoute>
        }
      />
    </>
  )
);

import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </ClerkProvider> */}
  </React.StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <div>Hello, world!</div>
//   </React.StrictMode>
// );
