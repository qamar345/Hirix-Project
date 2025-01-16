const express = require("express");

//.................................Admin......................................

const {
  AdminProfile,
  Adminlogin,
} = require("../controller/admin/adminlogin");
const {
  Getdata,
  request,
  requestrejected,
} = require("../controller/admin/adminHaveData");
const { Active, Freeze } = require("../controller/admin/activeORfreezeBYadmin");

//...............................Combined.....................................

const {
  Getposts,
  Getpostbyid,
  Getreviews,
  filters,
  forgetPassword,
  SendCode,
} = require("../controller/combined/commonAboutPosts");

//...............................Employee.....................................

const {
  EmployeeProfile,
  employeelogin,
  employeesignup,
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
} = require("../controller/jobseeker/jobseekerLogin&Signup");
const { AddReview, editreview } = require("../controller/jobseeker/reviews");
const { appliedTo, addskillset, ApplyForJob, Addskillset } = require("../controller/jobseeker/appliedTo");
const verifyToken = require("../middleware/authToken");

//....................................Admin.......................................
const router = express.Router();

router.post("/admin-login",verifyToken, Adminlogin);

router.put("/admin-profile/:id",verifyToken, AdminProfile);

router.get("/get-data",verifyToken, Getdata);

// router.put("/approved-request/:id",verifyToken, request);

// router.put("/rejected/:id",verifyToken, requestrejected);

router.put("/active-employee/:id",verifyToken, Active);

router.post("/freeze-employee/:id",verifyToken, Freeze);

//......................................Combined........................................

router.get("/get-posts",verifyToken, Getposts);

router.get("/get-post-by-id/:id",verifyToken, Getpostbyid);

router.get("/get-reviews",verifyToken, Getreviews);

router.get("/filters",verifyToken, filters);

router.get("/verify-email",verifyToken, SendCode);

router.put("/forget-password/:id",verifyToken, forgetPassword);

//........................................Employee........................................

router.put("/employee-profile-update/:id",verifyToken, EmployeeProfile);

router.post("/employee-login",verifyToken, employeelogin);

router.post("/employee-signup",verifyToken, employeesignup);

router.get("/postbyEmployee/:id",verifyToken, PostJob);

router.put("/edit-posts/:id",verifyToken, editposts);

router.put("/del-job-posts/:id",verifyToken, delposts);

router.put("/update-status-opening/:id",verifyToken, post_status);

router.put("/status_Pause/:id",verifyToken, status_pause);

router.put("/status-review/:id",verifyToken, status_review);

router.put("/statusselected/:id",verifyToken, status_selected);

router.put("/statusrejected/:id",verifyToken, status_rejected);

router.post("/add-company/:id",verifyToken, Addcompany);

router.put("/edit-company/:id",verifyToken, Editcompany);

router.get("/select-company/:id",verifyToken, Selectcompany);

router.get("/get-applicants/:id",verifyToken, Getapplicants);

router.post("/send-message/:id",verifyToken, send_message);

router.get("/inbox/:id",verifyToken, inbox_message);

router.get("/outbox/:id",verifyToken, outbox_message);

// router.get("/messages", messages);

// router.post("/addskills", Addskillset);

// router.put("/edit-skillset/:id", Editskillset);

router.get("/get-his-posts/:id",verifyToken, Gethisposts);

// router.post("/required-skills/:id", required_skills);

//...................................Job Seeker.....................................

router.post("/user-login", verifyToken, userlogin);

router.put("/update-user-profile/:id", verifyToken, UserProfile);

router.post("/add-review",verifyToken, AddReview);

router.put("/edit-review/:id",verifyToken, editreview);

router.get("/appliedTo/:id", verifyToken, appliedTo);

router.post("/apply-for-job/:id",verifyToken, ApplyForJob);

router.get("/show-jobs/:id",verifyToken, showjobs);

router.get("/add-skillset/:id",verifyToken, Addskillset)
module.exports = router;
