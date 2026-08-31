import React, { useEffect, useState } from "react";
import API, { BASE_URL } from "../../api";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { EmpSideMenu } from "../index.js";
import { NavLink, useNavigate } from "react-router-dom";

const EmpHeader = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(sessionStorage.getItem("first_name"));
  const [Img, setImg] = useState(sessionStorage.getItem("image"));
  const [imageBroken, setImageBroken] = useState(false);
  const check = sessionStorage.getItem("isLoggedIn");
const [refreshKey, setRefreshKey] = useState(0);
  // redirect if not logged in
  useEffect(() => {
    if (!check) navigate("/");
  }, [check, navigate]);

  // Listen for profile updates
useEffect(() => {
  const handleProfileUpdate = () => {
    setFirstName(sessionStorage.getItem("first_name"));
    setImg(sessionStorage.getItem("image"));
    setImageBroken(false);
    setRefreshKey(prev => prev + 1);
  };

  window.addEventListener("profileUpdated", handleProfileUpdate);
  return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
}, []);



  return (
    <header className="site-header">
      <div className="container">
        <div className="row flex-wrap">
          <div className="left-header px-0 col-auto">
            <a
              href="#"
              className="icon-menu"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
              aria-controls="mobileMenu"
            >
              <FaBars className="menu-bars d-block d-lg-none" />
            </a>
            <EmpSideMenu />
          </div>

          <div className="right-header px-0 col-auto">
            {check && (
              <div key={refreshKey} className="profileImg">
                {Img && !imageBroken ? (
                  <img
                    src={`${BASE_URL}${Img}`}
                    title="Employer"
                    alt="Employer"
                    className=""
                    onError={() => setImageBroken(true)}
                  />
                ) : (
                  <FaUserCircle className="avatar-icon" title="Employer" />
                )}
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
  );
};

export default EmpHeader;
