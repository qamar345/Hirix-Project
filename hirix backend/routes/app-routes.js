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
const { Active, Freeze, FreezeUsers, ActiveManagers, InactiveManagers } = require("../controller/admin/activeORfreezeBYadmin");

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
} = require("../controller/employee/employeePost");
const {
  status_review,
  status_selected,
  status_rejected,
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
const { appliedTo, addskillset, ApplyForJob, Addskillset, DeleteFromTable, CancleApplication, Apply, AddToWishlist } = require("../controller/jobseeker/appliedTo");
const verifyToken = require("../middleware/authToken");
const { Getcompanies, Approvedcompany, Rejectcompany } = require("../controller/combined/companies");
const { AddManager } = require("../controller/admin/AddManagers");
const { pagination } = require("../controller/combined/Pagination");
const { Graph, CandidateGraph } = require("../controller/admin/Graph");
const { Dashboard, dashData } = require("../controller/employee/DashboardData");
const { JS_Dashboard, Skills_select, GraphUser } = require("../controller/jobseeker/DashboardData");
const { ProfileBasicInfo, Education, Experience, Project, Award, getUserProfileStatus } = require("../controller/jobseeker/profileData");

//....................................Admin.......................................
const router = express.Router();

router.post("/admin-login", Adminlogin);

router.put("/admin-profile/:id", upload.single("image"), AdminProfile);

router.get("/GetAdmin/:id", GetAdmin)

router.get("/get-data", Getdata);

router.get("/getusers", Getusers);

router.get("/DashboardData", GetDashboard);

router.get("/graph/:days", Graph);

router.get("/Candidategraph/:days", CandidateGraph);

// router.put("/approved-request/:id",verifyToken, request);

// router.put("/rejected/:id",verifyToken, requestrejected);

router.put("/active-employee/:id", Active);

router.put("/freezeusers/:id", FreezeUsers);

router.post("/freeze-employee/:id",verifyToken, Freeze);

router.get("/getManagers", GetManagers);

router.put("/activeManager/:id", ActiveManagers);

router.put("/freezeManager/:id", InactiveManagers);

router.post("/addManager", AddManager);

router.put("/change-password/:id", AdminChangePassword)

router.get("/getPostSpecific/:id", GetSpecificPost)

router.post("/verify-emailForAdmin", SendCodeForAdmin);

router.put("/forget-passwordForAdmin", forgetPasswordForAdmin);

// router.get("/pagination", pagination);
//......................................Combined........................................

router.get("/get-posts", Getposts);

router.get("/get-postsBYAdmin", GetpostsByAdmin);

router.get("/getTotal_jobs", GetTotalJobs);

router.get("/get-post-by-id/:id",verifyToken, Getpostbyid);

router.get("/getcompanies", Getcompanies);

router.put("/approvedCompany/:id", Approvedcompany);

router.put("/rejectCompany/:id", Rejectcompany);

router.get("/get-reviews",verifyToken, Getreviews);

router.get("/filtersCountData", filtersCount);

router.post("/verify-email", SendCode);

router.put("/forget-password", forgetPassword);

//........................................Employee........................................

router.put("/employee-profile-update/:id", upload.single("image"), EmployeeProfile);

router.put("/Employer-password/:id", EmployeeChangePassword)

router.post("/employee-login", employeelogin);

router.get("/EmployerGraph/:id/:days", EmployerGraph);

router.get("/DashEmpData/:id", Dashboard);

router.get("/dashDataEmployer/:id", dashData);

router.post("/employee-signup", employeesignup);

router.get("/getEmployer/:id", GetEmployee);

router.post("/postbyEmployee/:id", PostJob);

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

router.post("/add-company/:id",upload.single("image"), Addcompany);

router.put("/edit-company/:id", Editcompany);

router.get("/select-company/:id", Selectcompany);

router.delete("/deletecompany/:id", DeleteCompany);

router.get("/getSpecificCompany/:id", GetCompanySpecific);

router.get("/get-applicants/:id", Getapplicants);

router.post("/send-message/:id",verifyToken, send_message);

router.get("/inbox/:id",verifyToken, inbox_message);

router.get("/outbox/:id",verifyToken, outbox_message);

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

router.post("/add-review",verifyToken, AddReview);

router.put("/edit-review/:id",verifyToken, editreview);

router.get("/appliedTo/:id", appliedTo);

router.put("/apply/:id",Apply);

router.put("/Deleted/:id", DeleteFromTable);

router.delete("/cancleApplication/:id", CancleApplication);

router.post("/apply-for-job/:id", ApplyForJob);

router.post("/addWishlist/:id", AddToWishlist);

router.get("/show-jobs/:id",verifyToken, showjobs);

router.post("/add-skillset/:id", Addskillset)

router.post("/postProfile/:id",upload.single("image"), ProfileBasicInfo)

router.post("/AddEducation/:id",upload.none(), Education);

router.post("/AddExperience/:id", Experience);

router.post("/AddProject/:id", Project);

router.post("/AddAward/:id", Award);

router.get("/profile-status/:id", getUserProfileStatus);

router.get("/GenerateAutoUserName", GenerateUserName);

module.exports = router;
