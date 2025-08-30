import React from 'react'
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlinePhoneEnabled } from "react-icons/md";
const TopNav = () => {
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
              {/* <i className="fal fa-phone" /> */}
              <MdOutlinePhoneEnabled  className="ml-4"/>
              (00) 658 54332
            </span>
            <span className="top-bar-icon">
              {/* <i className="fal fa-envelope" /> */}
              <FaRegEnvelope className="ml-4"/>
              support.hirix.pk
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav