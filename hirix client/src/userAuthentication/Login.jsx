import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-number-input";
import {
  FaTimes,
  FaRegEye,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaArrowLeft,
  FaRegUser,
  FaBriefcase,
} from "react-icons/fa";
const Login = ({ ...props }) => {
  const [activeTab, setActiveTab] = useState("loginLink");
  const [resetLink, setResetLink] = useState(false);
  const [value, setValue] = useState();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal {...props} centered>
      <Modal.Body>
        <div className="loginPopup">
          <div className="loginModal">
            <a href="#" onClick={props.onHide} className="close-btn">
              <FaTimes />
            </a>

            <div className="loginModalHeader">
              <div className="tabsForm">
                <a
                  className={`btn-link ${
                    activeTab === "loginLink" ? "active" : ""
                  } `}
                  onClick={() => handleTabClick("loginLink")}
                >
                  Log in
                </a>
                <a
                  className={`btn-link ${
                    activeTab === "signUpLink" ? "active" : ""
                  } `}
                  onClick={() => handleTabClick("signUpLink")}
                >
                  Sign Up
                </a>
              </div>
            </div>

            <div
              id="loginLink"
              className={`logIn ${activeTab === "loginLink" ? "active" : ""}`}
            >
              {!resetLink && (
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
                    <div className="forgot-password">
                      <span>Forgot your password? </span>
                      <NavLink
                        className={`btn-reset-password`}
                        to=""
                        onClick={() => setResetLink(true)}
                      >
                        Reset password.
                      </NavLink>
                    </div>
                  </div>
                  <div className="form-group">
                    <NavLink
                      type="submit"
                      className={`btn-normal`}
                      to="employer/dashboard"
                    >
                      Sign in
                    </NavLink>
                  </div>
                </form>
              )}

              {resetLink && (
                <div className="reset">
                  <form>
                    <div className="form-group control-username d-flex flex-column align-items-center justify-content-center">
                      <input
                        type="text"
                        id="ip_email"
                        className="form-control input-field mb-3"
                        name="email"
                        placeholder="Enter your username or email"
                      />

                      {/* <p className="msg">Sending info,please wait...</p> */}
                      <button role="button" className="btn-normal mt-3 w-75">
                        Get new password
                      </button>
                    </div>
                  </form>
                  <a
                    className="back-to-login mt-4 d-block"
                    href="#"
                    onClick={() => setResetLink(false)}
                  >
                    <FaArrowLeft className="me-3" />
                    Back to login
                  </a>
                </div>
              )}
              <div className="addon-login-wrap">
                <div className="addon-login">Or Continue with</div>
                <ul>
                  <li>
                    <NavLink
                      to="candidate/dashboard"
                      className={`facebook-login`}
                    >
                      <FaFacebookF />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={`google-login`}>
                      <FaGoogle />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={`linkedin-login`}>
                      <FaLinkedinIn />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            <form
              id="signUpLink"
              className={`form-account signUp  ${
                activeTab === "signUpLink" ? "active" : ""
              }`}
            >
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <div className="col-group">
                      <label
                        htmlFor="civi_user_candidate"
                        className="label-field radio-field"
                      >
                        <input
                          type="radio"
                          defaultValue="civi_user_candidate"
                          id="civi_user_candidate"
                          name="account_type"
                        />
                        <span>
                          <FaRegUser className="icon" />
                          Candidate
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-group">
                      <label
                        htmlFor="civi_user_employer"
                        className="label-field radio-field"
                      >
                        <input
                          type="radio"
                          defaultValue="civi_user_employer"
                          id="civi_user_employer"
                          name="account_type"
                          defaultChecked=""
                        />
                        <span>
                          <FaBriefcase className="icon" />
                          Employer
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <div className="col-group">
                      <label htmlFor="ip_reg_firstname" className="label-field">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="ip_reg_firstname"
                        className="form-control input-field"
                        name="reg_firstname"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-group">
                      <label htmlFor="ip_reg_lastname" className="label-field">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="ip_reg_lastname"
                        className="form-control input-field"
                        name="reg_lastname"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ip_reg_company_name" className="label-field">
                  Username
                </label>
                <input
                  type="text"
                  id="ip_reg_company_name"
                  className="form-control input-field"
                  name="reg_company_name"
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ip_reg_email" className="label-field">
                  Email
                </label>
                <input
                  type="email"
                  id="ip_reg_email"
                  className="form-control input-field"
                  name="reg_email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ip_reg_phone" className="label-field">
                  Phone number
                </label>
                <PhoneInput
                  className="signUpPhone"
                  value={value}
                  onChange={setValue}
                  defaultCountry="PK"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ip_reg_password" className="label-field">
                  Password
                </label>
                <input
                  type="password"
                  id="ip_reg_password"
                  className="form-control input-field"
                  name="reg_password"
                  autoComplete="on"
                  placeholder="Enter Password"
                />
                <span
                  toggle="#ip_reg_password"
                  className="fa fa-fw fa-eye field-icon civi-toggle-password"
                />
              </div>
              <div className="form-group accept-account d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  id="ip_accept_account"
                  className="form-control custom-checkbox mb-3"
                  name="accept_account"
                />
                <label htmlFor="ip_accept_account">
                  Accept the
                  <Link>Terms</Link> and
                  <Link>Privacy Policy</Link>
                </label>
              </div>
              <p className="msg">Sending register info,please wait...</p>
              <div className="form-group">
                <button
                  type="submit"
                  className="gl-button btn button"
                  value="Sign in"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
