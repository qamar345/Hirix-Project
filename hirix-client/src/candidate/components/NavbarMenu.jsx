import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { MobileNavBar } from "../index.js";
import { hirixText } from "../assets/icons/index.js";
import { NavLink, useLocation } from "react-router-dom";
import Login from "../../userAuthentication/Login.jsx";
import { AdLogin } from "../../Admin/index.js";
import { FaChevronDown } from "react-icons/fa";
import { dashboard, logout } from "../assets/icons/index.js";

const NavbarMenu = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [adModalShow, setAdModalShow] = React.useState(false);
  const [user, setUser] = useState({
    name: "",
    photoURL: "",
    role: "",
  });
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (location.pathname === "/admin-login") {
      setAdModalShow(true);
    } else {
      setAdModalShow(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const updateProfileData = () => {
      const username = sessionStorage.getItem("first_name");
      const images = sessionStorage.getItem("image");
      const role = sessionStorage.getItem("role");
      const baseURL = "http://localhost:9000";
      const imageURL = images ? baseURL + images : null;

      if (username && images) {
        setUser({ name: username, photoURL: imageURL, role });
      }
    };

    updateProfileData(); // on first load

    window.addEventListener("profileUpdated", updateProfileData);

    return () =>
      window.removeEventListener("profileUpdated", updateProfileData);
  }, []);

  return (
    <header className="site-header header-dark">
      <div className="container">
        <div className="row flex-wrap">
          <div className="left-header px-0 col-auto">
            {/* <div className=" ">
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
              <div className="bg-overlay" />
              <MobileNavBar />
            </div> */}

            <div className="site-logo">
              <NavLink to="/">
                <img src={hirixText} alt="Hirix - Job Portal" />
              </NavLink>
            </div>
          </div>

          <div className="right-header px-0 col-auto">
            <div className="d-none d-xl-block">
              <div className="account logged-out">
                {user?.name ? (
                  <div
                    className="profile d-flex align-items-center "
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={user.photoURL}
                      // alt={user.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    <span>{user.name}</span>
                    <FaChevronDown
                      style={{ marginLeft: "8px", fontSize: "14px" }}
                    />

                    {showDropdown && (
                      <div
                        className="dropdown-menu show"
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          background: "white",
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
                          padding: "5px",
                          fontSize: "14px",
                        }}
                      >
                        <NavLink
                          to={`/${
                            user?.role === "jobseeker"
                              ? "candidate"
                              : user?.role === "employee"
                              ? "employer"
                              : "dashboard"
                          }/dashboard`}
                          className="dropdown-item"
                          style={{
                            display: "block",
                            padding: "5px 10px",
                            color: "#334",
                            textDecoration: "none",
                          }}
                        >
                          <img src={dashboard} alt="" /> &nbsp; Dashboard
                        </NavLink>

                        <div
                          className="dropdown-item"
                          onClick={() => {
                            sessionStorage.clear();
                            setUser({ name: "", photoURL: "", role: "" }); // <-- reset user state
                            window.location.reload();
                          }}
                          style={{
                            marginLeft: "7px",
                            display: "block",
                            padding: "2px 5px",
                            color: "#333",
                            cursor: "pointer",
                          }}
                        >
                          <img src={logout} alt="" /> &nbsp; Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <NavLink
                      className={`btn-login mr-3`}
                      type="button"
                      variant="dark"
                      onClick={() => setModalShow(true)}
                    >
                      Login
                    </NavLink>

                    <Login
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <AdLogin
                      show={adModalShow}
                      onHide={() => setAdModalShow(false)}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="d-xl-none">
              <div className="block-search search-icon civi-ajax-search">
                <div className="icon-search">
                  {user?.name ? (
                    <div
                      className="profile d-flex align-items-center "
                      onClick={() => setShowDropdown(!showDropdown)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* <img
                        src={user.photoURL}
                        // alt={user.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      /> */}
                      <span style={{ marginLeft: "-35px" }}>{user.name}</span>
                      <FaChevronDown
                        style={{ marginLeft: "8px", fontSize: "14px" }}
                      />

                      {showDropdown && (
                        <div
                          className="dropdown-menu show"
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            background: "white",
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
                            paddingRight: "20px",
                            fontSize: "14px",
                          }}
                        >
                          <NavLink
                            to={`/${
                              user?.role === "jobseeker"
                                ? "candidate"
                                : user?.role === "employee"
                                ? "employer"
                                : "dashboard"
                            }/dashboard`}
                            className="dropdown-item"
                            style={{
                              display: "block",
                              padding: "5px 10px",
                              color: "#334",
                              textDecoration: "none",
                            }}
                          >
                            <img src={dashboard} alt="" /> &nbsp; Dashboard
                          </NavLink>

                          <div
                            className="dropdown-item"
                            onClick={() => {
                              sessionStorage.clear();
                              setUser({ name: "", photoURL: "", role: "" }); // <-- reset user state
                              window.location.reload();
                            }}
                            style={{
                              display: "block",
                              padding: "5px 10px",
                              color: "#333",
                              cursor: "pointer",
                            }}
                          >
                            <img src={logout} alt="" /> &nbsp; Logout
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <NavLink
                        className={`btn-login`}
                        style={{ marginLeft: "-15px" }}
                        type="button"
                        variant="primary"
                        onClick={() => setModalShow(true)}
                      >
                        Login
                      </NavLink>

                      <Login
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                      <AdLogin
                        show={adModalShow}
                        onHide={() => setAdModalShow(false)}
                      />
                    </>
                  )}
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
