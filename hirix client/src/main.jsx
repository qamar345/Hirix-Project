import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";

// Candidate
import {
  HomePage,
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
} from "./Admin/index.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Home Routes */}
      <Route path="/" element={<HomePage />} />
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
      </Route>
      <Route path="employer/jobs" element={<EmpJobs />} />
      <Route path="employer/applicants" element={<EmpApplicants />} />
      <Route path="employer/company" element={<EmpCompany />} />
      {/* Admin */}
      <Route path="admin-login" element={<HomePage />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin/dashboard" element={<AdDashboard />} />

        <Route path="/admin/settings" element={<AdSettings />} />
        <Route path="/admin/add-manager" element={<AddManager />} />
      </Route>
      <Route path="/admin/jobs" element={<AdJobs />} />
      <Route path="/admin/company" element={<AdCompany />} />
      <Route path="/admin/candidates" element={<AdCandidates />} />`
      <Route path="/admin/user-management" element={<AdManagement />} />`
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
