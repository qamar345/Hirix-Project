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
} = require("../controller/combined/commonAboutPosts");

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
const {
  Getcompanies,
  Approvedcompany,
  Rejectcompany,
} = require("../controller/combined/companies");
const { AddManager } = require("../controller/admin/AddManagers");
const { pagination } = require("../controller/combined/Pagination");
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

//....................................Admin.......................................
const router = express.Router();

router.post("/admin-login", Adminlogin);

router.put(
  "/admin-profile/:id",
  verifyToken,
  upload.single("image"),
  AdminProfile
);

router.get("/GetAdmin/:id", verifyToken, GetAdmin);

router.get("/get-data", verifyToken, Getdata);

router.get("/getusers", verifyToken, Getusers);

router.get("/DashboardData", verifyToken, GetDashboard);

router.get("/graph/:days", verifyToken, Graph);

router.get("/Candidategraph/:days", verifyToken, CandidateGraph);

// router.put("/approved-request/:id",verifyToken, request);

// router.put("/rejected/:id",verifyToken, requestrejected);

router.put("/active-employee/:id", verifyToken, Active);

router.put("/freezeusers/:id", verifyToken, FreezeUsers);

router.post("/freeze-employee/:id", verifyToken, verifyToken, Freeze);

router.get("/getManagers", verifyToken, GetManagers);

router.put("/activeManager/:id", verifyToken, ActiveManagers);

router.put("/freezeManager/:id", verifyToken, InactiveManagers);

router.post("/addManager", verifyToken, AddManager);

router.put("/change-password/:id", verifyToken, AdminChangePassword);

router.get("/getPostSpecific/:id", verifyToken, GetSpecificPost);

router.post("/verify-emailForAdmin", verifyToken, SendCodeForAdmin);

router.put("/forget-passwordForAdmin", verifyToken, forgetPasswordForAdmin);

router.get("/GetAllProfileData/:id", verifyToken, GetFullApplicantProfile);

// router.get("/pagination", pagination);
//......................................Combined........................................

router.get("/get-skills", GetSkills);
router.get("/get-candidate-skills/:id", GetCandidateSkills);

router.get("/get-job-cat", GetJobCategory);
router.get("/subcategories/:id", GetSubCategory);

router.get("/get-posts", Getposts);

router.get("/get-postsBYAdmin", GetpostsByAdmin);

router.get("/getTotal_jobs", GetTotalJobs);

router.get("/get-post-by-id/:id", Getpostbyid);

router.get("/getcompanies", verifyToken, Getcompanies);

router.put("/approvedCompany/:id", verifyToken, Approvedcompany);

router.put("/rejectCompany/:id", verifyToken, Rejectcompany);

router.get("/get-reviews", verifyToken, Getreviews);

router.get("/filtersCountData", filtersCount);

router.post("/verify-email", SendCode);

router.put("/forget-password", forgetPassword);

router.post("/send-verify-email", SendVerificationLink);

router.get("/verify-mail-link/:token", VerifyEmailLink);

router.get("/check-mail-status/:email", CheckMailStatus);

router.post("/news-letter", Subscribe);

//........................................Employee........................................

router.put(
  "/employee-profile-update/:id",
  upload.single("image"),
  EmployeeProfile
);

router.put("/Employer-password/:id", EmployeeChangePassword);

router.post("/employee-login", employeelogin);

router.get("/EmployerGraph/:id/:days", EmployerGraph);

router.get("/DashEmpData/:id", Dashboard);

router.get("/dashDataEmployer/:id", dashData);

router.post("/employee-signup", employeesignup);

router.get("/getEmployer/:id", GetEmployee);

router.get("/GetEmployeesWithCompanies/:id", GetEmpAndCom);

router.post("/postbyEmployee/:id", PostJob);

router.post("/saveAsDraft/:id", draftJob);

router.get("/GetCompanies/:id", SelectCompanies);

router.put("/edit-posts/:id", editposts);

router.put("/del-job-posts/:id", delposts);

router.delete("/deleteJob/:id", jobDel);

router.get("/getjobPost/:id", GetJob);

router.put("/update-status-opening/:id", post_status);

router.put("/status_Pause/:id", status_pause);

router.put("/status-review/:id", status_review);

router.put("/statusselected/:id", status_selected);

router.put("/statusrejected/:id", status_rejected);

router.post("/add-company/:id", upload.single("image"), Addcompany);

router.put("/edit-company/:id", Editcompany);

router.get("/select-company/:id", Selectcompany);

router.delete("/deletecompany/:id", DeleteCompany);

router.get("/getSpecificCompany/:id", GetCompanySpecific);

router.get("/get-applicants/:id", Getapplicants);

router.post("/send-message/:id", verifyToken, send_message);

router.get("/inbox/:id", verifyToken, inbox_message);

router.get("/outbox/:id", verifyToken, outbox_message);

// router.get("/messages", messages);

// router.post("/addskills", Addskillset);

// router.put("/edit-skillset/:id", Editskillset);

router.get("/get-his-posts/:id", Gethisposts);

// router.post("/required-skills/:id", required_skills);

//...................................Job Seeker.....................................

router.post("/user-login", verifyToken, userlogin);

router.get("/DasboardJobseeker/:id", JS_Dashboard);

router.get("/UserGraph/:id/:days", GraphUser);

router.get("/getSkills", Skills_select);

router.put("/update-user-profile/:id", verifyToken, UserProfile);

router.put("/updatePassword/:id", JobSeekerChangePassword);

router.post("/add-review", verifyToken, AddReview);

router.put("/edit-review/:id", verifyToken, editreview);

router.get("/appliedTo/:id", appliedTo);

router.put("/apply/:id", Apply);

router.put("/Deleted/:id", DeleteFromTable);

router.delete("/cancleApplication/:id", CancleApplication);

router.post("/apply-for-job/:id", ApplyForJob);

router.post("/addWishlist/:id", AddToWishlist);

router.get("/getWishlists/:id", GetWishlist);

router.get("/show-jobs/:id", verifyToken, showjobs);

router.post("/add-skillset/:id", Addskillset);

router.get("/getProfile/:id", GetProfile);

router.post("/postProfile/:id", upload.single("image"), ProfileBasicInfo);

router.post("/AddEducation/:id", upload.none(), Education);
router.get("/get-candidate-qualification/:id", GetEducation);

router.post("/AddExperience/:id", Experience);
router.get("/get-candidate-exp/:id", GetExperience);

router.post("/AddProject/:id", Project);
router.get("/get-candidate-projects/:id", GetCandidateProjects);

router.post("/AddAward/:id", Award);

router.get("/profile-status/:id", getUserProfileStatus);

router.get("/GenerateAutoUserName", GenerateUserName);

router.delete("/remove-skill/:id", RemoveCandidateSkills);

router.get("/download-cv/:id", GenerateCv);

module.exports = router;
