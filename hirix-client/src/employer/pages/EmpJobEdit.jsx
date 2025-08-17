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
import "react-phone-number-input/style.css";
import axios from "axios";

const EmpJobEdit = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const editId = sessionStorage.getItem("editJobData");
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
  const [skill, setSkills] = useState([]);
  const [qual, setQualification] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Gender, setGender] = useState("");
  const [experiences, setExperience] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [Salary, setSalary] = useState("");
  const [appliedType, setAppliedType] = useState("");
  const [curr, setCurrency] = useState("");
  const [rateType, setRateType] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [email, setEmail] = useState("");
  const [url, setURL] = useState("");
  const [phone, setPhone] = useState("");
  const [CompanyData, setCompanyData] = useState([]);
  const [Company, setCompany] = useState("");
  const [Province, setProvince] = useState("");
  const [City, setCity] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/GetCompanies/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        const formattedCompanies = res.data.map((company) => ({
          label: company.name,
          value: company.id,
        }));
        setCompanyData(formattedCompanies);
      } catch (err) {}
    };

    fetchCompany();
  }, []);

  useEffect(async () => {
    if (editId && editId !== "new") {
      axios
        .get(`http://localhost:9000/getjobPost/${editId}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {});
    }
  });

  const Submit = async (e) => {
    e.preventDefault();

    const payload = {
      title: title?.trim(),
      Email: email?.trim(),
      job_category: category?.trim(),
      job_type: jobtype?.trim(),
      workplace_type: workPlaceType?.trim(),
      description: des?.trim(),
      required_skills: skill,
      career_level: careerLevel?.trim(),
      Experience: experiences?.trim(),
      qualification: qual?.trim(),
      available_seats: quantity,
      gender: Gender?.trim(),
      expiry_date: expirydate,
      salary: Salary?.trim(),
      currency: curr?.trim(),
      minimum_currency: minValue,
      maximum_currency: maxValue,
      Rate: rateType?.trim(),
      Url: url?.trim(),
      Phone: phone,
      ApplyType: appliedType?.trim(),
      company_name: Company,
      city: City?.trim(),
      province: Province?.trim(),
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/edit-posts/${editId}`,
        payload,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      alert(res.data.msg);
      navigate(`/employer/jobs`);
    } catch (error) {}
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

  const salary = [
    { value: "Range", label: "Range" },
    { value: "Starting", label: "Starting Amount" },
    { value: "Maximum", label: "Maximum Amount" },
    { value: "Negotiable", label: "Negotiable Price" },
  ];
  return (
    <div className="dashboardWrapper addCompany">
      <div className="entry-my-page submit-company-dashboard">
        <form onSubmit={Submit} className="form-dashboard">
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
                    <button type="submit" className="btn-normal">
                      <span>Update</span>
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

                        <input
                          type="text"
                          name="category"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Job type <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          name="jobtype"
                          value={jobtype}
                          onChange={(e) => setJobType(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          WorkPlace type <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          name="workplace"
                          value={workPlaceType}
                          onChange={(e) => setWorkPlaceType(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Skills <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          name="skill"
                          value={skill}
                          onChange={(e) => setSkills(e.target.value)}
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

                        <input
                          type="text"
                          value={careerLevel}
                          onChange={(e) => setCareerLevel(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Experience <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          value={experiences}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Qualification <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          value={qual}
                          onChange={(e) => setQualification(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Quantity to be recruited <sup>*</sup>
                        </label>

                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>
                          Gender <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          value={Gender}
                          onChange={(e) => setGender(e.target.value)}
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

                        <input
                          type="text"
                          value={curr}
                          onChange={(e) => setCurrency(e.target.value)}
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
                              Rate (per month/ per week/ per day) <sup>*</sup>
                            </label>

                            <input
                              type="text"
                              value={rateType}
                              onChange={(e) => setRateType(e.target.value)}
                            />
                          </div>
                        </>
                      )}

                      {/* {/* {Salary === "starting" && (
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
                      )} */}

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

                      {Salary === "negotiable" && null}
                    </div>
                  </div>

                  <div className="block-from mt12">
                    <h6 className="block-heading">Job apply type</h6>

                    <div className="row">
                      <div className="entryGroup col-md-6">
                        <label>
                          Select type (by email/by internal/ by phone/ by
                          external) <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          value={appliedType}
                          onChange={(e) => setAppliedType(e.target.value)}
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
                            value={phone?.toString() || ""}
                            onChange={setPhone}
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

                        {Array.isArray(CompanyData) && (
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
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12" id="company-submit-location">
                    <h6 className="block-heading">Location</h6>
                    <div className="row">
                      <div className="entryGroup col-lg-6">
                        <label>Province</label>
                        <input
                          name="Province"
                          type="text"
                          value={Province}
                          onChange={(e) => setProvince(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>City</label>
                        <input
                          type="text"
                          name="City"
                          value={City}
                          onChange={(e) => setCity(e.target.value)}
                        />
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

export default EmpJobEdit;
