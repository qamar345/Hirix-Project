import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import useSiteSettings from "../../useSiteSettings";

const TopNav = () => {
  const { settings } = useSiteSettings();

  const phone = settings.site_phone || "(00) 658 54332";
  const email = settings.site_email || "support@hirix.pk";

  return (
    <div className="civi-top-bar">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 left-top-bar">
            <div className="top-bar-text">
              <a href="#">
                <span className="icon-ringbell">
                  <img
                    src="https://civi.uxper.co/wp-content/themes/civi/assets/images/ringbell.svg"
                    alt=""
                  />
                </span>
                Subscribe for job alerts by email!
              </a>
            </div>
          </div>
          <div className="col-lg-5 right-top-bar">
            <span className="top-bar-icon">
              <MdOutlinePhoneEnabled className="ml-4" />
              <a href={`tel:${phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                {phone}
              </a>
            </span>
            <span className="top-bar-icon">
              <FaRegEnvelope className="ml-4" />
              <a href={`mailto:${email}`} style={{ color: "inherit", textDecoration: "none" }}>
                {email}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;