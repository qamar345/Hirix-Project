import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner, FaRegMoneyBillAlt } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { hirixText } from "../assets/icons/index.js";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmpFooter } from "../index.js";
import PhoneInput from "react-phone-number-input";
const PostJob = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState("range");
  const [appliedType, setAppliedType] = useState("email");
  const [currencyType, setCurrencyType] = useState("pkr");
  const [rateType, setRateType] = useState("none");
  const [value, setValue] = useState();
  const handleSalaryChange = (selectedOption) => {
    setSelectedSalary(selectedOption?.value || null);
  };

  const handleAppliedType = (selectedOption) => {
    setAppliedType(selectedOption?.value || null);
  };

  const handleCurrencyType = (selectedOption) => {
    setCurrencyType(selectedOption?.value || null);
  };

  const handleRateType = (selectedOption) => {
    setRateType(selectedOption?.value || null);
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
    minValue: 0,
    maxValue: 0,
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

  const handleMinChange = (e) => {
    setCompanyData((prevData) => ({
      ...prevData,
      minValue: e.target.value,
    }));
  };

  const handleMaxChange = (e) => {
    setCompanyData((prevData) => ({
      ...prevData,
      maxValue: e.target.value,
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
    { value: "1", label: "No Experience" },
    { value: "2", label: "1-2 Years" },
    { value: "3", label: "3-5 Years" },
    { value: "4", label: "6-9 Years" },
    { value: "5", label: "10+ Years" },
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
                  <h4 className=" d-none d-xl-block">Create a job post</h4>

                  <div className="btn-wrapper d-flex gap-4 align-items-center">
                    <Link
                      to="/employer/employer-dashboard"
                      className="btn-text"
                    >
                      Cancel
                    </Link>
                    <Link
                      to="/employer/employer-company"
                      className="btn-outline d-none d-lg-block"
                    >
                      Save As Draft
                    </Link>
                    <Link
                      to="/employer/employer-company"
                      type="submit"
                      className="btn-normal"
                    >
                      <span>Publish</span>
                      <span className="btn-loading">
                        <FaSpinner />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="companyData">
                  <div className="block-from ">
                    <h6 className="block-heading">Basic info</h6>
                    <div className="row">
                      <div className="entryGroup col-md-12">
                        <label htmlFor="company_title">
                          Job title <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          id="company_title"
                          name="title"
                          value={companyData.title}
                          onChange={handleInputChange}
                          placeholder="Name"
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Jobs Categories <sup>*</sup>
                        </label>

                        <Select
                          options={cats}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="category"
                          value={companyData.category}
                          onChange={handleInputCategory}
                          id="category"
                          defaultValue={cats.find(
                            (option) => option.value === "developmentIT"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Job type <sup>*</sup>
                        </label>

                        <Select
                          isMulti
                          options={type}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="jobType"
                          defaultValue={type.find(
                            (option) => option.value === "full"
                          )}
                          value={companyData.jobType}
                          onChange={handleInputJobType}
                          id="jobType"
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Skills <sup>*</sup>
                        </label>

                        <Select
                          isMulti
                          options={skills}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="skills"
                          id="skills"
                          defaultValue={skills.find(
                            (option) => option.value === "webDesign"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-md-12">
                        <label className="label-des-company">
                          Description <sup>*</sup>
                        </label>

                        <ReactQuill
                          value={companyData.description}
                          onChange={handleQuillChange}
                          placeholder="Enter Job Details..."
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Career Level <sup>*</sup>
                        </label>

                        <Select
                          options={career}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          defaultValue={career.find(
                            (option) => option.value === "fresher"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Experience <sup>*</sup>
                        </label>

                        <Select
                          options={experience}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          defaultValue={experience.find(
                            (option) => option.value === "1"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Qualification <sup>*</sup>
                        </label>

                        <Select
                          options={qualification}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          defaultValue={qualification.find(
                            (option) => option.value === "associate"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Quantity to be recruited <sup>*</sup>
                        </label>

                        <Select
                          options={qty}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          defaultValue={qty.find(
                            (option) => option.value === "1"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Gender <sup>*</sup>
                        </label>

                        <Select
                          options={gender}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          defaultValue={gender.find(
                            (option) => option.value === "male"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Closing days <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          id="text"
                          name="text"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12">
                    <h6 className="block-heading">Salary</h6>

                    <div className="row">
                      <div className="entryGroup col-md-6">
                        <label>
                          Show pay by <sup>*</sup>
                        </label>

                        <Select
                          options={salary}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          onChange={handleSalaryChange}
                          defaultValue={salary.find(
                            (option) => option.value === "range"
                          )}
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>
                          Currency <sup>*</sup>
                        </label>

                        <Select
                          options={currency}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          defaultValue={currency.find(
                            (option) => option.value === "pkr"
                          )}
                          onChange={handleCurrencyType}
                        />
                      </div>

                      {/* Conditionally Rendered Fields */}
                      {selectedSalary === "range" && (
                        <>
                          <div className="entryGroup col-md-6">
                            <label>
                              Minimum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              id="min"
                              name="min"
                              value={companyData.minValue}
                              onChange={handleMinChange}
                            />
                          </div>
                          <div className="entryGroup col-md-6">
                            <label>
                              Maximum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              id="max"
                              name="max"
                              value={companyData.maxValue}
                              onChange={handleMaxChange}
                            />
                          </div>
                          <div className="entryGroup col-md-6">
                            <label>
                              Rate <sup>*</sup>
                            </label>

                            <Select
                              options={rate}
                              styles={customStyles}
                              className="border p-1 rounded-2"
                              onChange={handleRateType}
                              defaultValue={rate.find(
                                (option) => option.value === "none"
                              )}
                            />
                          </div>
                        </>
                      )}

                      {selectedSalary === "starting" && (
                        <>
                          <div className="entryGroup col-md-6">
                            <label>
                              Minimum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              id="min"
                              name="min"
                              value={companyData.minValue}
                              onChange={handleMinChange}
                            />
                          </div>
                          <div className="entryGroup col-md-6">
                            <label>
                              Rate <sup>*</sup>
                            </label>

                            <Select
                              options={rate}
                              styles={customStyles}
                              className="border p-1 rounded-2"
                              defaultValue={rate.find(
                                (option) => option.value === "none"
                              )}
                              onChange={handleRateType}
                            />
                          </div>
                        </>
                      )}

                      {selectedSalary === "maximum" && (
                        <>
                          <div className="entryGroup col-md-6">
                            <label>
                              Maximum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              id="max"
                              name="max"
                              value={companyData.maxValue}
                              onChange={handleMaxChange}
                            />
                          </div>
                          <div className="entryGroup col-md-6">
                            <label>
                              Rate <sup>*</sup>
                            </label>

                            <Select
                              options={rate}
                              styles={customStyles}
                              className="border p-1 rounded-2"
                              onChange={handleRateType}
                              defaultValue={rate.find(
                                (option) => option.value === "none"
                              )}
                            />
                          </div>
                        </>
                      )}

                      {selectedSalary === "negotiable" && null}
                    </div>
                  </div>

                  <div className="block-from mt12">
                    <h6 className="block-heading">Job apply type</h6>

                    <div className="row">
                      <div className="entryGroup col-md-6">
                        <label>
                          Select type <sup>*</sup>
                        </label>

                        <Select
                          options={applyType}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          onChange={handleAppliedType}
                          defaultValue={applyType.find(
                            (option) => option.value === "email"
                          )}
                        />
                      </div>

                      {appliedType === "email" && (
                        <div className="entryGroup col-md-6">
                          <label>
                            Job apply email <sup>*</sup>
                          </label>

                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                          />
                        </div>
                      )}
                      {appliedType === "external" && (
                        <div className="entryGroup col-md-6">
                          <label>
                            Job apply external <sup>*</sup>
                          </label>

                          <input
                            type="text"
                            id="text"
                            name="text"
                            placeholder="Enter url"
                          />
                        </div>
                      )}
                      {appliedType === "internal" && null}
                      {appliedType === "call" && (
                        <div className="form-group col-md-6">
                          <label htmlFor="ip_reg_phone" className="label-field">
                            Phone number
                          </label>
                          <PhoneInput
                            className="mt-1"
                            value={value}
                            onChange={setValue}
                            defaultCountry="PK"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="block-from mt12">
                    <h6 className="block-heading">Company</h6>

                    <div className="row">
                      <div className="entryGroup col-md-6">
                        <label>
                          Select company <sup>*</sup>
                        </label>

                        <Select
                          options={company}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="company"
                          value={companyData.company}
                          onChange={handleInputCompany}
                          id="company"
                        />
                      </div>

                      <div className="entryGroup col-md-12 d-flex justify-content-start">
                        <Link to="/employer/add-company" className="btn-text">
                          Create new company
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12" id="company-submit-location">
                    <h6 className="block-heading">Location</h6>
                    <div className="row">
                      <div className="entryGroup col-lg-6">
                        <label>Province</label>
                        <Select
                          name="province"
                          options={province}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          value={companyData.province}
                          onChange={handleInputProvince}
                          id="province"
                          menuPlacement="top"
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>City</label>
                        <Select
                          options={city}
                          styles={customStyles}
                          id="city"
                          name="city"
                          className="border p-1 rounded-2"
                          value={companyData.city}
                          onChange={handleInputCity}
                          menuPlacement="top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-5  text-wrap">
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
                        {/* Salary Range */}
                        {selectedSalary === "range" && (
                          <div className="label label-price">
                            <FaRegMoneyBillAlt />{" "}
                            {currencyType === "pkr" && <span>PKR </span>}
                            {currencyType === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {companyData.minValue}
                              </span>
                              {" - "}
                              {currencyType === "pkr" && <span>PKR </span>}
                            {currencyType === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {companyData.maxValue}
                            </span>
                            {" / "}
                            {rateType === "none" && null}
                            {rateType === "hour" && <span>hour</span>}
                            {rateType === "day" && <span>day</span>}
                            {rateType === "week" && <span>week</span>}
                            {rateType === "month" && <span>month</span>}
                          </div>
                        )}

                        {selectedSalary === "starting" && (
                          <div className="label label-price">
                            <FaRegMoneyBillAlt />
                            {" Minimum: "}
                            {currencyType === "pkr" && <span>PKR </span>}
                            {currencyType === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {companyData.minValue}
                            </span>
                            {" / "}
                            {rateType === "none" && null}
                            {rateType === "hour" && <span>hour</span>}
                            {rateType === "day" && <span>day</span>}
                            {rateType === "week" && <span>week</span>}
                            {rateType === "month" && <span>month</span>}
                          </div>
                        )}

                        {selectedSalary === "maximum" && (
                          <div className="label label-price">
                            <FaRegMoneyBillAlt />
                            {" Maximum: "}
                            {currencyType === "pkr" && <span>PKR </span>}
                            {currencyType === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {companyData.maxValue}
                            </span>
                            {" / "}
                            {rateType === "none" && null}
                            {rateType === "hour" && <span>hour</span>}
                            {rateType === "day" && <span>day</span>}
                            {rateType === "week" && <span>week</span>}
                            {rateType === "month" && <span>month</span>}
                          </div>
                        )}

                        {selectedSalary === "negotiable" && (
                          <div className="label label-price">
                            Negotiable Price
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="footer mt-5">
        <EmpFooter />
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

export default PostJob;
