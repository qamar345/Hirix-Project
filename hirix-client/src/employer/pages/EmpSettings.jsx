import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { EmpFooter } from "../index.js";
import axios from "axios";

const EmpSettings = () => {
  const token = sessionStorage.getItem("token");
  const check = sessionStorage.getItem("isLoggedIn");
  const id = sessionStorage.getItem("id");
  const [editUserData, setEditUserData] = useState({});
  const [editPasswordData, setEditPasswordData] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [userData, setUserData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [value, setValue] = useState();
  const [isActive, setIsActive] = useState("personalInfo");
  const [payGroup, setPayGroup] = useState({
    payPal: false,
    stripe: false,
    bank: false,
  });
  const navigate = useNavigate();
  const handlePayGroup = (tab) => {
    setPayGroup((prevState) => ({
      ...prevState,
      [tab]: !prevState[tab],
    }));
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleActive = (tab) => {
    setIsActive(tab);
  };
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCancelUpload = () => {
    setUploadedImage(null);
  };
  useEffect(() => {
    if (!check) navigate("/");
  });

  useEffect(() => {
    const GetData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/getEmployer/${id}`, {
          headers: {
            "x-access-token": token,
          },
        });
        setUserData(res.data[0]);
        setEditUserData(res.data[0]);
      } catch (error) {}
    };
    GetData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setEditPasswordData({
      ...editPasswordData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", editUserData.first_name);
    formData.append("last_name", editUserData.last_name);
    formData.append("email", editUserData.email);

    // Image ko sirf tab append karein jab user ne naya image select kiya ho
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await axios.put(
        `http://localhost:9000/employee-profile-update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );

      const updatedData = res.data.result;

      sessionStorage.setItem("image", updatedData.image);
      sessionStorage.setItem("first_name", updatedData.first_name);
      window.dispatchEvent(new Event("profileUpdated"));
      alert(res.data.message);
    } catch (error) {}
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !editPasswordData.currentPass ||
      !editPasswordData.newPass ||
      !editPasswordData.confirmPass
    ) {
      alert("All fields are required.");
      return;
    }

    if (editPasswordData.newPass !== editPasswordData.confirmPass) {
      alert("New password and confirm password do not match.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:9000/Employer-password/${id}`,
        {
          editPasswordData,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      alert(response.data.msg);
      setEditPasswordData({ currentPass: "", newPass: "", confirmPass: "" });
    } catch (error) {
      alert("Error updating password: ", error);
    }
  };
  return (
    <>
      <div className="dashboardWrapper">
        <div className="row">
          <h6 className="heading">Settings</h6>
        </div>
        <div className="tab-list">
          <Link
            className={`tab-item ${
              isActive === "personalInfo" ? "active" : ""
            }`}
            onClick={() => handleActive("personalInfo")}
          >
            Personal info
          </Link>
          <Link
            className={`tab-item ${isActive === "payout" ? "active" : ""}`}
            style={{ marginLeft: "32px" }}
            onClick={() => handleActive("payout")}
          >
            Payout
          </Link>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-7">
            <div
              id="personalInfo"
              className={`tab-detail  ${
                isActive === "personalInfo" ? "active" : ""
              }`}
            >
              <div className="row block-from">
                <form onSubmit={handleSubmit}>
                  <div className="entryGroup col-md-12 mt12">
                    <h6 className="block-heading">Personal info</h6>
                    <div className="user-avatar">
                      <div className="gap-3 d-flex flex-column">
                        <label>Your photo</label>
                        <div className="file-uploader">
                          {!uploadedImage ? (
                            <label className="upload-label">
                              <RiUploadLine className="upload-icon" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden-input"
                              />
                            </label>
                          ) : (
                            <div className="image-preview">
                              <img
                                src={uploadedImage}
                                alt="Uploaded Preview"
                                className="img-preview"
                              />
                              <div className="close-btn">
                                <button onClick={handleCancelUpload}>
                                  <IoCloseSharp className="icon" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="user-desc">
                        Update your photo manually, if the photo is not set the
                        default Avatar will be the same as your login email
                        account.
                      </div>
                    </div>
                  </div>
                  <div className="entryGroup col-md-6">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={editUserData.first_name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="entryGroup col-md-6">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={editUserData.last_name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="entryGroup col-md-6">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editUserData.email || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="entryGroup col-md-6">
                    <button className="civi-button" type="submit">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
              <div className="row block-from mt12">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="entryGroup col-md-12 ">
                    <h6 className="block-heading">Change password</h6>
                  </div>

                  <div className="passwordFields">
                    {/* Current Password */}
                    <div className="entryGroup col-md-12">
                      <label htmlFor="currentPass">Current password</label>
                      <div className="inputGrout">
                        <input
                          className="inputControl"
                          type={
                            passwordVisibility.current ? "text" : "password"
                          }
                          id="currentPass"
                          name="currentPass"
                          placeholder="Enter current password"
                          value={editPasswordData.currentPass}
                          onChange={handlePasswordChange}
                        />
                        <span
                          onClick={() => togglePasswordVisibility("current")}
                          style={{ cursor: "pointer" }}
                        >
                          {passwordVisibility.current ? (
                            <FaEyeSlash className="d-block" />
                          ) : (
                            <FaEye className="d-block" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="entryGroup col-md-12">
                      <label htmlFor="newPass">New password</label>
                      <div className="inputGrout">
                        <input
                          className="inputControl"
                          type={passwordVisibility.new ? "text" : "password"}
                          id="newPass"
                          name="newPass"
                          placeholder="Enter new password"
                          value={editPasswordData.newPass}
                          onChange={handlePasswordChange}
                        />
                        <span
                          onClick={() => togglePasswordVisibility("new")}
                          style={{ cursor: "pointer" }}
                        >
                          {passwordVisibility.new ? (
                            <FaEyeSlash className="d-block" />
                          ) : (
                            <FaEye className="d-block" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="entryGroup col-md-12">
                      <label htmlFor="confirmPass">Confirm password</label>
                      <div className="inputGrout">
                        <input
                          className="inputControl"
                          type={
                            passwordVisibility.confirm ? "text" : "password"
                          }
                          id="confirmPass"
                          name="confirmPass"
                          placeholder="Confirm your password"
                          value={editPasswordData.confirmPass}
                          onChange={handlePasswordChange}
                        />
                        <span
                          onClick={() => togglePasswordVisibility("confirm")}
                          style={{ cursor: "pointer" }}
                        >
                          {passwordVisibility.confirm ? (
                            <FaEyeSlash className="d-block" />
                          ) : (
                            <FaEye className="d-block" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="entryGroup col-md-12">
                    <button type="submit" className="civi-button">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div
              id="payout"
              className={`tab-detail  ${isActive === "payout" ? "active" : ""}`}
            >
              <div className="row">
                <ul>
                  <li className="payout-item entryGroup block-from col-md-12">
                    <h5
                      className={`title ${payGroup.payPal ? "active" : ""}`}
                      onClick={() => handlePayGroup("payPal")}
                    >
                      Paypal
                    </h5>
                    <div
                      className={`content ${payGroup.payPal ? "active" : ""}`}
                    >
                      <label>Paypal email</label>
                      <input
                        type="email"
                        id="payout-paypal"
                        name="payout_paypal"
                        placeholder="Enter your email"
                        defaultValue="EmployerPayPal@gmail.com"
                      />
                    </div>
                  </li>
                  <li className="payout-item entryGroup block-from col-md-12">
                    <h5
                      className={`title ${payGroup.stripe ? "active" : ""}`}
                      onClick={() => handlePayGroup("stripe")}
                    >
                      Stripe
                    </h5>

                    <div
                      className={`content ${payGroup.stripe ? "active" : ""}`}
                    >
                      <label>Stripe account</label>
                      <input
                        type="text"
                        id="payout-stripe"
                        name="payout_stripe"
                        placeholder="Enter your account"
                        defaultValue="EmployerStripe@gmail.com"
                      />
                    </div>
                  </li>
                  <li className="payout-item entryGroup block-from col-md-12">
                    <h5
                      className={`title ${payGroup.bank ? "active" : ""}`}
                      onClick={() => handlePayGroup("bank")}
                    >
                      Bank Transfer
                    </h5>
                    <div className={`content ${payGroup.bank ? "active" : ""}`}>
                      <div className="form-group payout-content">
                        <label>Card Number</label>
                        <input
                          type="text"
                          id="payout-card-number"
                          name="payout_card_number"
                          placeholder="Enter card number"
                          defaultValue={5399}
                        />
                      </div>
                      <div className="form-group payout-content">
                        <label>Card Name</label>
                        <input
                          type="text"
                          id="payout-card-name"
                          name="payout_card_name"
                          placeholder="Enter card name"
                          defaultValue="Employer"
                        />
                      </div>
                      <div className="form-group payout-content">
                        <label>Bank Name</label>
                        <input
                          type="text"
                          id="payout-bank-transfer-name"
                          name="payout_bank_transfer_name"
                          placeholder="Enter bank name"
                          defaultValue="WorldBank"
                        />
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="entryGroup col-md-12">
                  <Link className="civi-button">Save</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <EmpFooter />
      </div>
    </>
  );
};

export default EmpSettings;
