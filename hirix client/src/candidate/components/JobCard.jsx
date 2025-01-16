import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { urgent, featured } from "../assets/icons/index.js";
const JobCard = ({
  id,
  logo,
  title,
  author,
  company,
  timing,
  city,
  salary,
  remainingDays,
  isFeatured,
  isSelected,
  isUrgent,
}) => {
  const customClass = `${isFeatured ? "civi-jobs-featured" : ""} ${
    isSelected ? "active" : ""
  } ${isUrgent ? "civi-jobs-urgent" : ""}`;

  return (
    <div className="content-jobs area-jobs area-archive column-1 ">
      <div id={id} className={`civi-jobs-item layout-list  ${customClass}`}>
        <div className="jobs-archive-header">
          <div className="jobs-header-left">
            <img className="logo-comnpany" src={logo} alt="" />
            <div className="jobs-left-inner">
              <h3 className="jobs-title">
                <NavLink to="">{title}</NavLink>
              </h3>
              <div className="info-company d-flex gap-2 flex-wrap">
                <span>by</span>
                <NavLink to="" className={`authour civi-link-bottom`}>
                  {author}
                </NavLink>
                <span>in</span>
                <div className="categories-warpper">
                  <div className="cate-warpper">
                    <NavLink to="" className={`cate civi-link-bottom`}>
                      {company}
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

            <span>
              <NavLink className="jobIcon">
                <FaRegHeart className="jobIcon" />
              </NavLink>
            </span>
          </div>
        </div>
        <div className="jobs-archive-footer">
          <div className="jobs-footer-left">
            <NavLink to="" className={`label label-type`}>
              {timing}
            </NavLink>

            <NavLink to="" className={`label label-location`}>
              <MdOutlineLocationOn />
              {city}
            </NavLink>

            <div className="label label-price">{salary}</div>
          </div>
          <div className="jobs-footer-right">
            <p className="days">
              <span> {remainingDays} </span>days left to apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
