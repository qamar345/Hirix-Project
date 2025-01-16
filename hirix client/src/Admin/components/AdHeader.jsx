import React from "react";
import { FaBars } from "react-icons/fa";
import { AdSideMenu } from "../index.js";
import { employerImg } from "../assets/images/index.js";
const AdHeader = () => {
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

              <AdSideMenu />
            </div>
          </div>

          <div className="right-header px-0 col-auto">
            <div className="profileImg">
              <img
                src={employerImg}
                title="Admin"
                alt="Admin"
                className=""
              />
              <span className="d-none d-md-block">Admin </span>
            </div>

         
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdHeader;
