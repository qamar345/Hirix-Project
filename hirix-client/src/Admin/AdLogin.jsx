import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaTimes, FaRegEye } from "react-icons/fa";
import API, { BASE_URL } from "../api";
const AdLogin = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Define error state
  const [loading, setLoading] = useState(false); // Define loading state
  const [showPassword, setShowPassword] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false); // To toggle forgot password view
  const [resetEmail, setResetEmail] = useState(""); // Email for reset
  const [resetError, setResetError] = useState(""); // Error for reset email
  const [resetSuccess, setResetSuccess] = useState(""); // Success message for reset
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { email, password };
      const res = await API.post(
        "/admin-login",
        payload
      );
      if (res.data.loginStatus) {
        sessionStorage.setItem("id", res.data.admin.id);
        sessionStorage.setItem("name", res.data.admin.name);
        sessionStorage.setItem("image", res.data.admin.image);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.admin.role || "admin");
        sessionStorage.setItem("isLoggedIn", res.data.loginStatus);
        navigate("/admin/dashboard");
      } else {
        //
        alert("Invalid Email or Password");
      }
    } catch (error) {
      setError(error.message); // Show error message
    } finally {
      setLoading(false);
    }
  };

  const [show, setShow] = useState(true);
  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setLoading(true);

    try {
      const response = await API.post(
        "/verify-emailForAdmin",
        { email: resetEmail }
      );

      const data = response.data;

      if (response.status === 200) {
        setResetSuccess(
          data.msg || "Verification email sent! Please check your inbox."
        );
        setShow(false);
      } else {
        setResetError(data.msg || "Failed to send verification email.");
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
        `/forget-passwordForAdmin`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setResetSuccess(data.msg || "Account Recovered!");
        window.location.reload();
      } else {
        setResetError(data.msg || "Failed to verify");
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
            {/* <a href="#" onClick={props.onHide} className="close-btn">
              <FaTimes />
            </a> */}

            <div className="loginModalHeader">
              <div className="tabsForm">
                <a className={`btn-link active `}>Log in</a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-500 text-red-600 p-3 rounded mb-6 text-center shadow-md">
                {error}
              </div>
            )}

            {/* Password Reset Success/Error */}
            {resetSuccess && (
              <div className="bg-green-100 border border-green-500 text-green-600 p-3 rounded mb-6 text-center shadow-md">
                {resetSuccess}
              </div>
            )}
            {resetError && (
              <div className="bg-red-100 border border-red-500 text-red-600 p-3 rounded mb-6 text-center shadow-md">
                {resetError}
              </div>
            )}

            <div id="loginLink" className={`logIn active`}>
              {!showForgotPassword ? (
                <form onSubmit={handleSubmit} className="form-account ">
                  <div className="form-group">
                    <label htmlFor="ip_email" className="label-field">
                      Email
                    </label>
                    <input
                      type="email"
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
                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn-normal`}
                    >
                      {" "}
                      {loading ? "Logging in..." : "Login"}
                      {/* Sign in */}
                    </button>
                  </div>
                </form>
              ) : (
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
              )}
              {/* Forgot password link */}
              {!showForgotPassword && (
                <div className="text-center mt-4">
                  <span
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Forgot password?
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdLogin;
