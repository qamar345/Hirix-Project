import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSignUp } from "@clerk/clerk-react";

const Login = ({ ...props }) => {
  const { isLoaded, signUp } = useSignUp();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("loginLink");
  const [resetLink, setResetLink] = useState(false);
  const [value, setValue] = useState();
  const [show, setShow] = useState(true);
  const [token, setToken] = useState();
  const [verificationSent, setVerificationSent] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        email: email,
        password: password,
      };

      await axios
        .post("http://localhost:9000/employee-login", { payload })
        .then((res) => {
          alert(res.data.msg);
          console.log(res.data);
          if (res.data.isloggedin) {
            sessionStorage.setItem("id", res.data.data.id);
            sessionStorage.setItem("name", res.data.data.username);
            sessionStorage.setItem("first_name", res.data.data.first_name);
            sessionStorage.setItem("image", res.data.data.image);
            sessionStorage.setItem("email", res.data.data.email);
            sessionStorage.setItem("isLoggedIn", res.data.data.isloggedin);
            if (res.data.data.role === "employee") {
              navigate("employer/dashboard");
            } else if (res.data.data.role === "jobseeker") {
              navigate("/");
              window.location.reload();
            } else {
              alert("Unknown role");
            }
          } else {
            alert("Login failed.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role (Candidate or Employer).");
      return;
    }
    if (!isLoaded) return alert("Clerk not loaded yet.");

    try {
      // 1. Clerk account create
      await signUp.create({
        emailAddress: email,
        UserName: UserName,
        // phoneNumber: Phone,
        password: password,
      });

      // 2. Send verification codes
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
      alert("Verification code sent to your email and phone.");

      setVerificationSent(true);
    } catch (error) {
      console.error("Clerk signup error:", error);
      alert(error.errors?.[0]?.message || "Failed to send verification");
    }
  };

  // Handle email/password login
  const verifyAndRegister = async () => {
    try {
      // 3. Verify both codes
      await signUp.attemptEmailAddressVerification({ code });
      // await signUp.attemptPhoneNumberVerification({ code });
      // 4. If verified, now call your backend
      const payload = {
        first_name: FirstName?.trim(),
        last_name: LastName?.trim(),
        username: UserName?.trim(),
        email: email?.trim(),
        phone: Phone,
        password: password,
        role: role,
      };

      const res = await axios.post(
        "http://localhost:9000/employee-signup",
        payload
      );
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.error("Verification error:", error);
      alert("Verification failed. Please check the code.");
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:9000/verify-email`, {
        email: resetEmail,
      });

      if (response.status === 200) {
        alert("Verification email sent! Please check your inbox.");
        setShow(false);
      } else {
        alert("Failed to send verification email.");
      }
    } catch (error) {
      setResetError("Error: " + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleToken = async (e) => {
    e.preventDefault();

    const payload = {
      token,
      password,
      email: resetEmail,
    };

    try {
      const response = await axios.put(
        `http://localhost:9000/forget-password`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Account Recovered! Please login Again.");
        window.location.reload();
      } else {
        alert("Failed to verify");
      }
    } catch (error) {
      setResetError("Error: " + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/GenerateAutoUserName?firstName=${FirstName}&lastName=${LastName}`
      );
      const data = await response.json();
      setUserName(data.username);
    } catch (error) {
      console.error(error);
      alert("Error generating username");
    }
  };

  useEffect(() => {
    if (FirstName && LastName) {
      handleGenerate();
    }
  }, [FirstName, LastName]);
  
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
              {!resetLink ? (
                <form onSubmit={handleSubmit} className="form-account ">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    <button
                      type="submit"
                      className={`btn-normal`}
                      to="employer/dashboard"
                    >
                      {/* Sign in */}
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="reset">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      show ? handlePasswordReset(e) : handleToken(e);
                    }}
                    className="form-account "
                  >
                    <div className="form-group">
                      <label htmlFor="ip_email" className="label-field">
                        Email
                      </label>
                      <input
                        type="text"
                        id="ip_email"
                        className="form-control input-field"
                        name="email"
                        placeholder="Enter Account or Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                    </div>
                    <div hidden={show} className="form-group">
                      <label htmlFor="ip_password" className="label-field">
                        Token
                      </label>
                      <input
                        type="number"
                        className="form-control input-field valid"
                        name="token"
                        autoComplete="on"
                        placeholder="Enter Token"
                        aria-invalid="false"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                      {/* <span
                                      toggle="#ip_password"
                                      className="field-icon civi-toggle-password"
                                    >
                                      <FaRegEye className="mb-3" />
                                    </span> */}
                    </div>
                    <div hidden={show} className="form-group">
                      <label htmlFor="ip_password" className="label-field">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control input-field valid"
                        name="password"
                        autoComplete="on"
                        placeholder="Enter Password"
                        aria-invalid="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                      <button
                        type="submit"
                        disabled={loading}
                        className={`btn-normal`}
                      >
                        {" "}
                        {loading
                          ? "Sending reset link..."
                          : show
                          ? "Send Reset Link"
                          : "Reset Password"}
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
              {/* <div className="addon-login-wrap">
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
              </div> */}
            </div>

            <form
              onSubmit={submit}
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
                          id="civi_user_candidate"
                          name="account_type"
                          value="jobseeker"
                          onChange={(e) => setRole(e.target.value)}
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
                          id="civi_user_employer"
                          name="account_type"
                          defaultChecked=""
                          value="employee"
                          onChange={(e) => setRole(e.target.value)}
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
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                  className="form-control input-field"
                  placeholder=" Username"
                  value={UserName}
                  readOnly
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ip_reg_phone" className="label-field">
                  Phone number
                </label>
                <PhoneInput
                required
                  className="signUpPhone"
                  value={Phone}
                  onChange={(value) => setPhone(value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  toggle="#ip_reg_password"
                  className="fa fa-fw fa-eye field-icon civi-toggle-password"
                />
                {verificationSent && (
                  <div className="form-group mt-3">
                    <label htmlFor="verification-code" className="label-field">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      id="verification-code"
                      className="form-control input-field"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                    />
                    <button
                      type="button"
                      onClick={verifyAndRegister}
                      className="btn btn-primary mt-2"
                    >
                      Verify Email
                    </button>
                  </div>
                )}
              </div>
              <div className="form-group accept-account d-flex align-items-center gap-2">
                <input
                  required
                  type="checkbox"
                  id="ip_accept_account"
                  className="form-control custom-checkbox mb-3"
                  name="accept_account"
                />
                <label htmlFor="ip_accept_account">
                  Accept the
                  <Link> Terms</Link> and
                  <Link> Privacy Policy</Link>
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
                {/* {verificationSent && (
                  <div className="form-group mt-3">
                    <label htmlFor="verification-code" className="label-field">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      id="verification-code"
                      className="form-control input-field"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                    />
                    <button
                      type="button"
                      onClick={verifyAndRegister}
                      className="btn btn-primary mt-2"
                    >
                      Verify Email
                    </button>
                  </div>
                )} */}
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
