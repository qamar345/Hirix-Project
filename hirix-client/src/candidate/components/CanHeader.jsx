import React, { useEffect, useState } from "react";
import API, { BASE_URL } from "../../api";
import { FaBars, FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { CanSideMenu } from "../index.js";
import ProgressBar from "react-bootstrap/ProgressBar";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const MISSING_ITEMS = [
  { id: "info", label: "Basic Info" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
];

const CanHeader = () => {
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("id");
  const check = sessionStorage.getItem("isLoggedIn");
  const firstName = sessionStorage.getItem("first_name");
  const imageUser = sessionStorage.getItem("image");
  const [imageBroken, setImageBroken] = useState(false);
  const [profileStrength, setProfileStrength] = useState(
    sessionStorage.getItem("Percent") || 0
  );
  const [checkStatus, setCheckStatus] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!check) navigate("/");
  });

  const fetchProfileStatus = async () => {
    if (!id || !token) return;
    try {
      const res = await API.get(`/profile-status/${id}`, {
        headers: { "x-access-token": token },
      });
      const status = res.data.status || {};
      setCheckStatus(status);

      const completedSections = Object.values(status).filter(Boolean).length;
      const totalSections = Object.keys(status).length;
      const newPercentage =
        totalSections > 0
          ? ((completedSections / totalSections) * 100).toFixed(1)
          : 0;

      setProfileStrength(newPercentage);
      sessionStorage.setItem("Percent", newPercentage);
    } catch (error) {
      console.error("Failed to load profile completion status:", error);
    }
  };

  useEffect(() => {
    fetchProfileStatus();
  }, [id]);

  useEffect(() => {
    const handlePercentUpdate = () => {
      setProfileStrength(sessionStorage.getItem("Percent") || 0);
      fetchProfileStatus();
    };
    window.addEventListener("percentUpdated", handlePercentUpdate);
    return () =>
      window.removeEventListener("percentUpdated", handlePercentUpdate);
  }, []);
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
              <div
                className="header-profile-strength d-none d-lg-flex"
                data-tooltip-id="headerProfileStrength"
              >
                <span className="hps-label">
                  Profile Strength: {Math.floor(profileStrength)}%
                </span>
                <ProgressBar
                  now={profileStrength}
                  className="hps-bar"
                />
                <Tooltip id="headerProfileStrength" place="bottom">
                  <ul className="hps-checklist">
                    {MISSING_ITEMS.map((item) => (
                      <li key={item.id} className="hps-checklist-item">
                        <FaCheckCircle
                          style={{
                            color: checkStatus[item.id] ? "#2fae62" : "#9aa4b5",
                          }}
                        />
                        <span>
                          {item.label}
                          {checkStatus[item.id] ? " complete" : " missing"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Tooltip>
              </div>
            )}
            {check && (
              <div className="profileImg">
                {imageUser && !imageBroken ? (
                  <img
                    src={`${BASE_URL}${imageUser}`}
                    title="Candidate"
                    alt="Candidate"
                    className=""
                    onError={() => setImageBroken(true)}
                  />
                ) : (
                  <FaUserCircle className="avatar-icon" title="Candidate" />
                )}
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
