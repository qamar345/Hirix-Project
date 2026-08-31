import React, { useEffect, useState } from "react";
import API, { BASE_URL } from "../../api";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { AdSideMenu } from "../index.js";
import { useNavigate } from "react-router-dom";
const AdHeader = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const name = sessionStorage.getItem("name");
  const role = sessionStorage.getItem("role");
  const displayName = name && name.trim() !== "" ? name : role || "Admin";

  const [imageAdmin, setImageAdmin] = useState(sessionStorage.getItem("image"));
  const [imageBroken, setImageBroken] = useState(false);

  useEffect(() => {
    if (!check) navigate("/admin-login");
  }, [check, navigate]);

  useEffect(() => {
    const updateImage = () => {
      const newImage = sessionStorage.getItem("image");
      setImageAdmin(newImage);
      setImageBroken(false);
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
              {imageAdmin && !imageBroken ? (
                <img
                  src={`${BASE_URL}${imageAdmin}`}
                  title={displayName}
                  alt={displayName}
                  className=""
                  onError={() => setImageBroken(true)}
                />
              ) : (
                <FaUserCircle className="avatar-icon" title={displayName} />
              )}
              <span className="d-none d-md-block">{displayName}</span>
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
