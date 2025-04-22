import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AdSideMenu } from "../index.js";
import { employerImg } from "../assets/images/index.js";
import { useNavigate } from "react-router-dom";
const AdHeader = () => {
  const check = sessionStorage.getItem("isLoggedIn");
  const firstName = sessionStorage.getItem("FirstName");
  const imageAdmin = sessionStorage.getItem("AdminImage");
  const navigate = useNavigate();
  useEffect(() => {
    if (!check) navigate("/admin-login");
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

              <AdSideMenu />
            </div>
          </div>
         
          <div className="right-header px-0 col-auto">
          {check && (
            <div className="profileImg">
              <img
                // src={employerImg}
                src={`http://localhost:9000${imageAdmin}`}
                title="Admin"
                alt="Admin"
                className=""
              />
              <span className="d-none d-md-block">{firstName}</span>
            </div>
           )}
         
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default AdHeader;
