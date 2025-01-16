import React from "react";
import { NavLink } from "react-router-dom";
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
const CanSideMenu = () => {
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
            Candidate
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
                <li className="nav-item" key={index}
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
        </div>
      </div>
    </div>
  );
};

export default CanSideMenu;
