import React, { useEffect, useState } from "react";
import { edit, applicant, text, candidate } from "../assets/icons/index.js";

import { CiCamera } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AdFooter, VisitChart, CandidateVisitChart } from "../index.js";
import axios from "axios";

const EmpDashboard = () => {
  const check = sessionStorage.getItem("isLoggedIn");
  const token = sessionStorage.getItem("token");
  const [selectedDays, setSelectedDays] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState([
    { src: edit, num: 0, label: "Total jobs", color: "#b3e5fb" },
    {
      src: applicant,
      num: 0,
      label: "candidates",
      color: "#cabffd",
    },
    { src: text, num: 0, label: "Employees", color: "#febc9c" },
    {
      src: candidate,
      num: 0,
      label: "Total companies",
      color: "#b7e4cb",
    },
  ]);
  useEffect(() => {
    if (!check) navigate("/admin-login");
  });

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const res = await axios.get("http://localhost:9000/DashboardData", {
          headers: {
            "x-access-token": token,
          },
        });
        const fetchedData = res.data;

        const updatedData = [
          {
            src: edit,
            label: "Total jobs",
            color: "#b3e5fb",
            num:
              fetchedData.find((item) => item.label === "Total jobs")?.num || 0,
          },
          {
            src: applicant,
            label: "Candidates",
            color: "#cabffd",
            num:
              fetchedData.find(
                (item) => item.label.toLowerCase() === "candidates"
              )?.num || 0,
          },
          {
            src: text,
            label: "Employees",
            color: "#febc9c",
            num:
              fetchedData.find((item) => item.label === "Employees")?.num || 0,
          },
          {
            src: candidate,
            label: "Total companies",
            color: "#b7e4cb",
            num:
              fetchedData.find((item) => item.label === "Total companies")
                ?.num || 0,
          },
        ];

        setData(updatedData);
      } catch (err) {}
    };

    GetUsers();
  }, []);

  const days = [
    { value: 7, label: "Last 7 Days" },
    { value: 15, label: "Last 15 Days" },
    { value: 30, label: "Last 30 Days" },
  ];

  return (
    <>
      <div className="dashboardWrapper">
        <div className="dashboardPage">
          <h2 className="heading">Welcome back! </h2>

          <ul className="row">
            {data.map((item, index) => (
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
                    <img src={item.src}></img>
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

              <div className="col-md-6 p-3">
                <div className="civi-chart-warpper civi-chart-employer">
                  <div className="chart-header">
                    <h4 className="title-chart">Total Candidates</h4>
                    <div className="form-chart">
                      <Select
                        options={days}
                        styles={customStyles}
                        className="border p-1 rounded-2 text-nowrap mb-2 selectFull"
                        defaultValue={days.find((option) => option.value === 7)}
                      />
                    </div>
                  </div>
                  <div>
                    <CandidateVisitChart days={selectedDays} />
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
