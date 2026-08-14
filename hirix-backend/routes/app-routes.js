const express = require("express");

const upload = require("../middleware/upload");

//.................................Admin......................................

const {
  AdminProfile,
  Adminlogin,
  GetAdmin,
  AdminChangePassword,
} = require("../controller/admin/adminlogin");
const {
  Getdata,
  request,
  requestrejected,
  Getusers,
  GetDashboard,
  GetManagers,
} = require("../controller/admin/adminHaveData");
const {
  Active,
  Freeze,
  FreezeUsers,
  ActiveManagers,
  InactiveManagers,
} = require("../controller/admin/activeORfreezeBYadmin");

//...............................Combined.....................................

const {
  Getposts,
  Getpostbyid,
  Getreviews,
  filters,
  forgetPassword,
  SendCode,
  GetSpecificPost,
  GetTotalJobs,
  GetpostsByAdmin,
  SendCodeForAdmin,
  forgetPasswordForAdmin,
  filtersCount,
  GetLatestJobs,
  SendContactEmail,
} = require("../controller/combined/commonAboutPosts");

const { GetSiteSettings, UpdateSiteSettings } = require("../controller/combined/siteConfigs");
const { GetBlogs, GetBlogBySlug, AddBlog, EditBlog, DeleteBlog } = require("../controller/combined/blogs");

//...............................Employee.....................................

const {
  EmployeeProfile,
  employeelogin,
  employeesignup,
  GetEmployee,
  EmployeeChangePassword,
  EmployerGraph,
  GenerateUserName,
  GetEmpAndCom,
} = require("../controller/employee/employeeLogin&Signup");
const {
  PostJob,
  editposts,
  delposts,
  post_status,
  status_pause,
  Gethisposts,
  Editskillset,
  required_skills,
  jobDel,
  GetJob,
  SelectCompanies,
  draftJob,
} = require("../controller/employee/employeePost");
const {
  status_review,
  status_selected,
  status_rejected,
  GetFullApplicantProfile,
} = require("../controller/employee/regardingApplication");
const {
  Addcompany,
  Selectcompany,
  Editcompany,
  DeleteCompany,
  GetCompanySpecific,
  ResendCompanyVerification,
} = require("../controller/employee/companies");
const { Getapplicants } = require("../controller/employee/reviewApplicants");
const {
  send_message,
  inbox_message,
  outbox_message,
} = require("../controller/employee/messages");

//...............................Job Seeker...................................

const {
  UserProfile,
  userlogin,
  showjobs,
  JobSeekerChangePassword,
} = require("../controller/jobseeker/jobseekerLogin&Signup");
const { AddReview, editreview } = require("../controller/jobseeker/reviews");
const {
  appliedTo,
  addskillset,
  ApplyForJob,
  Addskillset,
  DeleteFromTable,
  CancleApplication,
  Apply,
  AddToWishlist,
  GetWishlist,
} = require("../controller/jobseeker/appliedTo");
const verifyToken = require("../middleware/authToken");
const { requireRole, requireSelf } = require("../middleware/authorize");
const rateLimit = require("../middleware/rateLimit");

// Throttle brute-forceable auth endpoints (login attempts, reset codes)
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: "Too many attempts, please try again in a few minutes." });
const resetLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 8, message: "Too many attempts, please try again in a few minutes." });
const {
  Getcompanies,
  Approvedcompany,
  Rejectcompany,
} = require("../controller/combined/companies");
const { AddManager } = require("../controller/admin/AddManagers");
const { Graph, CandidateGraph } = require("../controller/admin/Graph");
const { Dashboard, dashData } = require("../controller/employee/DashboardData");
const {
  JS_Dashboard,
  Skills_select,
  GraphUser,
} = require("../controller/jobseeker/DashboardData");
const {
  ProfileBasicInfo,
  Education,
  Experience,
  Project,
  Award,
  getUserProfileStatus,
  GetProfile,
  GetEducation,
  GetExperience,
  GenerateCv,
} = require("../controller/jobseeker/profileData");
const {
  SendVerificationLink,
  VerifyEmailLink,
  CheckMailStatus,
  VerifyCompanyEmail,
} = require("../utils/SendEmailVerificationLink");
const {
  GetSkills,
  GetJobCategory,
  GetSubCategory,
  GetCandidateSkills,
  RemoveCandidateSkills,
  GetCandidateProjects,
} = require("../controller/combined/getSkills");

const { Subscribe } = require("../utils/NewLetterSubsription");
const { Test } = require("../controller/test/test.controller");

//....................................Admin.......................................
const router = express.Router();

router.post("/admin-login", authLimiter, Adminlogin);

router.put(
  "/admin-profile/:id",
  verifyToken,
  requireRole("admin"),
  requireSelf("id"),
  upload.single("image"),
  AdminProfile
);

router.get("/GetAdmin/:id", verifyToken, requireRole("admin"), GetAdmin);

router.get("/get-data", verifyToken, requireRole("admin"), Getdata);

router.get("/getusers", verifyToken, requireRole("admin"), Getusers);

router.get("/DashboardData", verifyToken, requireRole("admin"), GetDashboard);

router.get("/graph/:days", verifyToken, requireRole("admin"), Graph);

router.get("/Candidategraph/:days", verifyToken, requireRole("admin"), CandidateGraph);

// router.put("/approved-request/:id",verifyToken, request);

// router.put("/rejected/:id",verifyToken, requestrejected);

router.put("/active-employee/:id", verifyToken, requireRole("admin"), Active);

router.put("/freezeusers/:id", verifyToken, requireRole("admin"), FreezeUsers);

router.post("/freeze-employee/:id", verifyToken, requireRole("admin"), Freeze);

router.get("/getManagers", verifyToken, requireRole("admin"), GetManagers);

router.put("/activeManager/:id", verifyToken, requireRole("admin"), ActiveManagers);

router.put("/freezeManager/:id", verifyToken, requireRole("admin"), InactiveManagers);

router.post("/addManager", verifyToken, requireRole("admin"), AddManager);

router.put("/change-password/:id", verifyToken, requireRole("admin"), requireSelf("id"), AdminChangePassword);

router.get("/getPostSpecific/:id", verifyToken, GetSpecificPost);

router.post("/verify-emailForAdmin", verifyToken, requireRole("admin"), resetLimiter, SendCodeForAdmin);

router.put("/forget-passwordForAdmin", verifyToken, requireRole("admin"), resetLimiter, forgetPasswordForAdmin);

router.get("/GetAllProfileData/:id", verifyToken, requireRole("admin", "employee"), GetFullApplicantProfile);

//......................................Combined........................................

router.get("/get-skills", GetSkills);
router.get("/get-candidate-skills/:id", GetCandidateSkills);

router.get("/get-job-cat", GetJobCategory);
router.get("/subcategories/:id", GetSubCategory);

router.get("/get-posts", Getposts);
router.get("/get-latest-jobs", GetLatestJobs);

// Site Configurations Endpoints
router.get("/site-settings", GetSiteSettings);
router.put("/site-settings", verifyToken, requireRole("admin"), UpdateSiteSettings);

// Blog Engine Endpoints
router.get("/get-blogs", GetBlogs);
router.get("/get-blog/:slug", GetBlogBySlug);
router.post("/add-blog", verifyToken, requireRole("admin"), AddBlog);
router.put("/edit-blog/:id", verifyToken, requireRole("admin"), EditBlog);
router.delete("/delete-blog/:id", verifyToken, requireRole("admin"), DeleteBlog);

router.get("/get-postsBYAdmin", GetpostsByAdmin);

router.get("/getTotal_jobs", GetTotalJobs);

router.get("/get-post-by-id/:id", Getpostbyid);

router.get("/getcompanies", verifyToken, requireRole("admin"), Getcompanies);

router.put("/approvedCompany/:id", verifyToken, requireRole("admin"), Approvedcompany);

router.put("/rejectCompany/:id", verifyToken, requireRole("admin"), Rejectcompany);

router.get("/get-reviews", verifyToken, requireRole("admin"), Getreviews);

router.get("/filtersCountData", filtersCount);

router.post("/verify-email", resetLimiter, SendCode);

router.put("/forget-password", resetLimiter, forgetPassword);

router.post("/send-verify-email", resetLimiter, SendVerificationLink);

router.get("/verify-mail-link/:token", VerifyEmailLink);
router.get("/verify-company-email/:token", VerifyCompanyEmail);

router.post("/send-contact-email", SendContactEmail);

router.get("/check-mail-status/:email", CheckMailStatus);
router.post("/news-letter", verifyToken, Subscribe);

//........................................Employee........................................

router.put(
  "/employee-profile-update/:id",
  verifyToken,
  requireSelf("id"),
  upload.single("image"),
  EmployeeProfile
);

router.put("/Employer-password/:id", verifyToken, requireSelf("id"), EmployeeChangePassword);

router.post("/employee-login", authLimiter, employeelogin);

router.get("/EmployerGraph/:id/:days", verifyToken, requireSelf("id"), EmployerGraph);

router.get("/DashEmpData/:id", verifyToken, requireSelf("id"), Dashboard);

router.get("/dashDataEmployer/:id", verifyToken, requireSelf("id"), dashData);

router.post("/employee-signup", authLimiter, employeesignup);

router.get("/getEmployer/:id", verifyToken, requireSelf("id", ["admin"]), GetEmployee);

router.get("/GetEmployeesWithCompanies/:id", verifyToken, requireSelf("id", ["admin"]), GetEmpAndCom);

router.post("/postbyEmployee/:id", verifyToken, requireSelf("id"), PostJob);

router.post("/saveAsDraft/:id", verifyToken, requireSelf("id"), draftJob);

router.get("/GetCompanies/:id", verifyToken, requireSelf("id"), SelectCompanies);

// Job/company/applicant records below are looked up by their OWN id, not
// the caller's id, so ownership is verified inside each controller
// against req.user.id rather than at the route level.
router.put("/edit-posts/:id", verifyToken, editposts);

router.put("/del-job-posts/:id", verifyToken, delposts);

router.delete("/deleteJob/:id", verifyToken, jobDel);

router.get("/getjobPost/:id", verifyToken, GetJob);

router.put("/update-status-opening/:id", verifyToken, post_status);

router.put("/status_Pause/:id", verifyToken, status_pause);

router.put("/status-review/:id", verifyToken, status_review);

router.put("/statusselected/:id", verifyToken, status_selected);

router.put("/statusrejected/:id", verifyToken, status_rejected);

router.post(
  "/add-company/:id",
  verifyToken,
  requireSelf("id"),
  upload.single("image"),
  Addcompany
);

router.put("/edit-company/:id", verifyToken, Editcompany);

router.get("/select-company/:id", verifyToken, Selectcompany);

router.delete("/deletecompany/:id", verifyToken, DeleteCompany);

router.get("/getSpecificCompany/:id", verifyToken, GetCompanySpecific);
router.post("/resend-company-verification/:id", verifyToken, ResendCompanyVerification);

// LinkedIn Company Verification Routes
const { getLinkedInAuthURL, handleLinkedInCallback } = require("../controller/employee/linkedinVerification");
router.get("/auth/linkedin", verifyToken, getLinkedInAuthURL);
router.get("/auth/linkedin/callback", handleLinkedInCallback);

router.get("/get-applicants/:id", verifyToken, requireSelf("id"), Getapplicants);

router.post("/send-message/:id", verifyToken, requireSelf("id"), send_message);

router.get("/inbox/:id", verifyToken, requireSelf("id"), inbox_message);

router.get("/outbox/:id", verifyToken, requireSelf("id"), outbox_message);

// router.get("/messages", messages);

// router.post("/addskills", Addskillset);

// router.put("/edit-skillset/:id", Editskillset);

router.get("/get-his-posts/:id", verifyToken, requireSelf("id"), Gethisposts);

// router.post("/required-skills/:id", required_skills);

//...................................Job Seeker.....................................

router.post("/user-login", authLimiter, userlogin);

router.get("/DasboardJobseeker/:id", verifyToken, requireSelf("id"), JS_Dashboard);

router.get("/UserGraph/:id/:days", verifyToken, requireSelf("id"), GraphUser);

router.get("/getSkills", Skills_select);

router.put("/update-user-profile/:id", verifyToken, requireSelf("id"), UserProfile);

router.put("/updatePassword/:id", verifyToken, requireSelf("id"), JobSeekerChangePassword);

router.post("/add-review", verifyToken, AddReview);

router.put("/edit-review/:id", verifyToken, editreview);

router.get("/appliedTo/:id", verifyToken, requireSelf("id"), appliedTo);

router.put("/apply/:id", verifyToken, Apply);

router.put("/Deleted/:id", verifyToken, DeleteFromTable);

router.delete("/cancleApplication/:id", verifyToken, CancleApplication);

router.post("/apply-for-job/:id", verifyToken, requireSelf("id"), ApplyForJob);

router.post("/addWishlist/:id", verifyToken, requireSelf("id"), AddToWishlist);

router.get("/getWishlists/:id", verifyToken, requireSelf("id"), GetWishlist);

router.get("/show-jobs/:id", verifyToken, requireSelf("id"), showjobs);

router.post("/add-skillset/:id", verifyToken, requireSelf("id"), Addskillset);

router.get("/getProfile/:id", verifyToken, requireSelf("id", ["admin", "employee"]), GetProfile);

router.post(
  "/postProfile/:id",
  verifyToken,
  requireSelf("id"),
  upload.single("image"),
  ProfileBasicInfo
);

router.post("/AddEducation/:id", verifyToken, requireSelf("id"), upload.none(), Education);
router.get("/get-candidate-qualification/:id", verifyToken, requireSelf("id", ["admin", "employee"]), GetEducation);

router.post("/AddExperience/:id", verifyToken, requireSelf("id"), Experience);
router.get("/get-candidate-exp/:id", verifyToken, requireSelf("id", ["admin", "employee"]), GetExperience);

router.post("/AddProject/:id", verifyToken, requireSelf("id"), Project);
router.get("/get-candidate-projects/:id", verifyToken, requireSelf("id", ["admin", "employee"]), GetCandidateProjects);

router.post("/AddAward/:id", verifyToken, requireSelf("id"), Award);

router.get("/profile-status/:id", verifyToken, requireSelf("id"), getUserProfileStatus);

router.get("/GenerateAutoUserName", GenerateUserName);

router.delete("/remove-skill/:id", verifyToken, RemoveCandidateSkills);

router.get("/download-cv/:id", verifyToken, requireSelf("id", ["admin", "employee"]), GenerateCv);

router.get("/test", Test);

module.exports = router;
