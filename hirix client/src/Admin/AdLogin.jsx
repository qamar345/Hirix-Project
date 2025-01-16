import React from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaTimes, FaRegEye } from "react-icons/fa";
const AdLogin = ({ ...props }) => {
  return (
    <Modal {...props} centered>
      <Modal.Body>
        <div className="loginPopup">
          <div className="loginModal">
            {/* <a href="#" onClick={props.onHide} className="close-btn">
              <FaTimes />
            </a> */}

            <div className="loginModalHeader">
              <div className="tabsForm">
                <a className={`btn-link active `}>Log in</a>
              </div>
            </div>

            <div id="loginLink" className={`logIn active`}>
              <form className="form-account ">
                <div className="form-group">
                  <label htmlFor="ip_email" className="label-field">
                    Account or Email
                  </label>
                  <input
                    type="text"
                    id="ip_email"
                    className="form-control input-field"
                    name="email"
                    placeholder="Enter Account or Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ip_password" className="label-field">
                    Password
                  </label>
                  <input
                    type="password"
                    id="ip_password"
                    className="form-control input-field valid"
                    name="password"
                    autoComplete="on"
                    placeholder="Enter Password"
                    aria-invalid="false"
                  />
                  <span
                    toggle="#ip_password"
                    className="field-icon civi-toggle-password"
                  >
                    <FaRegEye className="mb-3" />
                  </span>
                </div>
                <p className="msg">Sending login info,please wait...</p>

                <div className="form-group">
                  <NavLink
                    type="submit"
                    className={`btn-normal`}
                    to="/admin/dashboard"
                  >
                    Sign in
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdLogin;
