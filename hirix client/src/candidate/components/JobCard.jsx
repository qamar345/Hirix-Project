import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { urgent, featured } from "../assets/icons/index.js";
import { Pagination } from "../index.js";

const JobCard = ({
  id,
  images,
  title,
  employer_username,
  company_name,
  job_type,
  city,
  minimum_currency,
  expiry_date,
  isFeatured,
  isSelected,
  isUrgent,
  onClick,
  fromShare = false 
}) => {
  const customClass = `${isFeatured ? "civi-jobs-featured" : ""} ${
    isSelected ? "active" : ""
  } ${isUrgent ? "civi-jobs-urgent" : ""}`;
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [sharedHighlight, setSharedHighlight] = useState(false);
  const handleWishlist = async () => {
    if (!check) {
      alert("Please Login First!");
      navigate("/");
    } else {
      try {
        const userid = sessionStorage.getItem("id");
        const res = await axios.post(
          `http://localhost:9000/addWishlist/${userid}`,
          null,
          {
            params: { job_id: id },
          }
        );

        if (res.data.msg) {
          alert(res.data.msg);
        } else {
          alert("please try again.");
        }
      } catch (error) {
        alert("Error");
      }
    }
  };
 useEffect(() => {
  if (fromShare) {
    setSharedHighlight(true);
    const timer = setTimeout(() => setSharedHighlight(false), 5000);
    return () => clearTimeout(timer);
  }
}, [fromShare]);
  return (
    <div className="content-jobs area-jobs area-archive column-1" >
      <div
        id={id}
        className={`civi-jobs-item layout-list  ${customClass}`}
        onClick={onClick}
        // style={{ cursor: "pointer" }}
        style={
    sharedHighlight
      ? {
          border: "2px solid #ff9800",
          boxShadow: "0 0 15px rgba(255, 152, 0, 0.5)",
          backgroundColor: "#fff7e6",
          transition: "all 0.5s ease-in-out",
        }
      : {} }
      >
        <div className="jobs-archive-header">
          <div className="jobs-header-left">
            <img
              className="logo-comnpany"
              src={`http://localhost:9000${images}`}
              alt=""
            />
            <div className="jobs-left-inner">
              <h3 className="jobs-title">
                <NavLink to="">{title}</NavLink>
              </h3>
              <div className="info-company d-flex gap-2 flex-wrap">
                <span>by</span>
                <NavLink to="" className={`authour civi-link-bottom`}>
                  {employer_username}
                </NavLink>
                <span>in</span>
                <div className="categories-warpper">
                  <div className="cate-warpper">
                    <NavLink to="" className={`cate civi-link-bottom`}>
                      {company_name}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="jobs-header-right gap-2">
            {isFeatured && (
              <span className="jobIcon">
                <img
                  src={featured}
                  alt="Featured"
                  title="Featured"
                  className="jobIcon"
                />
              </span>
            )}
            {isUrgent && (
              <span className="jobIcon">
                <img
                  src={urgent}
                  alt="Urgent"
                  title="Urgent"
                  className="jobIcon"
                />
              </span>
            )}

            {/* <span>
              <NavLink className="jobIcon" to="#"  >
                <FaRegHeart className="jobIcon" onClick={handleWishlist}/>
              </NavLink>
            </span> */}
          </div>
        </div>
        <div className="jobs-archive-footer">
          <div className="jobs-footer-left">
            <NavLink to="" className={`label label-type`}>
              {job_type}
            </NavLink>

            <NavLink to="" className={`label label-location`}>
              <MdOutlineLocationOn />
              {city}
            </NavLink>

            <div className="label label-price">
              {" "}
              starting from {minimum_currency}
            </div>
          </div>
          <div className="jobs-footer-right">
            <p className="days">
              Apply Before:{" "}
              <span>
                {new Date(expiry_date).toLocaleDateString("en-CA", {
                  timeZone: "Asia/Karachi",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="page-list">
        <Pagination />
      </div>
    </div>
  );
};

export default JobCard;
