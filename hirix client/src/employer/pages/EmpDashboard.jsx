import React from "react";
import { edit, applicant, text, candidate } from "../assets/icons/index.js";
import { CiCamera } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import { EmpFooter, VisitChart } from "../index.js";
const EmpDashboard = () => {
  const jobAge = [
    { value: "1", label: "07 days" },
    { value: "2", label: "15 days" },
    { value: "3", label: "30 days" },
  ];

  return (
    <>
      <div className="dashboardWrapper">
        <div className="dashboardPage">
          <h2 className="heading">Welcome back! Employer</h2>

          <ul className="row">
            {[
              { src: edit, num: "47", label: "posted jobs", color: "#b3e5fb" },
              {
                src: applicant,
                num: "71",
                label: "applicants",
                color: "#cabffd",
              },
              { src: text, num: "41", label: "meetings", color: "#febc9c" },
              {
                src: candidate,
                num: "7",
                label: "my follow",
                color: "#b7e4cb",
              },
            ].map((item, index) => (
              <li className="col-xl-3 p-3 col-sm-6" key={index}>
                <div className="entryCard d-flex   justify-content-between">
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
                    style={{ background: `${item.color}` }}
                  >
                    <img src={item.src} alt={item.label} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="notification-dashboard">
            <div className="row ">
              <div className="col-md-7 p-3">
                <div className="civi-chart-warpper civi-chart-employer">
                  <div className="chart-header">
                    <h4 className="title-chart">Page views</h4>
                    <div className="form-chart">
                      <Select
                        options={jobAge}
                        styles={customStyles}
                        className="border p-1 rounded-2 text-nowrap mb-2 selectFull"
                        defaultValue={jobAge.find(
                          (option) => option.value === "1"
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <VisitChart/>
                  </div>
                </div>
              </div>

              <div className="col-md-5 p-3">
                <div className="applicants-wrap">
                  <h4 className="title-applicants">New applicants</h4>
                  <div className="applicants-innner">
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
