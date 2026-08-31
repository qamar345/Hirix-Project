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
import API, { BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";

// import { useSignUp } from "@clerk/clerk-react";

const Login = ({ ...props }) => {
  // const { isLoaded, signUp } = useSignUp();
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
  const [isVerified, setIsVerified] = useState(false);
  const [loader, setLoader] = useState("");
  const [isPolling, setIsPolling] = useState(false);

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
      // Single unified login endpoint - backend determines role from DB
      const res = await API.post("/user-login", { email, password });

      const { isloggedin, msg, data, token } = res.data;

      if (isloggedin && data) {
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("name", data.username || "");
        sessionStorage.setItem("first_name", data.first_name || "");
        sessionStorage.setItem("image", data.image || "");
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("token", token);

        if (data.role === "employee") {
          navigate("/employer/dashboard");
        } else if (data.role === "jobseeker") {
          navigate("/candidate/dashboard");
        } else {
          showError("Unknown role: " + data.role);
        }
      } else {
        showError(msg || "Login failed.");
      }
    } catch (error) {
      setError(error.message);
      showError("Login error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const SendMailVerifcationLink = async (e) => {
    e.preventDefault();

    if (!email) {
      showError("Please enter email first!!!");
    } else {
      try {
        const res = await API.post(
          "/send-verify-email",
          { email }
        );
        setLoader("Checking...");
        showSuccess(res.data.msg);
        setIsPolling(true); // Start polling
      } catch (error) {
        console.error(error);
        showError(error.response?.data?.msg || "Failed to send verification email. Please try again.");
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (isPolling && email) {
      const poll = async () => {
        try {
          const res = await API.get(`/check-mail-status/${email}`);
          if (res.data.isVerified) {
            setLoader("");
            setIsVerified(true);
            setIsPolling(false);
          }
        } catch (error) {
          console.error("Verification check error:", error);
        }
      };

      poll(); // Run immediately
      intervalId = setInterval(poll, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPolling, email]);
  const submit = async (e) => {
    //   e.preventDefault();
    //   if (role !== null) {
    //     alert("Please select a role (Candidate or Employer).");
    //     return;
    //   }
    //   if (!isLoaded) return alert("Clerk not loaded yet.");
    //   try {
    //     // 1. Clerk account create
    //     await signUp.create({
    //       emailAddress: email,
    //       UserName: UserName,
    //       // phoneNumber: Phone,
    //       password: password,
    //     });
    //     // 2. Send verification codes
    //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    //     // await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
    //     alert("Verification code sent to your email and phone.");
    //     setVerificationSent(true);
    //   } catch (error) {
    //     alert(error.errors?.[0]?.message || "Failed to send verification");
    //   }
  };

  // Handle email/password login
  const verifyAndRegister = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      showError("Please verify your email before submitting.");
      return;
    }

    // Just check if role is set before proceeding
    if (!role) {
      showError("Please select a role before submitting.");
      return;
    }

    const payload = {
      first_name: FirstName?.trim(),
      last_name: LastName?.trim(),
      username: UserName?.trim(),
      email: email?.trim(),
      phone: Phone,
      password: password,
      role: role, // ✅ role will now have the correct value if selected earlier
    };

    try {
      const res = await API.post(
        "/employee-signup",
        payload
      );
      showSuccess(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.msg || "Signup failed. Please check the details and try again.");
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setLoading(true);

    try {
      const response = await API.post(`/verify-email`, {
        email: resetEmail,
      });

      if (response.status === 200) {
        showSuccess("Verification email sent! Please check your inbox.");
        setShow(false);
      } else {
        showError("Failed to send verification email.");
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
      const response = await API.put(
        `/forget-password`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        showSuccess("Account Recovered! Please login Again.");
        window.location.reload();
      } else {
        showError("Failed to verify");
      }
    } catch (error) {
      setResetError("Error: " + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!FirstName && !LastName) return;
    // Generate username locally: firstName + lastName + random 3-digit number
    const base = `${FirstName || ""}${LastName || ""}`.toLowerCase().replace(/\s+/g, "");
    const rand = Math.floor(100 + Math.random() * 900); // 100–999
    setUserName(`${base}${rand}`);
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

            {activeTab === "loginLink" ? (
              <div
                id="loginLink"
                className="logIn active"
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
                      type={showPassword ? "text" : "password"}
                      id="ip_password"
                      className="form-control input-field valid"
                      name="password"
                      autoComplete="on"
                      placeholder="Enter Password"
                      aria-invalid="false"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="field-icon civi-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FaRegEye className="mb-3" />
                    </button>
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
                        type="text"
                        inputMode="numeric"
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
                        type={showPassword ? "text" : "password"}
                        className="form-control input-field valid"
                        name="password"
                        autoComplete="on"
                        placeholder="Enter Password"
                        aria-invalid="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="field-icon civi-toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FaRegEye className="mb-3" />
                      </button>
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
            ) : (
              <form
                onSubmit={verifyAndRegister}
                id="signUpLink"
                className="form-account signUp active"
              >
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <div className="col-group">
                      <button
                        type="button"
                        onClick={() => setRole("jobseeker")}
                        className={
                          role === "jobseeker"
                            ? "btn-selected btn btn-primary"
                            : "btn"
                        }
                      >
                        <span>
                          <FaRegUser className="icon" />
                          Candidate
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="col-group">
                      <button
                        type="button"
                        onClick={() => setRole("employee")}
                        className={
                          role === "employee"
                            ? "btn-selected btn btn-primary"
                            : "btn"
                        }
                      >
                        <span>
                          <FaBriefcase className="icon" />
                          Employer
                        </span>
                      </button>
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
                  Email Address
                </label>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="email"
                    id="ip_reg_email"
                    className="form-control input-field m-0"
                    name="reg_email"
                    placeholder="Enter Email"
                    value={email}
                    disabled={isVerified || isPolling}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  {isVerified ? (
                    <span className="btn btn-success d-flex align-items-center justify-content-center" style={{ pointerEvents: 'none', minWidth: '110px', height: '48px', margin: 0 }}>
                      Verified ✓
                    </span>
                  ) : isPolling ? (
                    <button className="btn btn-warning d-flex align-items-center justify-content-center" type="button" disabled style={{ minWidth: '110px', height: '48px', margin: 0 }}>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Pending
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center justify-content-center"
                      onClick={SendMailVerifcationLink}
                      style={{ minWidth: '110px', height: '48px', margin: 0, backgroundColor: '#00C4A5', borderColor: '#00C4A5' }}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {isPolling && (
                  <small className="form-text mt-1 d-block" style={{ color: '#ffc107', fontSize: '12px' }}>
                    Please check your inbox and click the verification link. Waiting for verification...
                  </small>
                )}
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
                  type={showPassword ? "text" : "password"}
                  id="ip_reg_password"
                  className="form-control input-field"
                  name="reg_password"
                  autoComplete="on"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="fa fa-fw fa-eye field-icon civi-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
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
          )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
