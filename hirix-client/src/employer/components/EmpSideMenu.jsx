import React from "react";
import { NavLink } from "react-router-dom";
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
const EmpSideMenu = () => {
  // const handleLinkClick = () => {
  //   const offcanvasElement = document.querySelector(".offcanvas");
  //   const bootstrapOffcanvas =
  //     bootstrap.Offcanvas.getInstance(offcanvasElement);
  //   if (bootstrapOffcanvas) {
  //     bootstrapOffcanvas.hide();
  //   }
  // };
  return (
    <div className="mobileNav">
      <div
        className="offcanvas offcanvas-start "
        data-bs-scroll="true"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header border-bottom py-4 px-4">
          <p className="offcanvas-title" id="mobileMenuLabel">
            Employer
          </p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <div className="flex-grow-1 mb-5 pb-3">
            <ul className="d-flex flex-column gap-4">
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
                {
                  src: logout,
                  alt: "Logout",
                  label: "Logout",
                  link: "/",
                },
              ].map((item, index) => (
                <li
                  className="nav-item"
                  key={index}
                  data-bs-dismiss="offcanvas"
                >
                  <NavLink
                    className="canvas-item"
                    to={item.link}
                    // onClick={handleLinkClick}
                  >
                    <span className="canvas-image">
                      <img src={item.src} alt={item.alt} />
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <span data-bs-dismiss="offcanvas">
            <NavLink
              className="civi-button add-job align-self-start"
              to="/employer/post-job"
            >
              Post a job
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmpSideMenu;
