import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { MobileNavBar } from "../index.js";
import { hirixText } from "../assets/icons/index.js";
import { NavLink, useLocation } from "react-router-dom";
import Login from "../../userAuthentication/Login.jsx";
import { AdLogin } from "../../Admin/index.js";
const NavbarMenu = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [adModalShow, setAdModalShow] = React.useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin-login") {
      setAdModalShow(true);
    } else {
      setAdModalShow(false);
    }
  }, [location.pathname]);

  return (
    <header className="site-header header-dark">
      <div className="container">
        <div className="row flex-wrap">
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
              {/* <div className="bg-overlay" /> */}
              <MobileNavBar />
            </div>

            <div className="site-logo">
              <NavLink to="/">
                <img src={hirixText} alt="Hirix - Job Portal" />
              </NavLink>
            </div>
          </div>

          <div className="right-header px-0 col-auto">
            <div className="d-none d-xl-block">
              <div className="account logged-out">
                <NavLink
                  className={`btn-login`}
                  type="button"
                  variant="primary"
                  onClick={() => setModalShow(true)}
                >
                  Login
                </NavLink>

                <Login show={modalShow} onHide={() => setModalShow(false)} />
                <AdLogin
                  show={adModalShow}
                  onHide={() => setAdModalShow(false)}
                />
              </div>
            </div>

            <div className="d-xl-none">
              <div className="block-search search-icon civi-ajax-search">
                <div className="icon-search">
                  <GoSearch className="icon" />
                </div>
              </div>
            </div>

            {/* <div className="d-none d-xl-block">
              <NavLink to="" className={`civi-button add-job`}>
                Post a job
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarMenu;
