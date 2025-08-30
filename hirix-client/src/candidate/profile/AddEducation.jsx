import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner, FaCheckCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { hirixText } from "../assets/icons/index.js";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTimes, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { CanFooter } from "../index.js";
const AddEducation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState("range");

  const handleSalaryChange = (selectedOption) => {
    setSelectedSalary(selectedOption?.value || null);
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

  const [companyData, setCompanyData] = useState({
    title: "",
    city: null,
    province: null,
    company: null,
    description: "",
    logo: null,
    category: null,
    jobType: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputCompany = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      company: selectedOption,
    }));
  };

  const handleInputJobType = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      jobType: selectedOption,
    }));
  };

  const handleInputCategory = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      category: selectedOption,
    }));
  };

  const handleInputCity = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      city: selectedOption,
    }));
  };

  const handleInputProvince = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      province: selectedOption,
    }));
  };

  const handleQuillChange = (value) => {
    setCompanyData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const cats = [
    { value: "analytics", label: "Analytics" },
    { value: "customerService", label: "Customer Service" },
    { value: "designCreative", label: "Design & Creative" },
    { value: "developmentIT", label: "Development & IT" },
  ];

  const type = [
    { value: "full", label: "Full Time" },
    { value: "intern", label: "Internship" },
    { value: "part", label: "Part Time" },
    { value: "remote", label: "Remote" },
  ];

  const skills = [
    { value: "php", label: "PHP" },
    { value: "python", label: "Python" },
    { value: "webDesign", label: "Web Design" },
    { value: "responsiveDesign", label: "Responsive Design" },
  ];

  const career = [
    { value: "fresher", label: "Fresher" },
    { value: "junior", label: "Junior" },
    { value: "middle", label: "Middle" },
    { value: "senior", label: "Senior" },
  ];

  const experience = [
    { value: "12", label: "1-2 Years" },
    { value: "35", label: "3-5 Years" },
    { value: "69", label: "6-9 Years" },
    { value: "10", label: "10+ Years" },
  ];

  const qualification = [
    { value: "associate", label: "Associate" },
    { value: "bachelor", label: "Bachelor Degree" },
    { value: "certificate", label: "Certificate" },
    { value: "degree", label: "Degree" },
    { value: "doctorate", label: "Doctorate Degree" },
    { value: "master", label: "Master's Degree" },
  ];

  const qty = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const gender = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ];

  const salary = [
    { value: "range", label: "Range" },
    { value: "starting", label: "Starting Amount" },
    { value: "maximum", label: "Maximum Amount" },
    { value: "negotiable", label: "Negotiable Price" },
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

  const applyType = [
    { value: "email", label: "By email" },
    { value: "external", label: "External Apply" },
    { value: "internal", label: "Internal Apply" },
    { value: "call", label: "Call To Apply" },
  ];

  const company = [
    { value: "none", label: "None" },
    { value: "hirix", label: "Hirix" },
  ];

  const nums = [
    { value: "lhr", label: "Lahore" },
    { value: "rwp", label: "Rawalpindi" },
    { value: "khi", label: "Karachi" },
    { value: "isb", label: "Islamabad" },
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

  return (
    <div className="dashboardWrapper addCompany">
      <div className="entry-my-page submit-company-dashboard">
        <form action="#" className="form-dashboard">
          <div className="content-company">
            <div className="row ">
              <div className="col-lg-8 col-md-7 entry-section ">
                <div
                  className={`d-flex active justify-content-xl-between align-items-center justify-content-center px-3 pt-5 pb-4 my-4 ${
                    isScrolled ? "companyHeader" : ""
                  }`}
                >
                  <h4 className=" d-none d-xl-block">Education</h4>

                  <div className="btn-wrapper d-flex gap-4 align-items-center">
                    {/* <Link
                      to="/candidate/profile"
                      className="btn-text"
                    >
                      Cancel
                    </Link> */}
                    <Link to="/candidate/profile" className="btn-outline">
                      Draft
                    </Link>
                    <Link
                      to="/candidate/profile"
                      type="submit"
                      className="btn-normal"
                    >
                      <span>Save</span>
                      <span className="btn-loading">
                        <FaSpinner />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="companyData">
                  <div className="education-info block-from">
                    <h6 className="block-heading">Education</h6>
                    <div className="sub-head mb-5">
                      {/* We recommend at least one education entry. */}
                    </div>

                    <div className="info-wrapper">
                      <div className="row">
                        <div className="col-md-12 d-flex gap-2 mb-2 border-bottom pb-3 mb-5">
                          <FaTimes />
                          <h6 className="education flex-grow-1">
                            {/* Education <span>1</span> */}
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

                      {/* <Link
                        type="button"
                        className="btn-more mb-3"
                        to="/candidate/add-education"
                      >
                        <FaChevronDown className="me-3 mb-1" />
                        Add another education
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-4 col-md-5  text-wrap">
                <div
                  className={`widget-area-init  ${
                    isScrolled ? "preview-section" : ""
                  }`}
                >
                  <h3 className="title-jobs-about">About this job</h3>
                  <div className="about-company-dashboard block-archive-sidebar">
                    <div className="  d-flex flex-column align-items-start gap-4">
                      <div className="img-preview">
                        <img src={hirixText} alt="Hirix" />
                      </div>
                      <h4 className="title-about">
                        {companyData.title || "Job Title "}
                      </h4>

                      <div className="info-jobs-warpper ">
                        <div className="mb-5">
                          <span>by </span>
                          <span className="name-company">
                            {companyData.company
                              ? companyData.company.label
                              : "Company "}
                          </span>
                          <span> in </span>
                          <span className="cate-about" data-cate="Category">
                            {companyData.category
                              ? companyData.category.label
                              : "Category "}
                          </span>
                        </div>

                        <div className="label-warpper mb-2 d-flex flex-column">
                          <div className="label-type-inner d-inline-block">
                            {companyData.jobType &&
                            companyData.jobType.length > 0 ? (
                              companyData.jobType.map((option, index) => (
                                <div key={index} className="label label-type">
                                  {option.label}
                                </div>
                              ))
                            ) : (
                              <div className="label label-type">Job Type</div>
                            )}
                          </div>

                          <span className="label-location-inner mt-2 d-inline-block">
                            <div className="label label-location">
                              <PiMapPin className="me-2  mb-1" />
                              <span className="location-about ">
                                {companyData.province
                                  ? companyData.province.label
                                  : "Province "}
                              </span>
                              <span> , </span>
                              <span className="location-about">
                                {companyData.city
                                  ? companyData.city.label
                                  : "City"}
                              </span>
                            </div>
                          </span>
                        </div>
                        <div className="label label-price">
                          <span>
                            <FaRegMoneyBillAlt />
                          </span>
                          Minimum:<span className="salary-currency">$</span>
                          <span className="price-minimum">5,567</span> /
                          <span className="salary-rate">hour</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </form>
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

export default AddEducation;
