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
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ ...props }) => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(""); // Define error state
  const [loading, setLoading] = useState(false); // Define loading state
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // To toggle forgot password view
  const [resetEmail, setResetEmail] = useState(""); // Email for reset
  const [resetError, setResetError] = useState(""); // Error for reset email
  const [resetSuccess, setResetSuccess] = useState(""); // Success message for reset
  const [activeTab, setActiveTab] = useState("loginLink");
  const [resetLink, setResetLink] = useState(false);
  const [value, setValue] = useState();
  const [show, setshow] = useState(true);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: FirstName?.trim(),
      last_name: LastName?.trim(),
      username: UserName?.trim(),
      email: email?.trim(),
      phone: Phone,
      password: password,
      role: role,
    };


    try {
      await axios
        .post(`http://localhost:9000/employee-signup`, payload)
        .then((res) => {
          alert(res.data.msg);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error:", error.message);
    }

  }

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
            sessionStorage.setItem("id", res.data.data[0].id);
            sessionStorage.setItem("name", res.data.data[0].username);
            sessionStorage.setItem("first_name", res.data.data[0].first_name);
            sessionStorage.setItem("image", res.data.data[0].image);
            sessionStorage.setItem("email", res.data.data[0].email);
            sessionStorage.setItem("isLoggedIn", res.data.data[0].isloggedin);
            if (res.data.data[0].role === 'employee') {
              navigate("employer/dashboard");
            } else if (res.data.data[0].role === 'jobseeker') {
              navigate("/");
              window.location.reload();
            } else {
              alert("Unknown role");
            }
          }
          else{
            alert("Login failed.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setError(error.message); // Show error message
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  // Handle password reset
  const handlePasswordReset = async (e) => {
    console.log("yes")
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:9000/verify-email`,
        { email: resetEmail }
      );

      if (response.status === 200) {
        alert("Verification email sent! Please check your inbox.")
        setshow(false);
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
                <form  onSubmit={handleSubmit} className="form-account ">
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

            <form onSubmit={submit}
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
                          value= "jobseeker"
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
                          defaultValue="civi_user_employer"
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
                  id="ip_reg_company_name"
                  className="form-control input-field"
                  name="reg_company_name"
                  placeholder="Enter Username"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
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
              </div>
              <div className="form-group accept-account d-flex align-items-center gap-2">
                <input required
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
