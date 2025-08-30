import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AdSideMenu } from "../index.js";
import { employerImg } from "../assets/images/index.js";
import { useNavigate } from "react-router-dom";
const AdHeader = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const name = sessionStorage.getItem("name");

  const [imageAdmin, setImageAdmin] = useState(sessionStorage.getItem("image"));

  useEffect(() => {
    if (!check) navigate("/admin-login");
  }, [check, navigate]);

  useEffect(() => {
    const updateImage = () => {
      const newImage = sessionStorage.getItem("image");
      setImageAdmin(newImage);
    };

    window.addEventListener("profileUpdated", updateImage);
    return () => window.removeEventListener("profileUpdated", updateImage);
  }, []);


  
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
                src={`https://testserver.hirix.pk${imageAdmin}`}
                title="Admin"
                alt="Admin"
                className=""
              />
              {name && typeof name === "string" && name.trim() !== "" && name == null && (
                <span className="d-none d-md-block">{name || "Admin"}</span>
              
              )} 
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
