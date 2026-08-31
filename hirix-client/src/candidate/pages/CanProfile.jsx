import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import "react-quill-new/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RemoveIcon from "../assets/icons/remove.svg";

import {
  FaTimes,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { CanFooter } from "../index.js";
import API, { BASE_URL } from "../../api";
import { showSuccess, showError } from "../../utils/toast";
import Loader from "../../components/Loader";

const CanProfile = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  const check = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!check) navigate("/");
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basicInfoTab");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [currentPosition, setcurrentPosition] = useState("");
  const [categories, setcategories] = useState("");
  const [des, setdes] = useState("");
  const [dop, setdop] = useState(null);
  const [age, setage] = useState("");
  const [GenderIs, setGenderIs] = useState("");
  const [languages, setlanguages] = useState("");
  const [Qualification, setQualification] = useState("");
  const [Experience, setExperience] = useState("");
  const [salary, setsalary] = useState("");
  const [salaryType, setsalaryType] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Province, setProvince] = useState("");
  const [City, setCity] = useState("");
  const [linkedin, setlinkedIn] = useState("");
  const [EduGrade, setEduGrade] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Each of these sections supports multiple entries: an array of blank
  // field-groups the user can add to ("Add another ...") and remove from,
  // all published together in one Publish click.
  const emptyEducation = () => ({
    title: "",
    field: "",
    institute: "",
    from: "",
    to: "",
    isPresent: false,
  });
  const [eduEntries, setEduEntries] = useState([emptyEducation()]);

  const emptyExperience = () => ({
    title: "",
    company: "",
    from: "",
    to: "",
    description: "",
    isPresent: false,
  });
  const [expEntries, setExpEntries] = useState([emptyExperience()]);

  const emptyProject = () => ({ title: "", link: "", description: "" });
  const [projectEntries, setProjectEntries] = useState([emptyProject()]);

  const emptyAward = () => ({
    title: "",
    awardedBy: "",
    dateAwarded: "",
    description: "",
  });
  const [awardEntries, setAwardEntries] = useState([emptyAward()]);

  const updateEntry = (setter, index, field, value) => {
    setter((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    );
  };
  const addEntry = (setter, factory) => setter((prev) => [...prev, factory()]);
  const removeEntry = (setter, index) =>
    setter((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const [percentage, setPercentage] = useState(0);
  const [checkStatus, setCheckStatus] = useState({
    info: false,
    education: false,
    experience: false,
    skills: false,
    projects: false,
    awards: false,
  });
  const [dbSkills, setDbSkills] = useState([]);

  const [CandidateEdu, setCandidateEdu] = useState([]);
  const [CandidateExp, setCandidateExp] = useState([]);
  const [CandidateSkills, setCandidateSkills] = useState([]);
  const [CandidateProj, setCandidateProj] = useState([]);
  const [CandidateAwards, setCandidateAwards] = useState([]);

  sessionStorage.setItem("Percent", percentage);
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCancelUpload = () => {
    setUploadedImage(null);
  };
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const res = await fetch(""); // 🔁 Your actual API
  //     const data = await res.json();

  //     setfirstName(data.firstName);
  //     setLastName(data.lastName);
  //     setemail(data.email);
  //     setphone(data.phone);
  //   };

  //   fetchUserData();
  // }, []);
  useEffect(() => {
    API
      .get(`/getProfile/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        const data = res.data;
        setfirstName(data.first_name);
        setLastName(data.last_name);
        setemail(data.email);
        setphone(data.phone);
        setQualification(data.qualification);
        setcurrentPosition(data.CurrentPosition);
        setcategories(data.Category);
        setdes(data.Description);
        setdop(data.DOP);
        setage(data.Age);
        setGenderIs(data.Gender);
        setlanguages(data.Language);
        setExperience(data.Experience);
        setsalary(data.offer_salary);
        setsalaryType(data.Salary_type);
        setCurrency(data.Currency);
        setProvince(data.province);
        setCity(data.location);
        setlinkedIn(data.LinkedIn);
        setPageLoading(false);
      })
      .catch((err) => {
        console.error(err);
        showError("Failed to load your profile. Please refresh the page.");
        setPageLoading(false);
      });
  }, []);
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("first_name", firstName?.trim());
    formData.append("last_name", lastName?.trim());
    formData.append("email", email?.trim());
    formData.append("phone", phone?.trim());
    formData.append("qualification", Qualification?.trim());
    formData.append("CurrentPosition", currentPosition?.trim());
    formData.append("Category", categories?.trim());
    formData.append("Description", des?.trim());
    formData.append("DOP", dop);
    formData.append("Age", age);
    formData.append("Gender", GenderIs?.trim());
    formData.append("Language", languages?.trim());
    formData.append("Experience", Experience?.trim());
    formData.append("offer_salary", salary?.trim());
    formData.append("Salary_type", salaryType?.trim());
    formData.append("Currency", Currency?.trim());
    formData.append("province", Province);
    formData.append("location", City);
    formData.append("LinkedIn", linkedin?.trim());

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    try {
      const res = await API.post(
        `/postProfile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );
      if (res.data.image) {
        sessionStorage.setItem("image", res.data.image);
        window.dispatchEvent(new Event("profileUpdated"));
      }

      if (res.data.firstName) {
        sessionStorage.setItem("first_name", res.data.firstName);
      }
      showSuccess(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const EduSubmit = async (e) => {
    e.preventDefault();
    const missingFrom = eduEntries.findIndex((entry) => !entry.from);
    if (missingFrom !== -1) {
      showError(
        `Please select the 'From' date for education entry #${missingFrom + 1}.`
      );
      return;
    }

    try {
      for (const entry of eduEntries) {
        const formData = new FormData();
        formData.append("Title", entry.title?.trim());
        formData.append("Institute", entry.institute?.trim());
        formData.append("Field", entry.field?.trim());
        formData.append("From", entry.from);
        if (entry.isPresent) {
          formData.append("To", "Present");
        } else if (entry.to) {
          formData.append("To", entry.to);
        }

        await API.post(`/AddEducation/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        });
      }
      showSuccess(
        eduEntries.length > 1
          ? `${eduEntries.length} education entries added!`
          : "Education added!"
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      showError("Failed to save education. Please try again.");
    }
  };

  const ExperienceSubmit = async (e) => {
    e.preventDefault();

    const missingFrom = expEntries.findIndex((entry) => !entry.from);
    if (missingFrom !== -1) {
      showError(
        `Please select the 'From' date for experience entry #${missingFrom + 1}.`
      );
      return;
    }

    try {
      for (const entry of expEntries) {
        const payload = {
          Title: entry.title?.trim(),
          Company: entry.company?.trim(),
          From: entry.from,
          To: entry.isPresent ? "Present" : entry.to || "",
          Description: entry.description?.trim(),
        };

        await API.post(`/AddExperience/${id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
      }
      showSuccess(
        expEntries.length > 1
          ? `${expEntries.length} experience entries added!`
          : "Experience added!"
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      showError("Failed to save experience. Please try again.");
    }
  };

  const skillsSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      skills: selectedSkills.map((skill) => skill.id),
    };

    try {
      const res = await API.post(
        `/add-skillset/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      showSuccess(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const RemoveSkills = async (id) => {
    try {
      const res = await API.delete(
        `/remove-skill/${id}`,
        null,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      showSuccess(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const ProjectSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const entry of projectEntries) {
        const payload = {
          Title: entry.title?.trim(),
          Link: entry.link?.trim(),
          Description: entry.description?.trim(),
        };

        await API.post(`/AddProject/${id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
      }
      showSuccess(
        projectEntries.length > 1
          ? `${projectEntries.length} projects added!`
          : "Project added!"
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      showError("Failed to save project. Please try again.");
    }
  };

  const AwardSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const entry of awardEntries) {
        const payload = {
          Title: entry.title?.trim(),
          AwardedBy: entry.awardedBy?.trim(),
          date_awarded: entry.dateAwarded,
          Description: entry.description?.trim(),
        };

        await API.post(`/AddAward/${id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
      }
      showSuccess(
        awardEntries.length > 1
          ? `${awardEntries.length} awards added!`
          : "Award added!"
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      showError("Failed to save award. Please try again.");
    }
  };

  // const DownloadCv = async (uid) => {
  //   try {
  //     const res = await API.get(`/download-cv/${uid}`);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const GetEducation = async () => {
      try {
        const res = await API.get(
          `/get-candidate-qualification/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setCandidateEdu(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    const GetExperience = async () => {
      try {
        const res = await API.get(
          `/get-candidate-exp/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setCandidateExp(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    const GetDBSkills = async () => {
      try {
        const res = await API.get("/get-skills", {
          headers: {
            "x-access-token": token,
          },
        });
        setDbSkills(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    const CandidateSkills = async () => {
      try {
        const res = await API.get(
          `/get-candidate-skills/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setCandidateSkills(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    const GetCandidateProjects = async () => {
      try {
        const res = await API.get(
          `/get-candidate-projects/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setCandidateProj(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    const GetCandidateAwards = async () => {
      try {
        const res = await API.get(
          `/get-candidate-awards/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setCandidateAwards(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    GetEducation();
    GetExperience();
    GetDBSkills();
    CandidateSkills();
    GetCandidateProjects();
    GetCandidateAwards();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await API.get(
          `/profile-status/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        const { info, education, experience, skills, projects, awards } =
          res.data.status;

        const newStatus = {
          info: info,
          education: education,
          experience: experience,
          skills: skills,
          projects: projects,
          awards: awards,
        };
        setCheckStatus(newStatus);

        // Calculate percentage based on how many sections have data
        const completedSections =
          Object.values(newStatus).filter(Boolean).length;
        const totalSections = Object.keys(newStatus).length;
        const newPercentage =
          totalSections > 0
            ? ((completedSections / totalSections) * 100).toFixed(1)
            : "0.0";

        setPercentage(newPercentage);
        sessionStorage.setItem("Percent", newPercentage);
        window.dispatchEvent(new Event("percentUpdated"));
      } catch (error) {
        console.error("Failed to load profile completion status:", error);
      }
    };

    fetchProfileData();
  }, [id]);

  const cats = [
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Engineering", label: "Engineering" },
    { value: "IT & Software", label: "IT & Software" },
    { value: "Finance & Accounting", label: "Finance & Accounting" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales & Retail", label: "Sales & Retail" },
    { value: "Admin & Office", label: "Admin & Office" },
    { value: "Legal", label: "Legal" },
    { value: "Media & Design", label: "Media & Design" },
    { value: "Construction", label: "Construction" },
    { value: "Transport & Logistics", label: "Transport & Logistics" },
    { value: "Freelance / Remote", label: "Freelance / Remote" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Beauty & Personal Care", label: "Beauty & Personal Care" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Security Services", label: "Security Services" },
    {
      value: "Production / Manufacturing",
      label: "Production / Manufacturing",
    },
    { value: "Other", label: "Other" },
  ];
  const gender = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ];
  const language = [
    { value: "Urdu", label: "Urdu" },
    { value: "English", label: "English" },
    { value: "Punjabi", label: "Punjabi" },
  ];
  const qualification = [
    { value: "Matric/Secondary School", label: "Matric / Secondary School" },
    {
      value: "Intermediate/Higher Secondary",
      label: "Intermediate / Higher Secondary",
    },
    { value: "Diploma/Certification", label: "Diploma / Certification" },
    { value: "Associate Degree", label: "Associate Degree" },
    { value: "Bachelor’s Degree", label: "Bachelor’s Degree" },
    { value: "Master’s Degree", label: "Master’s Degree" },
    { value: "MPhil/Postgraduate", label: "MPhil / Postgraduate" },
    { value: "PhD/Doctorate", label: "PhD / Doctorate" },
    { value: "Medical Professional", label: "Medical Professional" },
    { value: "Engineering Degree", label: "Engineering Degree" },
    { value: "Religious Education", label: "Religious Education" },
    {
      value: "Technical/Vocational Training",
      label: "Technical / Vocational Training",
    },
    { value: "No Formal Education", label: "No Formal Education" },
    { value: "Currently Enrolled", label: "Currently Enrolled" },
    { value: "Other", label: "Other" },
  ];
  const experience = [
    { value: "1_2", label: "1-2 Years" },
    { value: "3_5", label: "3-5 Years" },
    { value: "6_9", label: "6-9 Years" },
    { value: "10+", label: "10+ Years" },
  ];
  const currency = [
    { value: "usd", label: "($) - USD" },
    { value: "pkr", label: "(PKR) - PKR" },
  ];
  const rate = [
    { value: "none", label: "None" },
    { value: "hour", label: "Per Hour" },
    { value: "day", label: "Per Day" },
    { value: "week", label: "Per Week" },
    { value: "month", label: "Per Month" },
  ];
  const city = [
    { value: "Lahore", label: "Lahore" },
    { value: "Rawalpindi", label: "Rawalpindi" },
    { value: "karachi", label: "Karachi" },
    { value: "Islamabad", label: "Islamabad" },
  ];
  const province = [
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "punjab", label: "Punjab" },
    { value: "sindh", label: "Sindh" },
    { value: "balochistan", label: "Balochistan" },
  ];
  const skills = [
    { value: "php", label: "PHP" },
    { value: "python", label: "Python" },
    { value: "webDesign", label: "Web Design" },
    { value: "responsiveDesign", label: "Responsive Design" },
  ];
  // const percentage = 78;

  // const [checkStatus, setCheckStatus] = useState({
  //   info: true,
  //   education: true,
  //   experience: true,
  //   skills: true,
  //   projects: true,
  //   awards: true,
  // });

  useEffect(() => {
    if (dop) {
      const today = new Date();
      const birthDate = new Date(dop);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setage(calculatedAge);
    } else {
      setage("");
    }
  }, [dop]);

  return (
    <div id="candidate-profile" className="dashboardWrapper addCompany">
      <div className="entry-my-page candidate-profile-dashboard">
        <div className="entry-title">
          <h4 className="heading">Profile Settings</h4>
        </div>

        {pageLoading && <Loader label="Loading your profile..." />}

        <div className="tab-dashboard" style={pageLoading ? { display: "none" } : undefined}>
          <div className="d-grid">
            <ul className="tab-list candidate-profile-tab overflow-x-auto">
              <li
                className={`tab-item ${
                  activeTab === "basicInfoTab" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("basicInfoTab")}
              >
                <Link>Basic Info</Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "educationTab" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("educationTab")}
              >
                <Link>Education</Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "experienceTab" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("experienceTab")}
              >
                <Link>Experience</Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "skillsTab" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("skillsTab")}
              >
                <Link>Skills</Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "projectsTab" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("projectsTab")}
              >
                <Link>Projects</Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "awardsTab" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("awardsTab")}
              >
                <Link>Awards</Link>
              </li>

              {Math.floor(percentage) === 100 && (
                <li
                  className={`tab-item ${
                    activeTab === "downloadcv" ? "active" : ""
                  }`}
                >
                  <Link
                    to={`/download-cv/${id}`}
                    target="_blank"
                  >
                    Download Profile as CV
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="tab-content row">
            {/* Input */}
            {/* <form 
              className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                isScrolled ? "companyData" : ""
              }`}
            > */}
            {/* Basic Info */}
            <div
              id="basicInfoTab"
              className={`tab-info ${
                activeTab === "basicInfoTab" ? "active" : ""
              }`}
            >
              <form
                onSubmit={submit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className=" block-from">
                  <h6 className="block-heading">Basic Information</h6>

                  <div className="row">
                    <div className="entryGroup col-md-12 mt12">
                      <div className="user-avatar">
                        <div className="gap-3 d-flex flex-column">
                          <label>Your photo</label>
                          <div className="file-uploader">
                            {!uploadedImage ? (
                              <label className="upload-label">
                                <RiUploadLine className="upload-icon" />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleLogoUpload}
                                  className="hidden-input"
                                />
                              </label>
                            ) : (
                              <div className="image-preview">
                                <img
                                  src={uploadedImage}
                                  alt="Uploaded Preview"
                                  className="img-preview"
                                />
                                <div className="close-btn">
                                  <button onClick={handleCancelUpload}>
                                    <IoCloseSharp className="icon" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="user-desc">
                          Update your photo manually, if the photo is not set
                          the default Avatar will be the same as your login
                          email account.
                        </div>
                      </div>
                    </div>

                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_first_name">First name</label>
                      <input
                        className="point-mark point-active"
                        type="text"
                        id="user_firstname"
                        name="candidate_first_name"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_last_name">Last name</label>
                      <input
                        className="point-mark point-active"
                        type="text"
                        id="user_lastname"
                        name="candidate_last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_email">Email address</label>
                      <input
                        className="point-mark point-active"
                        type="email"
                        id="user_email"
                        name="candidate_email"
                        placeholder="candidate@demo.com"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_phone">Phone number</label>

                      <PhoneInput
                        className="candidate-phone"
                        value={phone}
                        onChange={setphone}
                        defaultCountry="PK"
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_current_position">
                        Current Position
                      </label>
                      <input
                        className="point-mark point-active"
                        type="text"
                        id="candidate_current_position"
                        name="candidate_current_position"
                        placeholder="React Developer"
                        value={currentPosition}
                        onChange={(e) => setcurrentPosition(e.target.value)}
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_categories">Categories</label>
                      <Select
                        options={cats}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="category"
                        id="category"
                        value={cats.find(
                          (option) => option.value === categories
                        )}
                        onChange={(selectedOption) =>
                          setcategories(selectedOption.value)
                        }
                      />
                    </div>
                    <div className="entryGroup col-md-12">
                      <label htmlFor="candidate_des">Description</label>
                      <ReactQuill
                        value={des}
                        onChange={setdes}
                        placeholder="Enter Job Details..."
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_dob">Date of Birth</label>{" "}
                      <br />
                      <DatePicker
                        selected={dop}
                        onChange={(date) => setdop(date)}
                        className="point-mark datepicker point-active"
                        placeholderText="1998-01-01"
                        dateFormat="yyyy-MM-dd"
                        id="candidate_dob"
                        name="candidate_dob"
                        maxDate={new Date()} // restrict to today and past
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100} // show last 100 years for DOB
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_age">Age</label>
                      <input
                        type="text"
                        value={age}
                        readOnly
                        className="form-control"
                        placeholder="Your age will appear here"
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_gender">Gender</label>
                      <Select
                        options={gender}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="gender"
                        id="gender"
                        value={gender.find(
                          (option) => option.value === GenderIs
                        )}
                        onChange={(selectedOption) =>
                          setGenderIs(selectedOption.value)
                        }
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_languages">Languages</label>
                      <Select
                        options={language}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="language"
                        id="language"
                        value={language.find(
                          (option) => option.value === languages
                        )}
                        onChange={(selectedOption) =>
                          setlanguages(selectedOption.value)
                        }
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_qualification">
                        Qualification
                      </label>
                      <Select
                        options={qualification}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="qualification"
                        id="qualification"
                        value={qualification.find(
                          (option) => option.value === Qualification
                        )}
                        onChange={(selectedOption) =>
                          setQualification(selectedOption.value)
                        }
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_yoe">Years of Experience</label>
                      <Select
                        options={experience}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="experience"
                        id="experience"
                        value={experience.find(
                          (option) => option.value === Experience
                        )}
                        onChange={(selectedOption) =>
                          setExperience(selectedOption.value)
                        }
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_offer_salary">
                        Offer Salary
                      </label>
                      <input
                        className="point-mark point-active"
                        type="number"
                        id="candidate_offer_salary"
                        name="candidate_offer_salary"
                        value={salary}
                        onChange={(e) => setsalary(e.target.value)}
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label>Salary type</label>
                      <Select
                        options={rate}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="rate"
                        id="rate"
                        value={rate.find(
                          (option) => option.value === salaryType
                        )}
                        onChange={(selectedOption) =>
                          setsalaryType(selectedOption.value)
                        }
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label>Currency</label>
                      <Select
                        options={currency}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="currency"
                        id="currency"
                        value={currency.find(
                          (option) => option.value === Currency
                        )}
                        onChange={(selectedOption) =>
                          setCurrency(selectedOption.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="block-from mt12" id="submit_candidate_form">
                  <h6 className="block-heading">Location</h6>
                  <div className="row">
                    <div className="entryGroup col-lg-6">
                      <label>Province</label>
                      <Select
                        options={province}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="province"
                        id="province"
                        value={province.find(
                          (option) => option.value === Province
                        )}
                        onChange={(selectedOption) =>
                          setProvince(selectedOption.value)
                        }
                      />
                    </div>

                    <div className="entryGroup col-lg-6">
                      <label>City</label>
                      <Select
                        options={city}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="city"
                        id="city"
                        value={city.find((option) => option.value === City)}
                        onChange={(selectedOption) =>
                          setCity(selectedOption.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="block-from mt12" id="candidate-submit-social">
                  <h6 className="block-heading">Social Network</h6>
                  <div className="row civi-social-network">
                    <div className="entryGroup col-12 col-sm-6">
                      <label>Linkedin</label>
                      <input
                        type="url"
                        name="candidate_linkedin"
                        className="point-mark point-active"
                        placeholder="linkedin.com/candidate"
                        value={linkedin}
                        onChange={(e) => setlinkedIn(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Control Buttons */}
                <div className="control-btn">
                  <Link
                    to="/candidate/dashboard"
                    className="civi-button button-outline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="civi-button btn-add-to-message"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
            {/* Education */}
            <div
              id="educationTab"
              className={`tab-info ${
                activeTab === "educationTab" ? "active" : ""
              }`}
            >
              <form
                onSubmit={EduSubmit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className="education-info block-from">
                  <h6 className="block-heading">Education</h6>
                  <div className="sub-head mb-5">
                    {CandidateEdu.length > 0 ? (
                      <ul className="saved-entries-list">
                        {CandidateEdu.map((res) => (
                          <li key={res.id}>
                            <strong>{res.degree_title}</strong>
                            {res.field_of_study ? ` — ${res.field_of_study}` : ""}
                            {res.institute_name && <div>{res.institute_name}</div>}
                            <div>
                              {res.start_year || "?"} -{" "}
                              {res.end_year || "Present"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "We recommend at least one education entry."
                    )}
                  </div>

                  <div className="info-wrapper">
                    {eduEntries.map((entry, index) => (
                      <div className="row" key={index}>
                        {index > 0 && (
                          <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-3">
                            <h6 className="education flex-grow-1">
                              Education <span>{index + 1}</span>
                            </h6>
                            <FaTimes
                              style={{ cursor: "pointer" }}
                              onClick={() => removeEntry(setEduEntries, index)}
                            />
                          </div>
                        )}
                        <div className="entryGroup col-md-6">
                          <label>Title</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Title Ex: Bachelor/Mastes/Phd"
                            value={entry.title}
                            onChange={(e) =>
                              updateEntry(setEduEntries, index, "title", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>Field of Study</label>
                          <input
                            type="text"
                            name="field"
                            placeholder="Field Ex: Computer Science"
                            value={entry.field}
                            onChange={(e) =>
                              updateEntry(setEduEntries, index, "field", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>

                        <div className="entryGroup col-md-12">
                          <label>Institute Name</label>
                          <input
                            type="text"
                            name="institute"
                            placeholder="Institute Ex: Riphah International University"
                            value={entry.institute}
                            onChange={(e) =>
                              updateEntry(setEduEntries, index, "institute", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-12">
                          <input
                            type="checkbox"
                            className="custom-checkbox input-control point-mark point-active"
                            name="candidate_education_check[]"
                            defaultValue="present"
                            checked={entry.isPresent}
                            onChange={() =>
                              updateEntry(setEduEntries, index, "isPresent", !entry.isPresent)
                            }
                          />
                          <label className="label-present ms-3">
                            Choose at the present time
                          </label>
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>
                            From <span style={{ color: "red" }}>*</span>
                          </label>
                          <br></br>
                          <input
                            type={entry.from ? "date" : "text"}
                            value={entry.from}
                            onChange={(e) =>
                              updateEntry(setEduEntries, index, "from", e.target.value)
                            }
                            placeholder="From"
                          />
                        </div>
                        <div className="entryGroup col-md-6 present-to">
                          <label>To</label>
                          <br></br>
                          <input
                            type={entry.to ? "date" : "text"}
                            value={entry.to}
                            onChange={(e) =>
                              updateEntry(setEduEntries, index, "to", e.target.value)
                            }
                            placeholder="To"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn-more mb-3"
                      onClick={() => addEntry(setEduEntries, emptyEducation)}
                    >
                      <FaChevronDown className="me-3 mb-1" />
                      Add another education
                    </button>
                  </div>
                </div>
                {/* Control Buttons */}
                <div className="control-btn">
                  <Link
                    to="/candidate/dashboard"
                    className="civi-button button-outline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="civi-button btn-add-to-message"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
            {/* Experience */}
            <div
              id="experienceTab"
              className={`tab-info ${
                activeTab === "experienceTab" ? "active" : ""
              }`}
            >
              <form
                onSubmit={ExperienceSubmit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className="experience-info block-from">
                  <h6 className="block-heading">Experience</h6>
                  <div className="sub-head mb-5">
                    {CandidateExp.length > 0 ? (
                      <ul className="saved-entries-list">
                        {CandidateExp.map((res) => (
                          <li key={res.id}>
                            <strong>{res.job_title}</strong>
                            {res.company_name ? ` — ${res.company_name}` : ""}
                            <div>
                              {res.start_date || "?"} -{" "}
                              {res.end_date || "Present"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "We recommend at least one experience entry."
                    )}
                  </div>
                  <div className="info-wrapper">
                    {expEntries.map((entry, index) => (
                      <div className="row" key={index}>
                        {index > 0 && (
                          <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-3">
                            <h6 className="education flex-grow-1">
                              Experience <span>{index + 1}</span>
                            </h6>
                            <FaTimes
                              style={{ cursor: "pointer" }}
                              onClick={() => removeEntry(setExpEntries, index)}
                            />
                          </div>
                        )}
                        <div className="entryGroup col-md-6">
                          <label>Job Title</label>
                          <input
                            type="text"
                            name="candidate_experience_job"
                            placeholder="Enter Job Title"
                            value={entry.title}
                            onChange={(e) =>
                              updateEntry(setExpEntries, index, "title", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>Company</label>
                          <input
                            type="text"
                            name="candidate_experience_company"
                            placeholder="Enter Company"
                            value={entry.company}
                            onChange={(e) =>
                              updateEntry(setExpEntries, index, "company", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-12">
                          <input
                            type="checkbox"
                            className="custom-checkbox input-control point-mark point-active"
                            name="candidate_experience_check"
                            defaultValue="present"
                            checked={entry.isPresent}
                            onChange={() =>
                              updateEntry(setExpEntries, index, "isPresent", !entry.isPresent)
                            }
                          />
                          <label className="label-present ms-3">
                            Choose at the present time
                          </label>
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>
                            From <span style={{ color: "red" }}>*</span>
                          </label>
                          <br></br>
                          <input
                            type={entry.from ? "date" : "text"}
                            onChange={(e) =>
                              updateEntry(setExpEntries, index, "from", e.target.value)
                            }
                            value={entry.from}
                          />
                        </div>
                        <div className="entryGroup col-md-6 present-to">
                          <label>To</label>
                          <br></br>
                          <input
                            type={entry.to ? "date" : "text"}
                            onChange={(e) =>
                              updateEntry(setExpEntries, index, "to", e.target.value)
                            }
                            value={entry.to}
                          />
                        </div>
                        <div className="entryGroup col-md-12">
                          <label htmlFor="candidate_des">Description</label>

                          <ReactQuill
                            value={entry.description}
                            onChange={(value) =>
                              updateEntry(setExpEntries, index, "description", value)
                            }
                            placeholder="Enter Experience Details..."
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn-more mb-3"
                      onClick={() => addEntry(setExpEntries, emptyExperience)}
                    >
                      <FaChevronDown className="me-3 mb-1" />
                      Add another experience
                    </button>
                  </div>
                </div>
                {/* Control Buttons */}
                <div className="control-btn">
                  <Link
                    to="/candidate/dashboard"
                    className="civi-button button-outline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="civi-button btn-add-to-message"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
            {/* Skills */}
            <div
              id="skillsTab"
              className={`tab-info ${
                activeTab === "skillsTab" ? "active" : ""
              }`}
            >
              <form
                onSubmit={skillsSubmit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className="skills-info block-from">
                  <h6 className="block-heading">Skills</h6>
                  <div className="sub-head mb-5">
                    <label htmlFor="candidate_skills">Selected Skills</label>
                    <br />
                    {CandidateSkills.length > 0 ? (
                      CandidateSkills.map((res) => (
                        <>
                          <span
                            className="badge"
                            style={{
                              color: "white",
                              backgroundColor: "#126ebb",
                              margin: "5px",
                              padding: "6px",
                            }}
                          >
                            {res.candidateSkillName}
                          </span>
                          <a
                            href="#"
                            type="button"
                            onClick={() => RemoveSkills(res.candidateSkillId)}
                          >
                            <img
                              src={RemoveIcon}
                              alt="Remove Skill"
                              width={20}
                              height={20}
                            />
                          </a>
                        </>
                      ))
                    ) : (
                      <p> We recommend at least one skill entry</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="entryGroup col-md-12">
                      <label htmlFor="candidate_skills">Select Skills</label>
                      <Select
                        isMulti
                        options={dbSkills}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="skills"
                        id="skills"
                        value={selectedSkills}
                        onChange={(selectedOptions) =>
                          setSelectedSkills(selectedOptions)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="control-btn">
                  <Link
                    to="/candidate/dashboard"
                    className="civi-button button-outline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="civi-button btn-add-to-message"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
            {/* Projects */}
            <div
              id="projectsTab"
              className={`tab-info ${
                activeTab === "projectsTab" ? "active" : ""
              }`}
            >
              <form
                onSubmit={ProjectSubmit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className="project-info block-from">
                  <h6 className="block-heading">Projects</h6>
                  <div className="sub-head mb-5">
                    {CandidateProj.length > 0 ? (
                      CandidateProj.map((res) => (
                        <div>
                          <h4>Title: {res.title}</h4>
                          Link:{" "}
                          <a href={res.link} target="_blank" rel="noopener noreferrer">
                            Visit
                          </a>{" "}
                          <br />
                          Description:
                          <span
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(res.description),
                            }}
                          ></span>
                        </div>
                      ))
                    ) : (
                      <p>We recommend at least one project entry</p>
                    )}
                  </div>
                  <div className="info-wrapper">
                    {projectEntries.map((entry, index) => (
                      <div className="row" key={index}>
                        {index > 0 && (
                          <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-3">
                            <h6 className="education flex-grow-1">
                              Project <span>{index + 1}</span>
                            </h6>
                            <FaTimes
                              style={{ cursor: "pointer" }}
                              onClick={() => removeEntry(setProjectEntries, index)}
                            />
                          </div>
                        )}
                        <div className="entryGroup col-md-6">
                          <label>Title</label>
                          <input
                            type="text"
                            name="candidate_project_title"
                            placeholder="Name of project"
                            value={entry.title}
                            onChange={(e) =>
                              updateEntry(setProjectEntries, index, "title", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>Link</label>
                          <input
                            type="url"
                            name="candidate_project_link"
                            placeholder="https://yourlink"
                            value={entry.link}
                            onChange={(e) =>
                              updateEntry(setProjectEntries, index, "link", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-12">
                          <label htmlFor="candidate_des">Description</label>
                          <ReactQuill
                            value={entry.description}
                            onChange={(value) =>
                              updateEntry(setProjectEntries, index, "description", value)
                            }
                            placeholder="Enter Experience Details..."
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-more mb-3"
                      onClick={() => addEntry(setProjectEntries, emptyProject)}
                    >
                      <FaChevronDown className="me-3 mb-1" />
                      Add another project
                    </button>
                  </div>
                </div>
                <div className="control-btn">
                  <Link
                    to="/candidate/dashboard"
                    className="civi-button button-outline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="civi-button btn-add-to-message"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
            {/* Awards */}
            <div
              id="awardsTab"
              className={`tab-info ${
                activeTab === "awardsTab" ? "active" : ""
              }`}
            >
              <form
                onSubmit={AwardSubmit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className="awards-info block-from">
                  <h6 className="block-heading">Awards</h6>
                  <div className="sub-head mb-5">
                    {CandidateAwards.length > 0 ? (
                      <ul className="saved-entries-list">
                        {CandidateAwards.map((res) => (
                          <li key={res.id}>
                            <strong>{res.title}</strong>
                            {res.awarded_by ? ` — ${res.awarded_by}` : ""}
                            {res.award_date && res.award_date !== "0000-00-00" && (
                              <div>
                                {new Date(res.award_date)
                                  .toISOString()
                                  .split("T")[0]}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "We recommend at least one award entry"
                    )}
                  </div>
                  <div className="info-wrapper">
                    {awardEntries.map((entry, index) => (
                      <div className="row" key={index}>
                        {index > 0 && (
                          <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-3">
                            <h6 className="education flex-grow-1">
                              Award <span>{index + 1}</span>
                            </h6>
                            <FaTimes
                              style={{ cursor: "pointer" }}
                              onClick={() => removeEntry(setAwardEntries, index)}
                            />
                          </div>
                        )}
                        <div className="entryGroup col-md-4">
                          <label>Title</label>
                          <input
                            type="text"
                            name="candidate_award_title"
                            placeholder="Name of Award"
                            value={entry.title}
                            onChange={(e) =>
                              updateEntry(setAwardEntries, index, "title", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-4">
                          <label>Awarded By</label>
                          <input
                            type="text"
                            name="candidate_award_title"
                            placeholder="Ex: Cisco/IEEE/Google/MircoSoft"
                            value={entry.awardedBy}
                            onChange={(e) =>
                              updateEntry(setAwardEntries, index, "awardedBy", e.target.value)
                            }
                            className="point-mark point-active"
                          />
                        </div>
                        <div className="entryGroup col-md-4">
                          <label>Date Awarded</label>

                          <input
                            type="date"
                            value={entry.dateAwarded}
                            onChange={(e) =>
                              updateEntry(setAwardEntries, index, "dateAwarded", e.target.value)
                            }
                          />
                        </div>
                        <div className="entryGroup col-md-12">
                          <label htmlFor="candidate_des">Description</label>
                          <ReactQuill
                            value={entry.description}
                            onChange={(value) =>
                              updateEntry(setAwardEntries, index, "description", value)
                            }
                            placeholder="Enter Experience Details..."
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-more mb-3"
                      onClick={() => addEntry(setAwardEntries, emptyAward)}
                    >
                      <FaChevronDown className="me-3 mb-1" />
                      Add another award
                    </button>
                  </div>
                </div>
                <div className="control-btn">
                  <Link
                    to="/candidate/dashboard"
                    className="civi-button button-outline"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="civi-button btn-add-to-message"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer mt-5">
        <CanFooter />
      </div>
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",

    border: "0",

    boxShadow: state.isFocused ? "0 0 0 2px transparent" : null,
    "&:hover": { borderColor: "0" },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e6f2ff"
      : state.isFocused
      ? "#e6f2ff"
      : null,
    color: state.isSelected ? "#126ebb" : "#333",
    "&:active": { backgroundColor: "#e6f2ff" },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
};

export default CanProfile;
