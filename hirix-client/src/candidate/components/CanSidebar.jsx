import React from "react";
import { showSuccess } from "../../utils/toast";
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
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CanSidebar = ({ isCollapsed, handleSidebarToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
          ].map((item, index) => (
            <li
              className={`nav-item ${
                item.link && location.pathname.startsWith(item.link)
                  ? "active"
                  : ""
              }`}
              key={index}
            >
              <NavLink className="civi-icon-items" to={item.link}>
                <span className="image">
                  <img src={item.src} alt={item.alt} />
                </span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Pinned to the bottom, separate from the scrollable nav list
            above, on both desktop and mobile. */}
        <ul className="list-nav-dashboard sidebar-logout-list">
          <li className="nav-item">
            <a
              className="civi-icon-items"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.clear();
                showSuccess("Logout Successfully");
                navigate("/");
              }}
            >
              <span className="image">
                <img src={logout} alt="Logout" />
              </span>
              {!isCollapsed && <span>Logout</span>}
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CanSidebar;
