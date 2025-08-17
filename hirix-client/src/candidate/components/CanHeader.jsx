import React, { useEffect } from "react";
import { candidateImg } from "../assets/images/index.js";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { CanSideMenu } from "../index.js";

const CanHeader = () => {
  const token = sessionStorage.getItem("token");
  const check = sessionStorage.getItem("isLoggedIn");
  const firstName = sessionStorage.getItem("first_name");
  const imageUser = sessionStorage.getItem("image");
  const navigate = useNavigate();
  useEffect(() => {
    if (!check) navigate("/");
  });
  return (
    <header className="site-header">
      <div className="container">
        <div className="row flex-wrap ">
          <div className="left-header px-0 col-auto">
            <div className=" ">
              <a
                href="#"
                className="icon-menu "
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <FaBars className=" menu-bars d-block d-xl-none" />
              </a>
              <CanSideMenu />
              <div className="bg-overlay" />
            </div>
          </div>

          <div className="right-header px-0 col-auto">
            <div className="d-none d-xl-block">
              <div className="account logged-out"></div>
            </div>

            {/* <div className="d-xl-none">
              <div className="block-search search-icon civi-ajax-search">
                <div className="icon-search">
                  <GoSearch className="icon" />
                </div>
              </div>
            </div> */}
            {check && (
              <div className="profileImg">
                <img
                  src={`http://localhost:9000${imageUser}`}
                  title="Candidate"
                  alt="Candidate"
                  className=""
                />
                <span className="d-none d-md-block">{firstName}</span>
              </div>
            )}
            <div className="d-none d-xl-block">
              <NavLink
                to="/candidate/profile"
                className={`civi-button add-job`}
              >
                Update Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CanHeader;
