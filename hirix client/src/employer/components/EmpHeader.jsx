import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { EmpSideMenu } from "../index.js";
import { NavLink, useNavigate } from "react-router-dom";
import { employerImg } from "../assets/images/index.js";

const EmpHeader = () => {
  const check = sessionStorage.getItem("isLoggedIn");
  const firstName = sessionStorage.getItem("first_name");
  const Img = sessionStorage.getItem("image");
  const navigate = useNavigate();

  useEffect(() => {
    if (!check) navigate("/");
  });
  return (
    <>
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
                  <FaBars className=" menu-bars d-block d-lg-none" />
                </a>

                <EmpSideMenu />
              </div>
            </div>

            <div className="right-header px-0 col-auto">
              {check && (
                <div className="profileImg">
                  <img
                    src={`http://localhost:9000${Img}`}
                    title="Employer"
                    alt="Employer"
                    className=""
                  />
                  <span className="d-none d-md-block">{firstName}</span>
                </div>
              )}
              <div className="d-none d-xl-block">
                <NavLink
                  to="/employer/post-job"
                  className={`civi-button add-job`}
                >
                  Post a job
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default EmpHeader;
