import React from "react";
import {
  hirixText,
  dashboard,
  profile,
  job,
  packages,
  review,
  following,
  message,
  meeting,
  setting,
  logout,
} from "../assets/icons/index.js";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

const CanSidebar = ({ isCollapsed, handleSidebarToggle }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    alert("LoggedOut Successfully");
    navigate("/");
  };
  const now = sessionStorage.getItem("Percent");
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
              link: "/candidate/dashboard",
            },
            {
              src: profile,
              alt: "Profile",
              label: "Profile",
              link: "/candidate/profile",
            },
            {
              src: job,
              alt: "My Jobs",
              label: "My Jobs",
              link: "/candidate/jobs",
            },
            // {
            //   src: packages,
            //   alt: "Package",
            //   label: "Package",
            //   link: "/candidate/package",
            // },
            // {
            //   src: review,
            //   alt: "My Reviews",
            //   label: "My Reviews",
            //   link: "/candidate/reviews",
            // },
            // {
            //   src: following,
            //   alt: "My Following",
            //   label: "My Following",
            //   link: "/candidate/following",
            // },
            // {
            //   src: message,
            //   alt: "Messages",
            //   label: "Messages",
            //   link: "/candidate/messages",
            // },
            // {
            //   src: meeting,
            //   alt: "Meetings",
            //   label: "Meetings",
            //   link: "/candidate/meetings",
            // },
            {
              src: setting,
              alt: "Settings",
              label: "Settings",
              link: "/candidate/settings",
            },
            { src: logout, alt: "Logout", label: "Logout", link: "/" },
          ].map((item, index) => (
            <li className="nav-item" key={index}>
              <NavLink className="civi-icon-items" onClick={item.label === "Logout" ? handleLogout : null} to={item.link}>
                <span className="image">
                  <img src={item.src} alt={item.alt} />
                </span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <div className=" mt-5">
            <div className="profile-strength-bar">
              <span className="flex-grow-1">Profile Strength: </span>
              <span> {now} </span>
              <span>%</span>
            </div>
            <div className="profile-progress">
              <ProgressBar now={now} label={`${now}%`} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CanSidebar;
