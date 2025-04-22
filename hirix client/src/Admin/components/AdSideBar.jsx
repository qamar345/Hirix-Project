import React from "react";
import {
  hirixText,
  dashboard,
  job,
  applicant,
  candidate,
  employee,
  packages,
  message,
  meeting,
  company,
  setting,
  logout,
} from "../assets/icons/index.js";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const AdSideBar = ({ isCollapsed, handleSidebarToggle }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    alert("LoggedOut Successfully");
    navigate("/admin-login");
  };
  return (
    <>
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
              link: "/admin/dashboard",
            },
            { src: job, alt: "Job", label: "Jobs", link: "/admin/jobs" },

            {
              src: candidate,
              alt: "Candidates",
              label: "Candidates",
              link: "/admin/candidates",
            },
            {
              src: employee,
              alt: "Employees",
              label: "Employees",
              link: "/admin/employees",
            },
            // {
            //   src: packages,
            //   alt: "Package",
            //   label: "Package",
            //   link: "/employer/package",
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
              link: "/admin/company",
            },
            {
              src: candidate,
              alt: "Management",
              label: "Management",
              link: "/admin/user-management",
            },
            {
              src: setting,
              alt: "Settings",
              label: "Settings",
              link: "/admin/settings",
            }, 
            { src: logout, alt: "Logout", label: "Logout", link: "/" },
          ].map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink className="civi-icon-items" onClick={item.label === "Logout" ? handleLogout : null}  to={item.link}>
                <span className="image">
                  <img src={item.src} alt={item.alt} />
                </span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
    </>
  );
};

export default AdSideBar;
