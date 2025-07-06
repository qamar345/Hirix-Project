import React, { useEffect, useState } from "react";
import { edit, applicant, text, candidate } from "../assets/icons/index.js";
import { CiCamera } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { EmpFooter, VisitChart } from "../index.js";
import axios from "axios";
const EmpDashboard = () => {
  const [selectedDays, setSelectedDays] = useState(7);
  const navigate = useNavigate();
  useEffect(() => {
    const check = sessionStorage.getItem("isLoggedIn");
    if (!check) {
      navigate("/");
    }
  }, []);

  // const [data, setData] = useState([
  //   { label: "posted jobs", num: 0 },
  //   { label: "applicants", num: 0 },
  //   { label: "meetings", num: 0 },
  //   { label: "companies", num: 0 },
  // ]);
  const [data, setData] = useState([]);
  const [ColData, setColData] = useState([]);
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    const GetData = async () => {
      if (!id) {
                return;
      }
      try {
        const res = await axios.get(`http://localhost:9000/DashEmpData/${id}`);
        setData(res.data.data);
      } catch (err) {
              }
    };

    GetData();
  }, []);

  useEffect(() => {
    const Data = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/dashDataEmployer/${id}`
        );
                setColData(res.data.data || []);
      } catch (err) {
              }
    };

    Data();
  }, []);
  const days = [
    { value: 7, label: "Last 7 Days" },
    { value: 15, label: "Last 15 Days" },
    { value: 30, label: "Last 30 Days" },
  ];

  const jobMap = new Map();

  ColData.forEach((item) => {
    const key = item.job_title;
    if (!jobMap.has(key)) {
      jobMap.set(key, {
        job_title: key,
        total_applicants: item.total_applicants,
        status: item.status,
        applicants: [],
      });
    }

    const job = jobMap.get(key);
    if (job.applicants.length < 3) {
      job.applicants.push({
        first_name: item.first_name,
        last_name: item.last_name,
        applied_date: item.applied_date,
      });
    }
  });

  const groupedJobs = Array.from(jobMap.values());

  return (
    <>
      <div className="dashboardWrapper">
        <div className="dashboardPage">
          <h2 className="heading">Welcome back! Employer</h2>

          <ul className="row">
            {data?.map((item, index) => {
              const icons = {
                "posted jobs": edit,
                applicants: applicant,
                meetings: text,
                companies: candidate,
              };

              const colors = {
                "posted jobs": "#b3e5fb",
                applicants: "#cabffd",
                meetings: "#febc9c",
                companies: "#b7e4cb",
              };

              return (
                <li className="col-xl-3 p-3 col-sm-6" key={index}>
                  <div className="entryCard d-flex justify-content-between">
                    <div className="entryDetail">
                      <div className="entryTitle">
                        <h3>{item.label}</h3>
                      </div>
                      <div className="entryNumber">
                        <span>{item.num}</span>
                      </div>
                    </div>
                    <div
                      className="entryImg"
                      style={{ background: colors[item.label] }}
                    >
                      <img src={icons[item.label]} alt={item.label} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="notification-dashboard">
            <div className="row ">
              <div className="col-md-7 p-3">
                <div className="civi-chart-warpper civi-chart-employer">
                  <div className="chart-header">
                    <h4 className="title-chart">Applicants</h4>
                    <div className="form-chart">
                      <Select
                        options={days}
                        styles={customStyles}
                        className="border p-1 rounded-2 text-nowrap mb-2 selectFull"
                        defaultValue={days.find((option) => option.value === 7)}
                        onChange={(e) => setSelectedDays(e.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <VisitChart days={selectedDays} />
                  </div>
                </div>
              </div>

              {/* <div className="col-md-5 p-3">
                <div className="applicants-wrap">
                  <h4 className="title-applicants">New applicants</h4>
                   
                  <div className="applicants-innner">
                    {ColData?.map((item,index) => {
                      return (
                    <div className="applicants-heading ">
                      <h3>Sr. Backend Go Developer</h3>
                      <span>56</span>
                    </div>
                    <div className="applicants-content">
                      <div className="image-applicants">
                        <CiCamera />
                      </div>
                      <div className="">
                        <h6>reza123</h6>
                        <p>Applied date: November 9, 2024</p>
                      </div>
                    </div>
                    <div className="applicants-content ">
                      <div className="image-applicants">
                        <CiCamera />
                      </div>
                      <div className="">
                        <p className="align-self-center">
                          Applied date: November 5, 2024
                        </p>
                      </div>
                    </div>
                      )
                   })}
                   </div>
                  <div className="">
                    <div className="applicants-heading ">
                      <h3>Blockchain Engineer</h3>
                      <span>4</span>
                    </div>
                    <div className="applicants-content">
                      <div className="image-applicants">
                        <CiCamera />
                      </div>
                      <div className="">
                        <p>Applied date :September 20, 2024</p>
                      </div>
                    </div>
                    <div className="applicants-content">
                      <div className="image-applicants">
                        <CiCamera />
                      </div>
                      <div className="">
                        <p>Applied date :August 10, 2024</p>
                      </div>
                    </div>
                  </div>
                  <NavLink to="" className={`outlineBtn`}>
                    All applicants
                  </NavLink>
                </div>
              </div> */}
              <div className="col-md-5 p-3">
                <div className="applicants-wrap">
                  <h4 className="title-applicants">New applicants</h4>

                  <div className="applicants-inner">
                    {groupedJobs?.map((job, index) => {
                      if (job.status !== "Applied") return null;

                      const applicantsArray = Array.isArray(job.applicants)
                        ? job.applicants
                        : [];

                      return (
                        <div key={index}>
                          <div className="applicants-heading">
                            <h3>{job.job_title}</h3>
                            <span>{job.total_applicants}</span>
                          </div>
                          {applicantsArray.slice(0, 3).map((applicant, i) => (
                            <div className="applicants-content" key={i}>
                              <div className="image-applicants">
                                <CiCamera />
                              </div>
                              <div>
                                <h6>
                                  {applicant.first_name} {applicant.last_name}
                                </h6>
                                <p>
                                  Applied date:{" "}
                                  {new Date(
                                    applicant.applied_date
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  <NavLink to="/employer/applicants" className="outlineBtn">
                    All applicants
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <EmpFooter />
      </div>
    </>
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

export default EmpDashboard;
