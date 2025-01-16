import React from "react";
import {
  hirixText,
  dashboard,
  job,
  applicant,
  candidate,
  packages,
  message,
  meeting,
  company,
  setting,
  logout,
} from "../assets/icons/index.js";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EmpSideBar = ({ isCollapsed, handleSidebarToggle }) => {
  return (
    <aside
      className={` ${isCollapsed ? "asideWrapperCollapsed" : "asideWrapper"}`}
    >
      <div className="nav-dashboard nav-employer_dashboard">
        <div className="sidebar-header px-4">
          {!isCollapsed && (
            <div className="header-wrap">
              <div className="sidebar-logo">
                <NavLink to="/" title="Hirix - Job Portal">
                  <img src={hirixText} alt="Hirix - Job Portal" />
                </NavLink>
              </div>
            </div>
          )}
          <a
            href="#"
            className={` ${isCollapsed ? "smallBtnClose" : "fullBtnClose"}`}
            onClick={handleSidebarToggle}
          >
            <FaArrowLeft className="icon" />
          </a>
        </div>

        <ul className="list-nav-dashboard flex-grow-1">
          {[
            {
              src: dashboard,
              alt: "Dashboard",
              label: "Dashboard",
              link: "/employer/dashboard",
            },
            { src: job, alt: "Job", label: "Jobs", link: "/employer/jobs" },
            {
              src: applicant,
              alt: "Applicants",
              label: "Applicants",
              link: "/employer/applicants",
            },
            // {
            //   src: candidate,
            //   alt: "Candidates",
            //   label: "Candidates",
            //   link: "/employer/candidates",

            // },
            // {
            //   src: packages,
            //   alt: "Package",
            //   label: "Package",
            //   link: "/employer/package",
            // },
            // {
            //   src: message,
            //   alt: "Messages",
            //   label: "Messages",
            //   link: "/employer/messages",
            // },
            // {
            //   src: meeting,
            //   alt: "Meetings",
            //   label: "Meetings",
            //   link: "/employer/meetings",
            // },
            {
              src: company,
              alt: "Company",
              label: "Company",
              link: "/employer/company",
            },
            {
              src: setting,
              alt: "Settings",
              label: "Settings",
              link: "/employer/settings",
            },
            { src: logout, alt: "Logout", label: "Logout", link: "/" },
          ].map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink className="civi-icon-items" to={item.link}>
                <span className="image">
                  <img src={item.src} alt={item.alt} />
                </span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <div className="nav-dashboard-footer mt-5">
            <h4>Post your first job!</h4>
            <p>Your first 2 job postings for just $50 each.</p>
            <NavLink to="/employer/post-job" className="civi-button">
              + Post a job
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};

export default EmpSideBar;
