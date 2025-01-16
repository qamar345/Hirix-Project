import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { CiCamera } from "react-icons/ci";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmpFooter } from "../index.js";
const AddCompany = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [companyData, setCompanyData] = useState({
    title: "",
    city: null,
    province: null,
    description: "",
    logo: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputCity = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      city: selectedOption,
    }));
  };

  const handleInputProvince = (selectedOption) => {
    setCompanyData((prevData) => ({
      ...prevData,
      province: selectedOption,
    }));
  };

  const handleQuillChange = (value) => {
    setCompanyData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);

        setCompanyData((prevData) => ({
          ...prevData,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setUploadedImage(null);

    setCompanyData((prevData) => ({
      ...prevData,
      logo: null,
    }));
  };

  const cats = [
    { value: "", label: "Select an option" },
    { value: "b2b", label: "B2B SaaS" },
    { value: "ecom", label: "E-Commerce" },
    { value: "enterpriseSoftware", label: "Enterprise Software" },
    { value: "fintech", label: "Fintech" },
    { value: "saas", label: "SaaS" },
    { value: "software", label: "Software" },
    { value: "webDev", label: "Web Development" },
  ];
  const nums = [
    { value: "lhr", label: "Lahore" },
    { value: "rwp", label: "Rawalpindi" },
    { value: "khi", label: "Karachi" },
    { value: "isb", label: "Islamabad" },
  ];
  const city = [
    { value: "lhr", label: "Lahore" },
    { value: "rwp", label: "Rawalpindi" },
    { value: "khi", label: "Karachi" },
    { value: "isb", label: "Islamabad" },
  ];
  const province = [
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "punjab", label: "Punjab" },
    { value: "sindh", label: "Sindh" },
    { value: "balochistan", label: "Balochistan" },
  ];
  const yrs = [
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];
  const ppl = [
    { value: "1050", label: "10-50" },
    { value: "50100", label: "50-100" },
    { value: "100200", label: "100-200" },
    { value: "200300", label: "200-300" },
  ];
  return (
    <div className="dashboardWrapper addCompany">
      <div className="entry-my-page submit-company-dashboard">
        <form action="#" className="form-dashboard">
          <div className="content-company">
            <div className="row ">
              <div className="col-lg-8 col-md-7 entry-section ">
                <div
                  className={`d-flex active justify-content-xl-between align-items-center justify-content-center px-3 pt-5 pb-4 my-4 ${
                    isScrolled ? "companyHeader" : ""
                  }`}
                >
                  <h4 className=" d-none d-xl-block">Submit company</h4>
                  <div className="btn-wrapper d-flex gap-4">
                    <Link
                      to="/employer/employer-company"
                      className="btn-outline"
                    >
                      Cancel
                    </Link>
                    <Link
                      to="/employer/employer-company"
                      type="submit"
                      className="btn-normal"
                    >
                      <span>Publish</span>
                      <span className="btn-loading">
                        <FaSpinner />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="companyData">
                  <div className="block-from ">
                    <h6 className="block-heading">Basic info</h6>
                    <div className="row">
                      <div className="entryGroup col-md-6">
                        <label htmlFor="company_title">
                          Company name <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          id="company_title"
                          name="title"
                          value={companyData.title}
                          onChange={handleInputChange}
                          placeholder="Name"
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>
                          Categories <sup>*</sup>
                        </label>

                        <Select
                          options={cats}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                        />
                      </div>

                      {/* <div className="entryGroup col-md-12">
                      <label>Company Url Slug</label>
                      <div className="company-url-warp">
                        <input
                          className="input-url"
                          type="text"
                          placeholder="#"
                          disabled=""
                        />
                        <input
                          className="input-slug"
                          type="text"
                          id="company_url"
                          name="company_url"
                          placeholder="company-name"
                        />
                      </div>
                    </div> */}

                      <div className="entryGroup col-md-12">
                        <label className="label-des-company">
                          About company <sup>*</sup>
                        </label>

                        {/* <Editor
                          value={companyData.description}
                          onChange={handleQuillChange}
                          placeholder="Enter job description here..."
                      /> */}
                        <ReactQuill
                          value={companyData.description}
                          onChange={handleQuillChange}
                          placeholder="Define Your Company..."
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label> Website</label>
                        <input
                          type="url"
                          id="company_website"
                          name="company_website"
                          placeholder="www.domain.com"
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>Phone Number</label>
                        <div className=" d-flex">
                          <Select
                            options={nums}
                            styles={customStyles}
                            className="border p-1 rounded-2"
                          />
                          <input
                            type="tel"
                            id="company_phone"
                            name="company_phone"
                            placeholder="+00 12 334 5678"
                          />
                        </div>
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>
                          Email <sup>*</sup>
                        </label>
                        <input
                          type="email"
                          id="company_email"
                          name="company_email"
                          placeholder="hello@domain.com"
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>Founded in</label>
                        <Select
                          options={yrs}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                        />
                      </div>
                      <div className="entryGroup col-md-6">
                        <label>
                          Company size <sup>*</sup>
                        </label>
                        <Select
                          options={ppl}
                          styles={customStyles}
                          className="border p-1 rounded-2 mb-3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12">
                    <h6 className="block-heading">Media</h6>
                    <div className=" d-flex">
                      <div className="company-fields-avatar civi-fields-avatar">
                        <label>Logo</label>

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

                        <div className="field-warning">
                          Maximum file size: 1400kb.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12" id="company-submit-social">
                    <h6 className="block-heading">Social network</h6>
                    <div className="row">
                      <div className="entryGroup col-12 col-sm-6">
                        <label>Twitter</label>
                        <input
                          type="url"
                          name="company_twitter"
                          id="company_twitter"
                          placeholder="twitter.com/company"
                        />
                      </div>
                      <div className="entryGroup col-12 col-sm-6">
                        <label>Linkedin</label>
                        <input
                          type="url"
                          name="company_linkedin"
                          id="company_linkedin"
                          placeholder="linkedin.com/company"
                        />
                      </div>
                      <div className=" col-12 col-sm-6">
                        <label>Facebook</label>
                        <input
                          type="url"
                          entryGroup
                          name="company_facebook"
                          id="company_facebook"
                          placeholder="facebook.com/company"
                        />
                      </div>
                      <div className="entryGroup col-12 col-sm-6">
                        <label>Instagram</label>
                        <input
                          type="url"
                          name="company_instagram"
                          id="company_instagram"
                          placeholder="instagram.com/company"
                        />
                      </div>
                    </div>
                    <div className="field-social-clone">
                      <div className="clone-wrap">
                        <div className="soical-remove-inner">
                          <a href="#" className="remove-social">
                            <i className="fas fa-times" />
                          </a>
                          <span>
                            Network
                            <span className="number-network" />
                          </span>
                        </div>
                        <div className="row field-wrap">
                          <div className="form-group col-12 col-sm-6">
                            <label>Name</label>
                            <input
                              type="text"
                              name="company_social_name[]"
                              placeholder="Company"
                            />
                          </div>
                          <div className="form-group col-12 col-sm-6">
                            <label>Url</label>
                            <input
                              type="url"
                              name="company_social_url[]"
                              placeholder="url.com/company"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12" id="company-submit-location">
                    <h6 className="block-heading">Location</h6>
                    <div className="row">
                      <div className="entryGroup col-lg-6">
                        <label>Province</label>
                        <Select
                          name="province"
                          options={province}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          value={companyData.province}
                          onChange={handleInputProvince}
                          id="province"
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>City</label>
                        <Select
                          options={city}
                          styles={customStyles}
                          id="city"
                          name="city"
                          className="border p-1 rounded-2"
                          value={companyData.city}
                          onChange={handleInputCity}
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="number"
                          name="postalCode"
                          id="postalCode"
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label htmlFor="search-location">Share Location</label>
                        <div className="input-area">
                          <input
                            type="text"
                            placeholder="Share Google Map Location"
                          />
                        </div>
                      </div>
                      <div className="entryGroup col-md-12 company-fields-map">
                        <div className="company-fields company-map">
                          <div id="mapbox_map" className="civi-map-warpper">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13292.266508363678!2d73.0264386!3d33.6035757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df946f24e9fa83%3A0x5c0a503ad0bd55b4!2sEziline%20Software%20House%20Pvt%20Ltd!5e0!3m2!1sen!2s!4v1731045209730!5m2!1sen!2s"
                              height={300}
                              className="w-100"
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-5  text-wrap">
                <div
                  className={`widget-area-init  ${
                    isScrolled ? "preview-section" : ""
                  }`}
                >
                  <div className="about-company-dashboard block-archive-sidebar">
                    <h3 className="title-company-about">Preview</h3>
                    <div className="info-company">
                      <div className="img-preview">
                        {companyData.logo ? (
                          <img src={companyData.logo} alt="Company Logo" />
                        ) : (
                          <CiCamera />
                        )}
                      </div>
                      <div className="company-right">
                        <div className="title-wapper">
                          <h4 className="title-about">
                            {companyData.title || "Company name "}
                          </h4>
                          <FaCheckCircle className="ms-3" />
                        </div>
                        <PiMapPin className="me-2  mb-1" />
                        <span className="location-about">
                          {companyData.province
                            ? companyData.province.label
                            : "Province "}
                        </span>
                        <span> , </span>
                        <span className="location-about">
                          {companyData.city ? companyData.city.label : "City"}
                        </span>
                        <div
                          className="text-wrap"
                          dangerouslySetInnerHTML={{
                            __html:
                              companyData.description ||
                              "Tell About your company",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="footer mt-5">
        <EmpFooter />
      </div>
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",

    border: "0",

    boxShadow: state.isFocused ? "0 0 0 2px transparent" : null,
    "&:hover": { borderColor: "0" },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e6f2ff"
      : state.isFocused
      ? "#e6f2ff"
      : null,
    color: state.isSelected ? "#126ebb" : "#333",
    "&:active": { backgroundColor: "#e6f2ff" },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
};

export default AddCompany;
