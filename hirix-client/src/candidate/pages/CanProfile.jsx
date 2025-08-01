import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import ReactQuill from "react-quill";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  FaTimes,
  FaChevronUp,
  FaChevronDown,
  FaCheckCircle,
} from "react-icons/fa";
import { CanFooter } from "../index.js";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import axios from "axios";

const CanProfile = () => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  const [isPresent, setIsPresent] = useState(false);

  const check = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!check) navigate("/");
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
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
  const [title, setTitle] = useState("");
  const [EduLevel, setEduLevel] = useState("");
  const [EduFrom, setEduFrom] = useState(null);
  const [EduTo, setEduTo] = useState(null);
  const [EduDes, setEduDes] = useState("");
  const [jobtitle, setjobTitle] = useState("");
  const [ExpCompany, setExpCompany] = useState("");
  const [ExpFrom, setExpFrom] = useState(null);
  const [ExpTo, setExpTo] = useState(null);
  const [ExpDes, setExpDes] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [ProjectTitle, setProjectTitle] = useState("");
  const [link, setLink] = useState("");
  const [ProjectDes, setProjectDes] = useState("");
  const [AwardTitle, setAwardTitle] = useState("");
  const [dateAwarded, setdateAwarded] = useState(null);
  const [AwardDes, setAwardDes] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [checkStatus, setCheckStatus] = useState({
    info: false,
    education: false,
    experience: false,
    skills: false,
    projects: false,
    awards: false,
  });
  sessionStorage.setItem("Percent", percentage);
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleQuillChange = (value) => {
    setCompanyData((prevData) => ({
      ...prevData,
      description: value,
    }));
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
    axios
      .get(`http://localhost:9000/getProfile/${id}`)
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
      })
      .catch((err) =>   }, []);
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
      const res = await axios.post(
        `http://localhost:9000/postProfile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      alert(res.data.msg);
     window.location.reload();
    } catch (error) {
          }
  };

  const EduSubmit = async (e) => {
    e.preventDefault();
 if (!EduFrom) {
    alert("Please select the 'From' date. It is required.");
    return; // Stop form submission
  }
    const formData = new FormData();

    formData.append("Title", title?.trim());
    formData.append("Level", EduLevel?.trim());
    formData.append("From", EduFrom);
    if (isPresent) {
  formData.append("To", "Present");
} else if (EduTo) {
  formData.append("To", EduTo);
}
    formData.append("Description", EduDes?.trim());

        try {
      const res = await axios.post(
        `http://localhost:9000/AddEducation/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.msg);
     window.location.reload();
    } catch (error) {
          }
  };

  const ExperienceSumit = async (e) => {
    e.preventDefault();

     if (!ExpFrom) {
    alert("Please select the 'From' date. It is required.");
    return; // Stop form submission
  }

    const payload = {
      Title: jobtitle?.trim(),
      Company: ExpCompany?.trim(),
      From: ExpFrom,
      To: isPresent ? "Present" : ExpTo || "",
      Description: ExpDes?.trim(),
    };

    try {
      const res = await axios.post(
        `http://localhost:9000/AddExperience/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(res.data.msg);
     window.location.reload();
    } catch (error) {
          }
  };

  const skillsSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      skills: selectedSkills.map((skill) => skill.label),
    };

    try {
      const res = await axios.post(
        `http://localhost:9000/add-skillset/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
          }
  };

  const ProjectSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Title: ProjectTitle?.trim(),
      Link: link?.trim(),
      Description: ProjectDes?.trim(),
    };

    try {
      const res = await axios.post(
        `http://localhost:9000/AddProject/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(res.data.msg);
     window.location.reload();
    } catch (error) {
          }
  };

  const AwardSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Title: AwardTitle?.trim(),
      date_awarded: dateAwarded,
      Description: AwardDes?.trim(),
    };

    try {
      const res = await axios.post(
        `http://localhost:9000/AddAward/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(res.data.msg);
     window.location.reload();
    } catch (error) {
          }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/profile-status/${id}`
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

  const listItems = [
    { id: "info", label: "Basic Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "awards", label: "Awards" },
  ];
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

        <div className="tab-dashboard">
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

                      <input
                        type="number"
                        className="candidate-phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
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
                      <label htmlFor="candidate_dob">Date of Birth</label>
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
                    We recommend at least one education entry.
                  </div>

                  <div className="info-wrapper">
                    <div className="row">
                      {/* <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                          <FaTimes />
                          <h6 className="education flex-grow-1">
                            Education <span>1</span>
                          </h6>
                          <FaChevronUp className="" />
                        </div> */}
                      <div className="entryGroup col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Enter Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Level of Education</label>
                        <input
                          type="text"
                          name="EduLevel"
                          placeholder="Enter Level"
                          value={EduLevel}
                          onChange={(e) => setEduLevel(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <input
                          type="checkbox"
                          className="custom-checkbox input-control point-mark point-active"
                          name="candidate_education_check[]"
                          defaultValue="present"
                          checked={isPresent}
                          onChange={() => setIsPresent(!isPresent)}
                        />
                        <label className="label-present ms-3">
                          Choose at the present time
                        </label>
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>From <span style={{ color: "red" }}>*</span></label>
                        <br></br>
                        <DatePicker
                          selected={EduFrom}
                          onChange={(date) => setEduFrom(date)}
                          dateFormat="yyyy-MM-dd"
                          className="datepicker point-mark point-active"
                          placeholderText="Starting Date"
                          id="fromId"
                          maxDate={new Date()} // 👈 Prevents selection of future dates
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                      <div className="entryGroup col-md-6 present-to">
                        <label>To</label>
                        <br></br>
                        <DatePicker
                          selected={EduTo}
                          onChange={(date) => setEduTo(date)}
                          dateFormat="yyyy-MM-dd"
                          className="datepicker point-mark point-active"
                          placeholderText="Ending Date"
                          id="toId"
                        />
                      </div>
                      {/* <div className="entryGroup col-md-12">
                          <label>Description</label>
                          <textarea
                            name="candidate_education_description"
                            cols={30}
                            placeholder="Short description"
                            rows={7}
                            className="point-mark point-active"
                          />
                        </div> */}
                      <div className="entryGroup col-md-12">
                        <label htmlFor="candidate_des">Description</label>
                        <ReactQuill
                          value={EduDes}
                          onChange={setEduDes}
                          placeholder="Enter Job Details..."
                        />
                      </div>
                    </div>

                    <Link
                      type="button"
                      className="btn-more mb-3"
                      to="/candidate/add-education"
                    >
                      <FaChevronDown className="me-3 mb-1" />
                      Add another education
                    </Link>
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
                onSubmit={ExperienceSumit}
                className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                  isScrolled ? "companyData" : ""
                }`}
              >
                <div className="experience-info block-from">
                  <h6 className="block-heading">Experience</h6>
                  <div className="sub-head mb-5">
                    We recommend at least one experience entry.
                  </div>
                  <div className="info-wrapper">
                    <div className="row">
                      {/* <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                          <FaTimes />
                          <h6 className="education flex-grow-1">
                            Experience <span>1</span>
                          </h6>
                          <FaChevronUp className="" />
                        </div> */}
                      <div className="entryGroup col-md-6">
                        <label>Job Title</label>
                        <input
                          type="text"
                          name="candidate_experience_job"
                          placeholder="Enter Job Title"
                          value={jobtitle}
                          onChange={(e) => setjobTitle(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Company</label>
                        <input
                          type="text"
                          name="candidate_experience_company"
                          placeholder="Enter Company"
                          value={ExpCompany}
                          onChange={(e) => setExpCompany(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <input
                          type="checkbox"
                          className="custom-checkbox input-control point-mark point-active"
                          name="candidate_experience_check"
                          defaultValue="present"
                           checked={isPresent}
                          onChange={() => setIsPresent(!isPresent)}
                        />
                        <label className="label-present ms-3">
                          Choose at the present time
                        </label>
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>From <span style={{ color: "red" }}>*</span></label>
                        <br></br>
                        <DatePicker
                          selected={ExpFrom}
                          onChange={(date) => setExpFrom(date)}
                          dateFormat="yyyy-MM-dd"
                          className="datepicker point-mark point-active"
                          placeholderText="Start Date"
                          id="fromId"
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                      <div className="entryGroup col-md-6 present-to">
                        <label>To</label>
                        <br></br>
                        <DatePicker
                          selected={ExpTo}
                          onChange={(date) => setExpTo(date)}
                          dateFormat="yyyy-MM-dd"
                          className="datepicker point-mark point-active"
                          placeholderText="End Date"
                          id="fromId"
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label htmlFor="candidate_des">Description</label>
                        <ReactQuill
                          value={ExpDes}
                          onChange={setExpDes}
                          placeholder="Enter Experience Details..."
                        />
                      </div>
                    </div>

                    <Link type="button" className="btn-more mb-3">
                      <FaChevronDown className="me-3 mb-1" />
                      Add another experience
                    </Link>
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
                    We recommend at least one skill entry
                  </div>
                  <div className="row">
                    <div className="entryGroup col-md-12">
                      <label htmlFor="candidate_skills">Select Skills</label>
                      <Select
                        isMulti
                        options={skills}
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
                    We recommend at least one project entry
                  </div>
                  <div className="info-wrapper">
                    <div className="row">
                      {/* <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                          <FaTimes />
                          <h6 className="education flex-grow-1">
                            Project <span>1</span>
                          </h6>
                          <FaChevronUp className="" />
                        </div> */}

                      <div className="entryGroup col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="candidate_project_title"
                          placeholder="Name of project"
                          value={ProjectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Link</label>
                        <input
                          type="url"
                          name="candidate_project_link"
                          placeholder="https://yourlink"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label htmlFor="candidate_des">Description</label>
                        <ReactQuill
                          value={ProjectDes}
                          onChange={setProjectDes}
                          placeholder="Enter Experience Details..."
                        />
                      </div>
                    </div>
                    <Link type="button" className="btn-more mb-3">
                      <FaChevronDown className="me-3 mb-1" />
                      Add another project
                    </Link>
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
                    We recommend at least one award entry
                  </div>
                  <div className="info-wrapper">
                    <div className="row">
                      {/* <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                          <FaTimes />
                          <h6 className="education flex-grow-1">
                            Award <span>1</span>
                          </h6>
                          <FaChevronUp className="" />
                        </div> */}
                      <div className="entryGroup col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="candidate_award_title"
                          placeholder="Name of award"
                          value={AwardTitle}
                          onChange={(e) => setAwardTitle(e.target.value)}
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Date awarded</label>
                        <DatePicker
                          selected={dateAwarded}
                          onChange={(date) => setdateAwarded(date)}
                          dateFormat="yyyy-MM-dd"
                          className="datepicker point-mark point-active"
                          placeholderText="Award Date"
                          id="awardDate"
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label htmlFor="candidate_des">Description</label>
                        <ReactQuill
                          value={AwardDes}
                          onChange={setAwardDes}
                          placeholder="Enter Experience Details..."
                        />
                      </div>
                    </div>
                    <Link type="button" className="btn-more mb-3">
                      <FaChevronDown className="me-3 mb-1" />
                      Add another award
                    </Link>
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
            {/* Strength */}
            <form
              className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                isScrolled ? "companyData" : ""
              }`}
            >
              <div className="candidate-profile-strength col-lg-4 col-md-5 d-none d-md-block">
                <div
                  className="preview-section"
                  data-tooltip-id="progressTooltip"
                >
                  <div className="progress-index">
                    <CircularProgressbarWithChildren
                      className="progressIcon"
                      value={percentage}
                      maxValue={100}
                      strokeWidth={2}
                      styles={{ path: { strokeLinecap: "butt" } }}
                    >
                      <h1>
                        <span>{percentage}</span>
                        <span>%</span>
                      </h1>
                      <div>Profile Strength</div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <Tooltip
                    id="progressTooltip"
                    place="bottom"
                    // content="Hello world! I'm a Tooltip"
                  >
                    <ul className="profile-list-check">
                      {listItems.map((item) => (
                        <li
                          key={item.id}
                          className="profile-check-item"
                          onClick={() => toggleCheck(item.id)} // Toggle state on click
                        >
                          <FaCheckCircle
                            className="progressCheck"
                            style={{
                              color: checkStatus[item.id]
                                ? "var(--civi-color-accent)"
                                : "gray",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              padding: "0",
                            }}
                          />
                          <span>
                            {checkStatus[item.id]
                              ? `${item.label} has enough information`
                              : `${item.label} not enough information`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Tooltip>
                </div>
              </div>
            </form>
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
