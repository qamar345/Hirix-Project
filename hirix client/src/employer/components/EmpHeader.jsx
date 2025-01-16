import React from "react";
import { FaBars } from "react-icons/fa";
import { EmpSideMenu } from "../index.js";
import { NavLink } from "react-router-dom";
import {employerImg} from '../assets/images/index.js'
const EmpHeader = () => {
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
                <FaBars className=" menu-bars d-block d-lg-none" />
              </a>

              <EmpSideMenu />
            </div>
          </div>

          <div className="right-header px-0 col-auto">
            <div className="profileImg">

              <img src={employerImg} title="Employer" alt="Employer" className=""/>
              <span className="d-none d-md-block">Employer </span>
            </div>

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
  );
};

export default EmpHeader;
