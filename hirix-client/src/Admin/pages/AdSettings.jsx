import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AdFooter } from "../index.js";
import API, { BASE_URL } from "../../api";

const SOCIAL_PLATFORMS = [
  "Facebook", "LinkedIn", "Twitter / X", "Instagram", "YouTube",
  "TikTok", "Pinterest", "Snapchat", "WhatsApp", "Telegram", "Other"
];

const AdSettings = () => {
  const check = sessionStorage.getItem("isLoggedIn");
  const token = sessionStorage.getItem("token");
  const [editUserData, setEditUserData] = useState({});

  // Basic configs
  const [siteConfigs, setSiteConfigs] = useState({
    site_email: "",
    site_phone: "",
    footer_address: "",
    site_title: "",
    site_meta_description: "",
    gtm_id: "",
    pixel_id: "",
    gsc_verification: ""
  });

  // Dynamic social links: [{platform: "Facebook", url: "https://..."}]
  const [socialLinks, setSocialLinks] = useState([
    { platform: "Facebook", url: "" },
    { platform: "LinkedIn", url: "" },
  ]);

  useEffect(() => {
    const FetchConfigs = async () => {
      try {
        const res = await API.get("/site-settings");
        if (res.data) {
          const { social_links, ...rest } = res.data;
          setSiteConfigs(prev => ({ ...prev, ...rest }));
          if (social_links) {
            try {
              const parsed = JSON.parse(social_links);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setSocialLinks(parsed);
              }
            } catch {}
          }
        }
      } catch (err) {
        console.error("Error fetching site settings:", err);
      }
    };
    FetchConfigs();
  }, []);

  const handleSaveConfigs = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...siteConfigs,
        social_links: JSON.stringify(socialLinks.filter(s => s.url.trim() !== ""))
      };
      const res = await API.put("/site-settings", { settings: payload }, {
        headers: { "x-access-token": token }
      });
      alert(res.data.msg || "Configurations updated successfully!");
    } catch (err) {
      console.error("Error saving configurations:", err);
      alert("Failed to save site configurations.");
    }
  };

  // Social links handlers
  const handleSocialChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleAddSocial = () => {
    setSocialLinks(prev => [...prev, { platform: "Other", url: "" }]);
  };

  const handleRemoveSocial = (index) => {
    setSocialLinks(prev => prev.filter((_, i) => i !== index));
  };

  const [editPasswordData, setEditPasswordData] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState([]);
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
    if (!check) navigate("/admin-login");
  });

  useEffect(() => {
    const GetUserData = async () => {
      try {
        const res = await API.get(
          `/GetAdmin/${sessionStorage.getItem("id")}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setUserData(res.data);
        setEditUserData(res.data);
      } catch (error) {}
    };
    GetUserData();
  }, []);

  const handlePasswordChange = (e) => {
    setEditPasswordData({
      ...editPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    try {
      const res = await API.put(
        `/admin-profile/${sessionStorage.getItem("id")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );
      if (res.data.imageUrl) {
        sessionStorage.setItem("image", res.data.imageUrl);
        window.dispatchEvent(new Event("profileUpdated"));
      }
      alert(res.data.message);
      navigate("/admin/dashboard");
    } catch (err) {}
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
      const response = await API.put(
        `/change-password/${sessionStorage.getItem("id")}`,
        { editPasswordData },
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
            className={`tab-item ${isActive === "personalInfo" ? "active" : ""}`}
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
          <Link
            className={`tab-item ${isActive === "siteSettings" ? "active" : ""}`}
            style={{ marginLeft: "32px" }}
            onClick={() => handleActive("siteSettings")}
          >
            Site Configs
          </Link>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-7">

            {/* ===== Personal Info Tab ===== */}
            <div
              id="personalInfo"
              className={`tab-detail ${isActive === "personalInfo" ? "active" : ""}`}
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
                        default Avatar will be the same as your login email account.
                      </div>
                    </div>
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
                  <div className="entryGroup col-md-12">
                    <h6 className="block-heading">Change password</h6>
                  </div>
                  <div className="passwordFields">
                    <div className="entryGroup col-md-12">
                      <label htmlFor="currentPass">Current password</label>
                      <div className="inputGrout">
                        <input
                          className="inputControl"
                          type={passwordVisibility.current ? "text" : "password"}
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
                    <div className="entryGroup col-md-12">
                      <label htmlFor="confirmPass">Confirm password</label>
                      <div className="inputGrout">
                        <input
                          className="inputControl"
                          type={passwordVisibility.confirm ? "text" : "password"}
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

            {/* ===== Payout Tab ===== */}
            <div
              id="payout"
              className={`tab-detail ${isActive === "payout" ? "active" : ""}`}
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
                    <div className={`content ${payGroup.payPal ? "active" : ""}`}>
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
                    <div className={`content ${payGroup.stripe ? "active" : ""}`}>
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

            {/* ===== Site Configs Tab ===== */}
            <div
              id="siteSettings"
              className={`tab-detail ${isActive === "siteSettings" ? "active" : ""}`}
            >
              <form onSubmit={handleSaveConfigs}>
                <div className="row block-from">

                  {/* Contact Info */}
                  <div className="entryGroup col-md-12 mt12">
                    <h6 className="block-heading">Contact Information</h6>
                  </div>
                  <div className="entryGroup col-md-6">
                    <label className="label-field">Site Email</label>
                    <input
                      type="email"
                      className="form-control input-field"
                      placeholder="info@hirix.pk"
                      value={siteConfigs.site_email}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, site_email: e.target.value }))}
                    />
                  </div>
                  <div className="entryGroup col-md-6">
                    <label className="label-field">Site Phone</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="+92 300 1234567"
                      value={siteConfigs.site_phone}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, site_phone: e.target.value }))}
                    />
                  </div>
                  <div className="entryGroup col-md-12">
                    <label className="label-field">Footer Address</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="Office 12, Ground Floor, Ezitech Solutions, Pakistan"
                      value={siteConfigs.footer_address}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, footer_address: e.target.value }))}
                    />
                  </div>

                  {/* Dynamic Social Media Links */}
                  <div className="entryGroup col-md-12 mt12" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h6 className="block-heading" style={{ margin: 0 }}>Social Media Links</h6>
                    <button
                      type="button"
                      className="civi-button"
                      style={{ padding: "6px 16px", fontSize: "13px" }}
                      onClick={handleAddSocial}
                    >
                      + Add More
                    </button>
                  </div>

                  {socialLinks.map((link, index) => (
                    <div key={index} className="entryGroup col-md-12" style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                      <div style={{ flex: "0 0 180px" }}>
                        <label className="label-field">Platform</label>
                        <select
                          className="form-control input-field"
                          value={link.platform}
                          onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                        >
                          {SOCIAL_PLATFORMS.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="label-field">URL</label>
                        <input
                          type="url"
                          className="form-control input-field"
                          placeholder={`https://${link.platform.toLowerCase().replace(" / x", "").replace(" ", "")}.com/hirix`}
                          value={link.url}
                          onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                        />
                      </div>
                      {socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSocial(index)}
                          style={{
                            background: "#fee2e2",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 12px",
                            cursor: "pointer",
                            color: "#dc2626",
                            marginBottom: "2px"
                          }}
                          title="Remove"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Site SEO */}
                  <div className="entryGroup col-md-12 mt12">
                    <h6 className="block-heading">Site SEO</h6>
                  </div>
                  <div className="entryGroup col-md-12">
                    <label className="label-field">Site Title (Default)</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="Hirix Pakistan – Find Jobs & Hire Talent"
                      value={siteConfigs.site_title}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, site_title: e.target.value }))}
                    />
                    <small style={{ color: "#64748b", fontSize: "12px", marginTop: "4px", display: "block" }}>
                      Used as the default &lt;title&gt; tag on your Next.js landing page.
                    </small>
                  </div>
                  <div className="entryGroup col-md-12">
                    <label className="label-field">Site Meta Description (Default)</label>
                    <textarea
                      className="form-control input-field"
                      rows={3}
                      placeholder="Hirix is Pakistan's leading job portal. Search thousands of jobs or post a vacancy and hire top talent today."
                      value={siteConfigs.site_meta_description}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, site_meta_description: e.target.value }))}
                      style={{ resize: "vertical" }}
                    />
                    <small style={{ color: "#64748b", fontSize: "12px", marginTop: "4px", display: "block" }}>
                      Keep under 160 characters for best SEO results. ({(siteConfigs.site_meta_description || "").length}/160)
                    </small>
                  </div>

                  {/* SEO & Analytics */}
                  <div className="entryGroup col-md-12 mt12">
                    <h6 className="block-heading">SEO &amp; Analytics</h6>
                  </div>
                  <div className="entryGroup col-md-6">
                    <label className="label-field">Google Tag Manager ID</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="GTM-XXXXXXX"
                      value={siteConfigs.gtm_id}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, gtm_id: e.target.value }))}
                    />
                  </div>
                  <div className="entryGroup col-md-6">
                    <label className="label-field">Meta Pixel ID</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="1234567890"
                      value={siteConfigs.pixel_id}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, pixel_id: e.target.value }))}
                    />
                  </div>
                  <div className="entryGroup col-md-12">
                    <label className="label-field">Google Search Console Verification Code</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="Paste your Google Site Verification meta content value here"
                      value={siteConfigs.gsc_verification}
                      onChange={(e) => setSiteConfigs(p => ({ ...p, gsc_verification: e.target.value }))}
                    />
                    <small style={{ color: "#64748b", fontSize: "12px", marginTop: "4px", display: "block" }}>
                      Only paste the <code>content="..."</code> value from the verification meta tag, not the full tag.
                    </small>
                  </div>

                  <div className="entryGroup col-md-12 mt-3">
                    <button className="civi-button" type="submit">
                      Save Site Configurations
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <AdFooter />
      </div>
    </>
  );
};

export default AdSettings;
