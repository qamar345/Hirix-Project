import React, { useEffect, useState } from "react";
import {
  appliedJobs,
  review,
  text,
  avatarUxper,
  meeting,
} from "../assets/icons/index.js";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { CanFooter, VisitChart } from "../index.js";
import axios from "axios";

const CanDashboard = () => {
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("first_name");

  const [selectedDays, setSelectedDays] = useState(7);
  const navigate = useNavigate();
  useEffect(() => {
    const check = sessionStorage.getItem("isLoggedIn");
    if (!check) {
      navigate("/");
    }
  }, []);
  const [data, setData] = useState([]);
  const [ColData, setColData] = useState([]);
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    const GetData = async () => {
      if (!id) {
        return;
      }
      try {
        const res = await axios.get(
          `https://testserver.hirix.pk/DasboardJobseeker/${id}`,

          {
            withCredentials: true,
          }
        );
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    GetData();
  }, []);
  // useEffect(() => {
  //   const Data = async () => {
  //     try {
  //       const res = await axios.get(
  //         `https://testserver.hirix.pk//${id}`
  //       );
  //           //       setColData(res.data.data || []);
  //     } catch (err) {
  //           //     }
  //   };

  //   Data();
  // }, []);
  const days = [
    { value: 7, label: "07 days" },
    { value: 15, label: "15 days" },
    { value: 30, label: "30 days" },
  ];

  const cardAssets = {
    "Applied jobs": {
      src: appliedJobs,
      color: "#b3e5fb",
    },
    "Expired jobs": {
      src: meeting,
      color: "#fdd9c3",
    },
    reviews: {
      src: review,
      color: "#febc9c",
    },
    "Selected/Hired": {
      src: text,
      color: "#cabffd",
    },
  };

  return (
    <>
      <div className="dashboardWrapper">
        <div className="dashboardPage">
          <h2 className="heading">Welcome back! {name}</h2>

          <ul className="row">
            {data?.map((item, index) => {
              const matchedCard = cardAssets[item.label] || {};
              const src = matchedCard.src;
              const color = matchedCard.color;
              return (
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
                      style={{ background: `${color}` }}
                    >
                      <img src={src} alt={item.label} />
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
                    <h4 className="title-chart">Your Applied Data</h4>
                    <div className="form-chart">
                      <Select
                        options={days}
                        styles={customStyles}
                        className="border rounded-3"
                        defaultValue={days.find((option) => option.value === 7)}
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
              </div> */}
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
