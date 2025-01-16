import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import ReactQuill from "react-quill";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
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
const CanProfile = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [value, setValue] = useState();
  const [activeTab, setActiveTab] = useState("basicInfoTab");
  const [uploadedImage, setUploadedImage] = useState(null);
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
  const cats = [
    { value: "analytics", label: "Analytics" },
    { value: "customerService", label: "Customer Service" },
    { value: "designCreative", label: "Design & Creative" },
    { value: "developmentIT", label: "Development & IT" },
  ];
  const canAge = [
    { value: "`1`", label: "18 - 25" },
    { value: "2", label: "25 - 30" },
    { value: "3", label: "30 - 35" },
    { value: "4", label: "35 - 40" },
    { value: "5", label: "40+" },
  ];
  const gender = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ];
  const language = [
    { value: "1", label: "Urdu" },
    { value: "2", label: "English" },
    { value: "3", label: "Punjabi" },
  ];
  const qualification = [
    { value: "associate", label: "Associate" },
    { value: "bachelor", label: "Bachelor Degree" },
    { value: "certificate", label: "Certificate" },
    { value: "degree", label: "Degree" },
    { value: "doctorate", label: "Doctorate Degree" },
    { value: "master", label: "Master's Degree" },
  ];
  const experience = [
    { value: "1", label: "1-2 Years" },
    { value: "2", label: "3-5 Years" },
    { value: "3", label: "6-9 Years" },
    { value: "4", label: "10+ Years" },
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
    { value: "lhr", label: "Lahore" },
    { value: "rwp", label: "Rawalpindi" },
    { value: "khi", label: "Karachi" },
    { value: "isb", label: "Islamabad" },
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
  const percentage = 78;

  const [checkStatus, setCheckStatus] = useState({
    info: true,
    education: true,
    experience: true,
    skills: true,
    projects: false,
    awards: true,
  });

  const toggleCheck = (key) => {
    setCheckStatus((prevStatus) => ({
      ...prevStatus,
      [key]: !prevStatus[key],
    }));
  };

  const listItems = [
    { id: "info", label: "Basic Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "awards", label: "Awards" },
  ];
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
            <form
              className={`candidate-profile-form form-dashboard  col-lg-8 col-md-7  ${
                isScrolled ? "companyData" : ""
              }`}
            >
              {/* Basic Info */}
              <div
                id="basicInfoTab"
                className={`tab-info ${
                  activeTab === "basicInfoTab" ? "active" : ""
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
                        placeholder="First name"
                        defaultValue="Candidate"
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_last_name">Last name</label>
                      <input
                        className="point-mark point-active"
                        type="text"
                        id="user_lastname"
                        name="candidate_last_name"
                        placeholder="Last name"
                        defaultValue="Demo"
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_email">Email address</label>
                      <input
                        className="point-mark point-active"
                        type="email"
                        id="user_email"
                        name="candidate_email"
                        placeholder="Email"
                        defaultValue="candidate@demo.com"
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_phone">Phone number</label>

                      <PhoneInput
                        className="candidate-phone"
                        value={value}
                        onChange={setValue}
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
                        defaultValue="React Developer"
                        placeholder="Select your current position"
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
                        defaultValue={cats.find(
                          (option) => option.value === "designCreative"
                        )}
                      />
                    </div>
                    <div className="entryGroup col-md-12">
                      <label htmlFor="candidate_des">Description</label>
                      <ReactQuill
                        onChange={handleQuillChange}
                        // placeholder="Enter Job Details..."
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_dob">Date of Birth</label>
                      <input
                        className="point-mark datepicker point-active hasDatepicker"
                        type="text"
                        placeholder="Date of birth"
                        id="candidate_dob"
                        name="candidate_dob"
                        defaultValue="1989-01-01"
                      />
                    </div>
                    <div className="entryGroup col-md-6">
                      <label htmlFor="candidate_age">Age</label>
                      <Select
                        options={canAge}
                        styles={customStyles}
                        className="border p-1 rounded-2"
                        name="age"
                        id="age"
                        defaultValue={canAge.find(
                          (option) => option.value === "2"
                        )}
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
                        defaultValue={gender.find(
                          (option) => option.value === "male"
                        )}
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
                        defaultValue={language.find(
                          (option) => option.value === "2"
                        )}
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
                        defaultValue={qualification.find(
                          (option) => option.value === "master"
                        )}
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
                        defaultValue={experience.find(
                          (option) => option.value === "1"
                        )}
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
                        defaultValue={100000}
                        placeholder="80000"
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
                        defaultValue={rate.find(
                          (option) => option.value === "none"
                        )}
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
                        defaultValue={currency.find(
                          (option) => option.value === "pkr"
                        )}
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
                        defaultValue={province.find(
                          (option) => option.value === "punjab"
                        )}
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
                        defaultValue={city.find(
                          (option) => option.value === "rwo"
                        )}
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
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Education */}
              <div
                id="educationTab"
                className={`tab-info ${
                  activeTab === "educationTab" ? "active" : ""
                }`}
              >
                <div className="education-info block-from">
                  <h6 className="block-heading">Education</h6>
                  <div className="sub-head mb-5">
                    We recommend at least one education entry.
                  </div>

                  <div className="info-wrapper">
                    <div className="row">
                      <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                        <FaTimes />
                        <h6 className="education flex-grow-1">
                          Education <span>1</span>
                        </h6>
                        <FaChevronUp className="" />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="candidate_education_title"
                          placeholder="Enter Title"
                          defaultValue="New York University"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Level of Education</label>
                        <input
                          type="text"
                          name="candidate_education_level"
                          placeholder="Enter Level"
                          defaultValue="Master's"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <input
                          type="checkbox"
                          className="custom-checkbox input-control point-mark point-active"
                          name="candidate_education_check[]"
                          defaultValue="present"
                        />
                        <label className="label-present ms-3">
                          Choose at the present time
                        </label>
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>From</label>
                        <input
                          type="text"
                          className="datepicker point-mark point-active hasDatepicker"
                          placeholder="Starting Date"
                          name="candidate_education_from"
                          defaultValue="2020-06-01"
                          id="fromId"
                        />
                      </div>
                      <div className="entryGroup col-md-6 present-to">
                        <label>To</label>
                        <input
                          type="text"
                          className="datepicker point-mark point-active hasDatepicker"
                          placeholder="Ending Date"
                          name="candidate_education_to"
                          defaultValue="2022-01-01"
                          id="toId"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label>Description</label>
                        <textarea
                          name="candidate_education_description"
                          cols={30}
                          placeholder="Short description"
                          rows={7}
                          className="point-mark point-active"
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
              </div>
              {/* Experience */}
              <div
                id="experienceTab"
                className={`tab-info ${
                  activeTab === "experienceTab" ? "active" : ""
                }`}
              >
                <div className="experience-info block-from">
                  <h6 className="block-heading">Experience</h6>
                  <div className="sub-head mb-5">
                    We recommend at least one experience entry.
                  </div>
                  <div className="info-wrapper">
                    <div className="row">
                      <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                        <FaTimes />
                        <h6 className="education flex-grow-1">
                          Experience <span>1</span>
                        </h6>
                        <FaChevronUp className="" />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Job Title</label>
                        <input
                          type="text"
                          name="candidate_experience_job"
                          placeholder="Enter Job Title"
                          defaultValue="Web Designer"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Company</label>
                        <input
                          type="text"
                          name="candidate_experience_company"
                          placeholder="Enter Company"
                          defaultValue="Alpabe Corporation"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <input
                          type="checkbox"
                          className="custom-checkbox input-control point-mark point-active"
                          name="candidate_experience_check"
                          defaultValue="present"
                        />
                        <label className="label-present ms-3">
                          Choose at the present time
                        </label>
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>From</label>
                        <input
                          type="text"
                          className="datepicker point-mark point-active hasDatepicker"
                          placeholder="Start Date"
                          name="candidate_experience_from"
                          defaultValue="2020-06-06"
                          id="fromId"
                        />
                      </div>
                      <div className="entryGroup col-md-6 present-to">
                        <label>To</label>
                        <input
                          type="text"
                          className="datepicker point-mark point-active hasDatepicker"
                          placeholder="End Date"
                          name="candidate_experience_to"
                          defaultValue="2023-12-01"
                          id="toId"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label>Description</label>
                        <textarea
                          name="candidate_experience_description"
                          cols={30}
                          placeholder="Short description"
                          rows={7}
                          className="point-mark point-active"
                        />
                      </div>
                    </div>

                    <Link type="button" className="btn-more mb-3">
                      <FaChevronDown className="me-3 mb-1" />
                      Add another experience
                    </Link>
                  </div>
                </div>
              </div>
              {/* Skills */}
              <div
                id="skillsTab"
                className={`tab-info ${
                  activeTab === "skillsTab" ? "active" : ""
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
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Projects */}
              <div
                id="projectsTab"
                className={`tab-info ${
                  activeTab === "projectsTab" ? "active" : ""
                }`}
              >
                <div className="project-info block-from">
                  <h6 className="block-heading">Projects</h6>
                  <div className="sub-head mb-5">
                    We recommend at least one project entry
                  </div>
                  <div className="info-wrapper">
                    <div className="row">
                      <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                        <FaTimes />
                        <h6 className="education flex-grow-1">
                          Project <span>1</span>
                        </h6>
                        <FaChevronUp className="" />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="candidate_project_title"
                          placeholder="Name of project"
                          defaultValue="Shopify Ecommerce Theme"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Link</label>
                        <input
                          type="url"
                          name="candidate_project_link"
                          placeholder="https://yourlink"
                          defaultValue="https://github.com"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label>Description</label>
                        <textarea
                          name="candidate_project_description"
                          cols={30}
                          placeholder="Short description"
                          rows={7}
                          className="point-mark point-active"
                        />
                      </div>
                    </div>
                    <Link type="button" className="btn-more mb-3">
                      <FaChevronDown className="me-3 mb-1" />
                      Add another project
                    </Link>
                  </div>
                </div>
              </div>
              {/* Awards */}
              <div
                id="awardsTab"
                className={`tab-info ${
                  activeTab === "awardsTab" ? "active" : ""
                }`}
              >
                <div className="awards-info block-from">
                  <h6 className="block-heading">Awards</h6>
                  <div className="sub-head mb-5">
                    We recommend at least one award entry
                  </div>
                  <div className="info-wrapper">
                    <div className="row">
                      <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                        <FaTimes />
                        <h6 className="education flex-grow-1">
                          Award <span>1</span>
                        </h6>
                        <FaChevronUp className="" />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Title</label>
                        <input
                          type="text"
                          name="candidate_award_title"
                          placeholder="Name of award"
                          defaultValue="First Prize Winner of the U.S"
                          className="point-mark point-active"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>Date awarded</label>
                        <input
                          type="text"
                          className="datepicker point-mark point-active hasDatepicker"
                          placeholder="Award Date"
                          name="candidate_award_date"
                          defaultValue="2020-01-01"
                          id="awardDate"
                        />
                      </div>
                      <div className="entryGroup col-md-12">
                        <label>Description</label>
                        <textarea
                          name="candidate_award_description"
                          cols={30}
                          rows={7}
                          placeholder="Short description"
                          className="point-mark point-active"
                        />
                      </div>
                    </div>
                    <Link type="button" className="btn-more mb-3">
                      <FaChevronDown className="me-3 mb-1" />
                      Add another award
                    </Link>
                  </div>
                </div>
              </div>
              {/* Control Buttons */}
              <div className="control-btn">
                <Link to="" className="civi-button button-outline">
                  Cancel
                </Link>
                <Link className="civi-button btn-add-to-message">Publish</Link>
              </div>
            </form>
            {/* Strength */}
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
