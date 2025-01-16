import React from "react";
import {
  appliedJobs,
  review,
  text,
  avatarUxper,
  meeting,
} from "../assets/icons/index.js";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { CanFooter, VisitChart } from "../index.js";
const CanDashboard = () => {
  const jobAge = [
    { value: "newest", label: "07 days" },
    { value: "oldest", label: "15 days" },
    { value: "featured", label: "30 days" },
  ];

  return (
    <>
      <div className="dashboardWrapper">
        <div className="dashboardPage">
          <h2 className="heading">Welcome back! Candidate</h2>

          <ul className="row">
            {[
              {
                src: appliedJobs,
                num: "47",
                label: "applied jobs",
                color: "#b3e5fb",
              },
              {
                src: text,
                num: "6",
                label: "my following",
                color: "#cabffd",
              },
              { src: review, num: "6", label: "my reviews ", color: "#febc9c" },
              {
                src: meeting,
                num: "7",
                label: "meetings",
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
                    <h4 className="title-chart">Your Profile Views</h4>
                    <div className="form-chart">
                      <Select
                        options={jobAge}
                        styles={customStyles}
                        className="border rounded-3"
                        defaultValue={jobAge.find(
                          (option) => option.value === "newest"
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <VisitChart />
                  </div>
                </div>
              </div>

              <div className="col-md-5 p-3">
                <div className="applicants-wrap">
                  <h4 className="title-applicants">Recently Applied jobs</h4>

                  <div className="company-header">
                    <div className="img-comnpany">
                      <Link>
                        <img
                          decoding="async"
                          className="logo-comnpany"
                          src={avatarUxper}
                          alt="avatar"
                        />
                      </Link>
                    </div>
                    <div className="info-jobs">
                      <h3 className="title-jobs-dashboard">
                        <Link to="" target="_blank">
                          Sr. Visual Designer
                          <FaExternalLinkAlt className="icon" />
                        </Link>
                      </h3>
                      <div>Design &amp; Creative / Full Time / Boston </div>
                    </div>
                  </div>

                  <div className="company-header">
                    <div className="img-comnpany">
                      <Link>
                        <img
                          decoding="async"
                          className="logo-comnpany"
                          src={avatarUxper}
                          alt="avatar"
                        />
                      </Link>
                    </div>
                    <div className="info-jobs">
                      <h3 className="title-jobs-dashboard">
                        <Link to="" target="_blank">
                          Sr. Visual Designer
                          <FaExternalLinkAlt className="icon" />
                        </Link>
                      </h3>
                      <div>Design &amp; Creative / Full Time / Boston </div>
                    </div>
                  </div>

                  <NavLink to="" className={`outlineBtn`}>
                    All Applied
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <CanFooter />
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

export default CanDashboard;
