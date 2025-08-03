import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner, FaRegMoneyBillAlt } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { hirixText } from "../assets/icons/index.js";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmpFooter } from "../index.js";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { use } from "react";

const PostJob = () => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  const check = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!check) navigate("/");
  });
  const [title, setTitle] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [category, setCategory] = useState("");
  const [jobtype, setJobType] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [des, setDes] = useState("");
  const [skills, setSkills] = useState([]);
  const [dbskills, setdbSkills] = useState([]);

  const [qual, setQualification] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Gender, setGender] = useState("");
  const [experiences, setExperience] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [Salary, setSalary] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [appliedType, setAppliedType] = useState("");
  const [curr, setCurrency] = useState("");
  const [rateType, setRateType] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [email, setEmail] = useState("");
  const [url, setURL] = useState("");
  const [phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [Province, setProvince] = useState("");
  const [City, setCity] = useState("");
  const [CompanyData, setCompanyData] = useState([]);

  // useEffect(() => {
  //   if (editId && editId !== "new") {
  //     axios
  //       .get(`http://localhost:9000/getjobPost/${editId}`)
  //       .then((res) => {
  //         console.log("Full API Response:", res.data); // ✅ Check the structure

  //         if (Array.isArray(res.data) && res.data.length > 0) {
  //           const data = res.data[0]; // 👈 First object extract karo
  //
  //           setTitle(data.title || "");
  //           setCategory(data.job_category || "");
  //           setJobType(data.job_type || "");
  //           setWorkPlaceType(data.workplaceType || "");
  //           setDes(data.description || "");
  //           setSkills(data.required_skills || []);
  //           setQualification(data.qualification || "");
  //           setQuantity(data.available_seats || "");
  //           setGender(data.gender || "");
  //           setExperience(data.Experience || "");
  //           setCareerLevel(data.career_level || "");
  //           setSalary(data.salary || "");
  //           setCurrency(data.currency || "");
  //           setMinValue(data.minimum_currency || "");
  //           setMaxValue(data.maximum_currency || "");
  //           setEmail(data.Email || "");
  //           setURL(data.Url || "");
  //           setPhone(data.Phone || "");
  //           setCompany(data.company_name || "");
  //           setCity(data.city || "");
  //           setProvince(data.province || "");
  //         } else {
  //             //         }
  //       })
  //       .catch((err) =>   //   }
  // }, [editId]);
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/GetCompanies/${id}`);
        const formattedCompanies = res.data.map((company) => ({
          label: company.name,
          value: company.id,
        }));
        setCompanyData(formattedCompanies);
      } catch (err) {}
    };

    fetchCompany();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      title: title?.trim(),
      Email: email?.trim(),
      job_category: category?.trim(),
      job_type: jobtype?.trim(),
      workplace_type: workPlaceType?.trim(),
      description: des?.trim(),
      required_skills: skills.map((s) => s.value).join(","),
      career_level: careerLevel?.trim(),
      Experience: experiences?.trim(),
      qualification: qual?.trim(),
      available_seats: quantity?.trim(),
      gender: Gender?.trim(),
      expiry_date: expirydate,
      salary: Salary?.trim(),
      currency: curr?.trim(),
      minimum_currency: minValue?.trim(),
      maximum_currency: maxValue?.trim(),
      Rate: rateType?.trim(),
      Url: url?.trim(),
      Phone: phone?.trim(),
      ApplyType: appliedType?.trim(),
      company_name: Company,
      city: City?.trim(),
      province: Province?.trim(),
    };

    try {
      await axios
        .post(`http://localhost:9000/postbyEmployee/${id}`, payload)
        .then((res) => {
          alert(res.data.msg);
          navigate(`/employer/jobs`);
        });
    } catch (error) {}

    // try {
    //         await axios
    //     .post(`http://localhost:9000/postbyEmployee/${id}`, payload)
    //     .then((res) => {
    //       alert(res.data.msg);
    //       navigate(`/employer/jobs`);
    //     })
    //     .catch((err) =>  {
    //     })
  };

  const handledraft = async (e) => {
    e.preventDefault();

    const payload = {
      title: title?.trim(),
      Email: email?.trim(),
      job_category: category?.trim(),
      job_type: jobtype?.trim(),
      workplace_type: workPlaceType?.trim(),
      description: des?.trim(),
      required_skills: skills.map((s) => s.value).join(","),
      career_level: careerLevel?.trim(),
      Experience: experiences?.trim(),
      qualification: qual?.trim(),
      available_seats: quantity?.trim(),
      gender: Gender?.trim(),
      expiry_date: expirydate,
      salary: Salary?.trim(),
      currency: curr?.trim(),
      minimum_currency: minValue?.trim(),
      maximum_currency: maxValue?.trim(),
      Rate: rateType?.trim(),
      Url: url?.trim(),
      Phone: phone?.trim(),
      ApplyType: appliedType?.trim(),
      company_name: Company,
      city: City?.trim(),
      province: Province?.trim(),
    };

    try {
      await axios
        .post(`http://localhost:9000/saveAsDraft/${id}`, payload)
        .then((res) => {
          alert(res.data.msg);
          navigate(`/employer/jobs`);
        });
    } catch (error) {}

    // try {
    //   await axios
    //     .post(`http://localhost:9000/saveAsDraft/${id}`, payload)
    //     .then((res) => {
    //       alert(res.data.msg);
    //       navigate(`/employer/jobs`);
    //     })
    //     .catch((err) =>     } catch (error) {
    //       }
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

  const cats = [
    { value: "analytics", label: "Analytics" },
    { value: "customerService", label: "Customer Service" },
    { value: "designCreative", label: "Design & Creative" },
    { value: "developmentIT", label: "Development & IT" },
  ];

  const type = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
    { value: "Temporary", label: "Temporary" },
    { value: "Volunteer", label: "Volunteer" },
    { value: "Other", label: "Other" },
  ];

  const workType = [
    { value: "Onsite", label: "On-site" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybird" },
  ];

  // const [skills, setSkills] = useState([])

  // const skills = [
  //   { value: "php", label: "PHP" },
  //   { value: "python", label: "Python" },
  //   { value: "webDesign", label: "Web Design" },
  //   { value: "responsiveDesign", label: "Responsive Design" },
  // ];

  const career = [
    { value: "Fresher", label: "Fresher" },
    { value: "Junior", label: "Junior" },
    { value: "Middle", label: "Middle" },
    { value: "Senior", label: "Senior" },
  ];

  const experience = [
    { value: "0", label: "No Experience" },
    { value: "1-2", label: "1-2 Years" },
    { value: "3-5", label: "3-5 Years" },
    { value: "6-9", label: "6-9 Years" },
    { value: "10+", label: "10+ Years" },
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
    { value: "5", label: "5" },
  ];

  const gender = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Both", label: "Both" },
  ];

  const salary = [
    { value: "Range", label: "Range" },
    { value: "Starting", label: "Starting Amount" },
    { value: "Maximum", label: "Maximum Amount" },
    { value: "Negotiable", label: "Negotiable Price" },
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
  const cityName = [
    { value: "Lahore", label: "Lahore" },
    { value: "Rawalpindi", label: "Rawalpindi" },
    { value: "Karachi", label: "Karachi" },
    { value: "Islamabad", label: "Islamabad" },
  ];
  const provinceName = [
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "punjab", label: "Punjab" },
    { value: "sindh", label: "Sindh" },
    { value: "balochistan", label: "Balochistan" },
  ];

  useEffect(() => {
    const GetSkills = async () => {
      try {
        const res = await axios.get("http://localhost:9000/get-skills");
        setdbSkills(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetSkills();
  }, []);

  return (
    <div className="dashboardWrapper addCompany">
      <div className="entry-my-page submit-company-dashboard">
        <form onSubmit={submit} className="form-dashboard">
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
                    <Link to="/employer/dashboard" className="btn-text">
                      Cancel
                    </Link>
                    <Link
                      onClick={handledraft}
                      className="btn-outline d-none d-lg-block"
                    >
                      Save As Draft
                    </Link>
                    <button type="submit" className="btn-normal">
                      <span>Publish</span>
                      <span className="btn-loading">
                        <FaSpinner />
                      </span>
                    </button>
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
                          value={title}
                          placeholder="Name"
                          onChange={(e) => setTitle(e.target.value)}
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
                          id="category"
                          value={
                            cats.find((option) => option.value === category) ||
                            null
                          }
                          onChange={(selectedOption) =>
                            setCategory(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Job type <sup>*</sup>
                        </label>

                        <Select
                          options={type}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="jobtype"
                          value={type.find(
                            (option) => option.value === jobtype || null
                          )}
                          onChange={(selectedOption) =>
                            setJobType(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          WorkPlace type <sup>*</sup>
                        </label>

                        <Select
                          options={workType}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="workplace"
                          value={workType.find(
                            (option) => option.value === workPlaceType || null
                          )}
                          onChange={(selectedOption) =>
                            setWorkPlaceType(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Skills <sup>*</sup>
                        </label>

                        <Select
                          isMulti
                          name="skill"
                          options={dbskills}
                          value={skills}
                          onChange={(selectedOptions) =>
                            setSkills(selectedOptions || [])
                          }
                          className="border p-1 rounded-2"
                          styles={customStyles}
                        />
                      </div>

                      <div className="entryGroup col-md-12">
                        <label className="label-des-company">
                          Description <sup>*</sup>
                        </label>

                        <ReactQuill
                          value={des}
                          onChange={(value) => setDes(value)}
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
                          value={career.find(
                            (option) => option.value === careerLevel || null
                          )}
                          onChange={(selectedOption) =>
                            setCareerLevel(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
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
                          value={experience.find(
                            (option) => option.value === experiences || null
                          )}
                          onChange={(selectedOption) =>
                            setExperience(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
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
                          value={qualification.find(
                            (option) => option.value === qual || null
                          )}
                          onChange={(selectedOption) =>
                            setQualification(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
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
                          value={qty.find(
                            (option) => option.value === quantity || null
                          )}
                          onChange={(selectedOption) =>
                            setQuantity(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
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
                          value={gender.find(
                            (option) => option.value === Gender || null
                          )}
                          onChange={(selectedOption) =>
                            setGender(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Closing date <sup>*</sup>
                        </label>

                        <input
                          type="date"
                          id="expiryDate"
                          name="expiryDate"
                          value={expirydate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
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
                          value={salary.find(
                            (option) => option.value === Salary || null
                          )}
                          onChange={(selectedOption) =>
                            setSalary(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
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
                          value={currency.find(
                            (option) => option.value === curr || null
                          )}
                          onChange={(selectedOption) =>
                            setCurrency(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      {/* Conditionally Rendered Fields */}
                      {Salary === "range" && (
                        <>
                          <div className="entryGroup col-md-6">
                            <label>
                              Minimum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              name="minValue"
                              value={minValue}
                              onChange={(e) => setMinValue(e.target.value)}
                            />
                          </div>
                          <div className="entryGroup col-md-6">
                            <label>
                              Maximum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              name="maxValue"
                              value={maxValue}
                              onChange={(e) => setMaxValue(e.target.value)}
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
                              value={rate.find(
                                (option) => option.value === rateType || null
                              )}
                              onChange={(selectedOption) =>
                                setRateType(
                                  selectedOption ? selectedOption.value : ""
                                )
                              }
                            />
                          </div>
                        </>
                      )}

                      {Salary === "starting" && (
                        <>
                          <div className="entryGroup col-md-6">
                            <label>
                              Minimum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              name="minValue"
                              value={minValue}
                              onChange={(e) => setMinValue(e.target.value)}
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
                              value={rate.find(
                                (option) => option.value === rateType || null
                              )}
                              onChange={(selectedOption) =>
                                setRateType(
                                  selectedOption ? selectedOption.value : ""
                                )
                              }
                            />
                          </div>
                        </>
                      )}

                      {Salary === "maximum" && (
                        <>
                          <div className="entryGroup col-md-6">
                            <label>
                              Maximum <sup>*</sup>
                            </label>
                            <input
                              type="number"
                              name="maxValue"
                              value={maxValue}
                              onChange={(e) => setMaxValue(e.target.value)}
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
                              value={rate.find(
                                (option) => option.value === rateType || null
                              )}
                              onChange={(selectedOption) =>
                                setRateType(
                                  selectedOption ? selectedOption.value : ""
                                )
                              }
                            />
                          </div>
                        </>
                      )}

                      {Salary === "negotiable" && null}
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
                          value={applyType.find(
                            (option) => option.value === appliedType || null
                          )}
                          onChange={(selectedOption) =>
                            setAppliedType(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      {appliedType === "email" && (
                        <div className="entryGroup col-md-6">
                          <label>
                            Job apply email <sup>*</sup>
                          </label>

                          <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            name="text"
                            placeholder="Enter url"
                            value={url}
                            onChange={(e) => setURL(e.target.value)}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                          options={CompanyData}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          name="Company"
                          value={CompanyData.find(
                            (option) => option.value === Company
                          )}
                          onChange={(selectedOption) =>
                            setCompany(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
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
                          name="Province"
                          options={provinceName}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          value={provinceName.find(
                            (option) => option.value === Province || null
                          )}
                          onChange={(selectedOption) =>
                            setProvince(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                          menuPlacement="top"
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>City</label>
                        <Select
                          options={cityName}
                          styles={customStyles}
                          name="City"
                          className="border p-1 rounded-2"
                          value={cityName.find(
                            (option) => option.value === City || null
                          )}
                          onChange={(selectedOption) =>
                            setCity(selectedOption ? selectedOption.value : "")
                          }
                          menuPlacement="top"
                        />
                      </div>
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
                        {CompanyData.title || "Job Title "}
                      </h4>

                      <div className="info-jobs-warpper ">
                        <div className="mb-5">
                          <span>by </span>
                          <span className="name-company">
                            {CompanyData.company_name
                              ? CompanyData.company.label
                              : "Company "}
                          </span>
                          <span> in </span>
                          <span className="cate-about" data-cate="Category">
                            {CompanyData.category
                              ? CompanyData.job_category.label
                              : "Category "}
                          </span>
                        </div>

                        <div className="label-warpper mb-2 d-flex flex-column">
                          <div className="label-type-inner d-inline-block">
                            {CompanyData.jobType &&
                            CompanyData.jobType.length > 0 ? (
                              CompanyData.jobType.map((option, index) => (
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
                                {CompanyData.province
                                  ? CompanyData.province.label
                                  : "Province "}
                              </span>
                              <span> , </span>
                              <span className="location-about">
                                {CompanyData.city
                                  ? CompanyData.city.label
                                  : "City"}
                              </span>
                            </div>
                          </span>
                        </div>
                        {/* Salary Range */}
              {/* {selectedSalary === "range" && (
                          <div className="label label-price">
                            <FaRegMoneyBillAlt />{" "}
                            {currency === "pkr" && <span>PKR </span>}
                            {currency === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {CompanyData.minValue}
                            </span>
                            {" - "}
                            {currency === "pkr" && <span>PKR </span>}
                            {currency === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {CompanyData.maxValue}
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
                            {currency === "pkr" && <span>PKR </span>}
                            {currency === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {CompanyData.minValue}
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
                            {currency === "pkr" && <span>PKR </span>}
                            {currency === "usd" && <span>$</span>}
                            <span className="price-minimum">
                              {CompanyData.maxValue}
                            </span>
                            {" / "}
                            {rateType === "none" && null}
                            {rateType === "hour" && <span>hour</span>}
                            {rateType === "day" && <span>day</span>}
                            {rateType === "week" && <span>week</span>}
                            {rateType === "month" && <span>month</span>}
                          </div>
                        )} */}

              {/* {selectedSalary === "negotiable" && (
                          <div className="label label-price">
                            Negotiable Price
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}
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
