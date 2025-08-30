import { createRoot } from "react-dom/client";
import React from "react";

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
      <Route path="candidate" element={<Candidate />}>
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
      <Route path="employer" element={<Employer />}>
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
      <Route path="employer/jobs" element={<EmpJobs />} />
      <Route path="employer/jobs/list" element={<JobList />} />
      <Route path="employer/applicants" element={<EmpApplicants />} />
      <Route path="/employer/applicants/list" element={<ApplicantList />} />
      <Route path="employer/company" element={<EmpCompany />} />
      {/* Admin */}
      <Route path="/admin-login" element={<HomePage />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin/dashboard" element={<AdDashboard />} />

        <Route path="/admin/settings" element={<AdSettings />} />
        <Route path="/admin/add-manager" element={<AddManager />} />
      </Route>
      <Route path="/admin/jobs" element={<AdJobs />} />
      <Route path="/admin/jobs/list" element={<JobList />} />
      <Route path="/jobdetail/:id" element={<JobDetail />} />

      <Route path="/admin/company" element={<AdCompany />} />
      <Route path="/CompanyDetails/:id" element={<CompanyDetail />} />
      <Route path="/admin/candidates" element={<AdCandidates />} />
      <Route path="/admin/candidates/list" element={<ApplicantList />} />
      <Route path="/ApplicantDetails/:id" element={<ApplicantDetail />} />
      <Route path="/admin/employees" element={<AdEmployee />} />
      <Route path="/admin/employees/list" element={<EmployeeList />} />
      <Route path="/employeeDetails/:id" element={<EmployeeDetail />} />
      <Route path="/admin/user-management" element={<AdManagement />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
    <RouterProvider router={router} />
    {/* </ClerkProvider> */}
  </React.StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <div>Hello, world!</div>
//   </React.StrictMode>
// );
