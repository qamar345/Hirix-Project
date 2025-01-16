import React from "react";
import { edit, applicant, text, candidate } from "../assets/icons/index.js";
import { CiCamera } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import { AdFooter, VisitChart } from "../index.js";
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
          <h2 className="heading">Welcome back! Admin</h2>

          <ul className="row">
            {[
              { src: edit, num: "47", label: "total jobs", color: "#b3e5fb" },
              {
                src: applicant,
                num: "71",
                label: "candidates",
                color: "#cabffd",
              },
              { src: text, num: "41", label: "new companies", color: "#febc9c" },
              {
                src: candidate,
                num: "7",
                label: "approved companies",
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
              <div className="col-md-6 p-3">
                <div className="civi-chart-warpper civi-chart-employer">
                  <div className="chart-header">
                    <h4 className="title-chart">Total Companies</h4>
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

              <div className="col-md-6 p-3">
                <div className="civi-chart-warpper civi-chart-employer">
                  <div className="chart-header">
                    <h4 className="title-chart">Total Candidates</h4>
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

           

            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <AdFooter />
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
