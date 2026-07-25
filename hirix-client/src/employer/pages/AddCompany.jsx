import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { CiCamera } from "react-icons/ci";
import { RiNumbersFill, RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EmpFooter } from "../index.js";
import API, { BASE_URL } from "../../api";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddCompany = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  const check = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!check) navigate("/");
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [Name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [foundedIn, setFoundedIn] = useState(null);
  const [companySize, setCompanySize] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");
  const [Province, setProvince] = useState("");
  const [City, setCity] = useState("");
  const [Ntn, setNtn] = useState("");
  const today = new Date();
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

  // submit
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append text fields
    formData.append("name", Name?.trim());
    formData.append("E_mail", email?.trim());
    formData.append("categories", category?.trim());
    formData.append("About", des?.trim());
    formData.append("website_link", websiteLink?.trim());
    formData.append("twitter", Twitter?.trim());
    formData.append("facebook", facebook?.trim());
    formData.append("instagram", instagram?.trim());
    formData.append("linkedIn", LinkedIn?.trim());
    formData.append("founded_in", foundedIn);
    formData.append("total_members", companySize?.trim());
    formData.append("Contact", phone);
    formData.append("city", City?.trim());
    formData.append("province", Province?.trim());
    formData.append("Ntn", Ntn?.trim());

    // Append image if selected
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await API.post(
        `/add-company/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );
      alert(res.data.msg);
      navigate(`/employer/company`);
    } catch (error) {}
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
  // const nums = [
  //   { value: "PK", label: "PK" },
  //   { value: "US", label: "US" },
  // ];
  const city = [
    { value: "Lahore", label: "Lahore" },
    { value: "Rawalpindi", label: "Rawalpindi" },
    { value: "Karachi", label: "Karachi" },
    { value: "Islamabad", label: "Islamabad" },
  ];
  const province = [
    { value: "kpk", label: "Khyber Pakhtunkhwa" },
    { value: "punjab", label: "Punjab" },
    { value: "sindh", label: "Sindh" },
    { value: "balochistan", label: "Balochistan" },
  ];
  const ppl = [
    { value: "10-50", label: "10-50" },
    { value: "50-100", label: "50-100" },
    { value: "100-200", label: "100-200" },
    { value: "200-300", label: "200-300" },
  ];
  return (
    <div className="dashboardWrapper addCompany">
      <div className="entry-my-page submit-company-dashboard">
        <form action="#" onSubmit={submit} className="form-dashboard">
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
                    <button
                      to="/employer/employer-company"
                      type="submit"
                      className="btn-normal"
                    >
                      <span>Publish</span>
                      <span className="btn-loading">
                        <FaSpinner />
                      </span>
                    </button>
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
                          name="name"
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
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
                          value={cats.find(
                            (option) => option.value === category
                          )}
                          onChange={(selectedOption) =>
                            setCategory(selectedOption.value)
                          }
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
                        <ReactQuill
                          value={des}
                          onChange={setDes}
                          placeholder="Define Your Company..."
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label> Website</label>
                        <input
                          type="url"
                          name="websiteLink"
                          placeholder="www.domain.com"
                          value={websiteLink}
                          onChange={(e) => setWebsiteLink(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>Phone Number</label>
                        <div className=" d-flex">
                          {/* <Select
                            options={nums}
                            styles={customStyles}
                            className="border p-1 rounded-2"
                          /> */}
                          <PhoneInput
                            className="mt-1"
                            value={phone?.toString() || ""}
                            onChange={setPhone}
                            defaultCountry="PK"
                          />
                        </div>
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>
                          Email <sup>*</sup>
                        </label>
                        <input
                          type="email"
                          name="company_email"
                          placeholder="hello@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>
                          Founded in <sup>*</sup>
                        </label>
                        <DatePicker
                          selected={foundedIn}
                          onChange={(date) => setFoundedIn(date)}
                          dateFormat="yyyy"
                          showYearPicker
                          className="form-control border p-1 rounded-2 "
                          placeholderText="Select year"
                          maxDate={new Date(today.getFullYear(), 11, 31)}
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
                          value={ppl.find(
                            (option) => option.value === companySize
                          )}
                          onChange={(selectedOption) =>
                            setCompanySize(selectedOption.value)
                          }
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
                          placeholder="twitter.com/company"
                          value={Twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                        />
                      </div>
                      <div className="entryGroup col-12 col-sm-6">
                        <label>Linkedin</label>
                        <input
                          type="url"
                          name="company_linkedin"
                          placeholder="linkedin.com/company"
                          value={LinkedIn}
                          onChange={(e) => setLinkedIn(e.target.value)}
                        />
                      </div>
                      <div className=" col-12 col-sm-6">
                        <label>Facebook</label>
                        <input
                          type="url"
                          entryGroup
                          name="company_facebook"
                          placeholder="facebook.com/company"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </div>
                      <div className="entryGroup col-12 col-sm-6">
                        <label>Instagram</label>
                        <input
                          type="url"
                          name="company_instagram"
                          placeholder="instagram.com/company"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="field-social-clone">
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
                    </div> */}
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
                          value={province.find(
                            (option) => option.value === Province
                          )}
                          onChange={(selectedOption) =>
                            setProvince(selectedOption.value)
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>City</label>
                        <Select
                          options={city}
                          styles={customStyles}
                          name="city"
                          className="border p-1 rounded-2"
                          value={city.find((option) => option.value === City)}
                          onChange={(selectedOption) =>
                            setCity(selectedOption.value)
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label htmlFor="Ntn">Ntn</label>
                        <input
                          type="text"
                          name="Ntn"
                          value={Ntn}
                          onChange={(e) => setNtn(e.target.value)}
                        />
                      </div>

                      {/* <div className="entryGroup col-lg-6">
                        <label htmlFor="search-location">Share Location</label>
                        <div className="input-area">
                          <input
                            type="text"
                            placeholder="Share Google Map Location"
                          />
                        </div>
                      </div> */}
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

              {/* <div className="col-lg-4 col-md-5  text-wrap">
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
              </div> */}
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
