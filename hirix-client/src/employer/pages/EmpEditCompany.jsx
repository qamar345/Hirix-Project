// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSpinner, FaCheckCircle } from "react-icons/fa";
// import { PiMapPin } from "react-icons/pi";
// import { CiCamera } from "react-icons/ci";
// import { RiUploadLine } from "react-icons/ri";
// import { IoCloseSharp } from "react-icons/io5";
// import Select from "react-select";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import { EmpFooter } from "../index.js";
// import API, { BASE_URL } from "../../api";

// const EmpEditCompany = () => {
//   const navigate = useNavigate();
//   const editId = sessionStorage.getItem("editCompanyData");
//     const id = sessionStorage.getItem("id");
//   const check = sessionStorage.getItem("isLoggedIn");
//   useEffect(() => {
//     if (!check) navigate("/");
//   });
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [Name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [des, setDes] = useState("");
//   const [websiteLink, setWebsiteLink] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [foundedIn, setFoundedIn] = useState("");
//   const [companySize, setCompanySize] = useState("");
//   const [Twitter, setTwitter] = useState("");
//   const [facebook, setFacebook] = useState("");
//   const [instagram, setInstagram] = useState("");
//   const [LinkedIn, setLinkedIn] = useState("");
//   const [Province, setProvince] = useState("");
//   const [City, setCity] = useState("");
//   const [Ntn, setNtn] = useState("");
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 150) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup the event listener
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (editId && editId !== "new") {
//       axios
//         .get(`/getSpecificCompany/${editId}`)
//         .then((res) => {
//   // submit
//   const submit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       name: Name?.trim(),
//       E_mail: email?.trim(),
//       categories: category?.trim(),
//       About: des?.trim(),
//       website_link: websiteLink?.trim(),
//       twitter: Twitter?.trim(),
//       facebook: facebook?.trim(),
//       instagram: instagram?.trim(),
//       linkedIn: LinkedIn?.trim(),
//       founded_in: foundedIn?.trim(),
//       total_members: companySize,
//       Contact: phone,
//       city: City?.trim(),
//       province: Province?.trim(),
//       Ntn: Ntn?.trim(),
//     };

//     try {
//       const res = await API.put(`/edit-company/${editId}`, payload);
//       alert(res.data.msg);
//       navigate(`/employer/company`);
//     } catch (error) {
//           }
//   };

//   return (
//     <>
//     <div className="dashboardWrapper addCompany">
//       <div className="entry-my-page submit-company-dashboard">
//         <form action="#" onSubmit={submit} className="form-dashboard">
//           <div className="content-company">
//             <div className="row ">
//               <div className="col-lg-8 col-md-7 entry-section ">
//                 <div
//                   className={`d-flex active justify-content-xl-between align-items-center justify-content-center px-3 pt-5 pb-4 my-4 ${
//                     isScrolled ? "companyHeader" : ""
//                   }`}
//                 >
//                   <h4 className=" d-none d-xl-block">Submit company</h4>
//                   <div className="btn-wrapper d-flex gap-4">
//                     <Link
//                       to="/employer/employer-company"
//                       className="btn-outline"
//                     >
//                       Cancel
//                     </Link>
//                     <button type="submit" className="btn-normal">
//                       <span>Update</span>
//                       <span className="btn-loading">
//                         <FaSpinner />
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="companyData">
//                   <div className="block-from ">
//                     <h6 className="block-heading">Basic info</h6>
//                     <div className="row">
//                       <div className="entryGroup col-md-6">
//                         <label htmlFor="company_title">
//                           Company name <sup>*</sup>
//                         </label>
//                         <input
//                           type="text"
//                           id="company_title"
//                           name="name"
//                           value={Name}
//                           onChange={(e) => setName(e.target.value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-md-6">
//                         <label>
//                           Categories <sup>*</sup>
//                         </label>
//                         <input
//                         type="text"
//                         name="category"
//                           value={category}
//                           onChange={(e) => setCategory(e.target.value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-md-12">
//                         <label className="label-des-company">
//                           About company <sup>*</sup>
//                         </label>
//                         <ReactQuill
//                           value={des}
//                           onChange={(value) => setDes(value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-md-6">
//                         <label> Website</label>
//                         <input
//                           type="url"
//                           name="websiteLink"
//                           value={websiteLink}
//                           onChange={(e) => setWebsiteLink(e.target.value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-md-6">
//                         <label>Phone Number</label>
//                         <div className=" d-flex">
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                           />
//                         </div>
//                       </div>

//                       <div className="entryGroup col-md-6">
//                         <label>
//                           Email <sup>*</sup>
//                         </label>
//                         <input
//                           type="email"
//                           name="company_email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-md-6">
//                         <label>Founded in</label>
//                         <input
//                           type="text"
//                           value={foundedIn}
//                           onChange={(e) => setFoundedIn(e.target.value)}
//                         />
//                       </div>
//                       <div className="entryGroup col-md-6">
//                         <label>
//                           Company size <sup>*</sup>
//                         </label>
//                         <input
//                           type="number"
//                           value={companySize}
//                           onChange={(e) => setCompanySize(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* <div className="block-from mt12">
//                     <h6 className="block-heading">Media</h6>
//                     <div className=" d-flex">
//                       <div className="company-fields-avatar civi-fields-avatar">
//                         <label>Logo</label>

//                         <div className="file-uploader">
//                           {!uploadedImage ? (
//                             <label className="upload-label">
//                               <RiUploadLine className="upload-icon" />
//                               <span>Upload</span>
//                               <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleLogoUpload}
//                                 className="hidden-input"
//                               />
//                             </label>
//                           ) : (
//                             <div className="image-preview">
//                               <img
//                                 src={uploadedImage}
//                                 alt="Uploaded Preview"
//                                 className="img-preview"
//                               />
//                               <div className="close-btn">
//                                 <button onClick={handleCancelUpload}>
//                                   <IoCloseSharp className="icon" />
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         <div className="field-warning">
//                           Maximum file size: 1400kb.
//                         </div>
//                       </div>
//                     </div>
//                   </div> */}

//                   <div className="block-from mt12" id="company-submit-social">
//                     <h6 className="block-heading">Social network</h6>
//                     <div className="row">
//                       <div className="entryGroup col-12 col-sm-6">
//                         <label>Twitter</label>
//                         <input
//                           type="url"
//                           name="company_twitter"
//                           value={Twitter}
//                           onChange={(e) => setTwitter(e.target.value)}
//                         />
//                       </div>
//                       <div className="entryGroup col-12 col-sm-6">
//                         <label>Linkedin</label>
//                         <input
//                           type="url"
//                           name="company_linkedin"
//                           value={LinkedIn}
//                           onChange={(e) => setLinkedIn(e.target.value)}
//                         />
//                       </div>
//                       <div className=" col-12 col-sm-6">
//                         <label>Facebook</label>
//                         <input
//                           type="url"
//                           entryGroup
//                           name="company_facebook"
//                           value={facebook}
//                           onChange={(e) => setFacebook(e.target.value)}
//                         />
//                       </div>
//                       <div className="entryGroup col-12 col-sm-6">
//                         <label>Instagram</label>
//                         <input
//                           type="url"
//                           name="company_instagram"
//                           value={instagram}
//                           onChange={(e) => setInstagram(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="block-from mt12" id="company-submit-location">
//                     <h6 className="block-heading">Location</h6>
//                     <div className="row">
//                       <div className="entryGroup col-lg-6">
//                         <label>Province</label>
//                         <input
//                         type="text"
//                           name="province"
//                           value={Province}
//                           onChange={(e) => setProvince(e.target.value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-lg-6">
//                         <label>City</label>
//                         <input
//                         type="text"
//                           name="city"
//                           value={City}
//                           onChange={(e) => setCity(e.target.value)}
//                         />
//                       </div>

//                       <div className="entryGroup col-lg-6">
//                         <label htmlFor="Ntn">Ntn</label>
//                         <input
//                           type="text"
//                           name="Ntn"
//                           value={Ntn}
//                           onChange={(e) => setNtn(e.target.value)}
//                         />
//                       </div>

//                       {/* <div className="entryGroup col-lg-6">
//                         <label htmlFor="search-location">Share Location</label>
//                         <div className="input-area">
//                           <input
//                             type="text"
//                             placeholder="Share Google Map Location"
//                           />
//                         </div>
//                       </div> */}
//                       <div className="entryGroup col-md-12 company-fields-map">
//                         <div className="company-fields company-map">
//                           <div id="mapbox_map" className="civi-map-warpper">
//                             <iframe
//                               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13292.266508363678!2d73.0264386!3d33.6035757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df946f24e9fa83%3A0x5c0a503ad0bd55b4!2sEziline%20Software%20House%20Pvt%20Ltd!5e0!3m2!1sen!2s!4v1731045209730!5m2!1sen!2s"
//                               height={300}
//                               className="w-100"
//                               allowFullScreen=""
//                               loading="lazy"
//                               referrerPolicy="no-referrer-when-downgrade"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <div className="footer mt-5">
//         <EmpFooter />
//       </div>
//     </div>
//     </>
//   );
// };

// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     backgroundColor: "transparent",

//     border: "0",

//     boxShadow: state.isFocused ? "0 0 0 2px transparent" : null,
//     "&:hover": { borderColor: "0" },
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected
//       ? "#e6f2ff"
//       : state.isFocused
//       ? "#e6f2ff"
//       : null,
//     color: state.isSelected ? "#126ebb" : "#333",
//     "&:active": { backgroundColor: "#e6f2ff" },
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     color: "#000",
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "#333",
//   }),
// };

// export default EmpEditCompany;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { RiUploadLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { EmpFooter } from "../index.js";
import API, { BASE_URL } from "../../api";
import { useGetSpecificCompanyQuery, useEditCompanyMutation } from "../../store/employerApi";
import { showSuccess, showError } from "../../utils/toast";

const EmpEditCompany = () => {
  const navigate = useNavigate();
  const editId = JSON.parse(sessionStorage.getItem("editCompanyData"));
  const check = sessionStorage.getItem("isLoggedIn");
  const { data: specificCompanyData } = useGetSpecificCompanyQuery(editId, { skip: !editId || editId === "new" });
  const [editCompanyMutation] = useEditCompanyMutation();

  useEffect(() => {
    if (!check) navigate("/");
  }, [check, navigate]);

  const [isScrolled, setIsScrolled] = useState(false);

  // Form states
  const [Name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [foundedIn, setFoundedIn] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");
  const [Province, setProvince] = useState("");
  const [City, setCity] = useState("");
  const [Ntn, setNtn] = useState("");

  // Logo upload state (optional, for commented block)
  // const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const data = specificCompanyData?.[0] || specificCompanyData?.company;
    if (data) {
      setName(data.name || "");
      setCategory(data.categories || "");
      setDes(data.About || "");
      setWebsiteLink(data.website_link || "");
      setPhone(data.Contact || "");
      setEmail(data.E_mail || "");
      setFoundedIn(data.founded_in || "");
      setCompanySize(data.total_members || "");
      setTwitter(data.twitter || "");
      setFacebook(data.facebook || "");
      setInstagram(data.instagram || "");
      setLinkedIn(data.linkedIn || "");
      setProvince(data.province || "");
      setCity(data.city || "");
      setNtn(data.Ntn || "");
    }
  }, [specificCompanyData]);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      name: Name?.trim(),
      E_mail: email?.trim(),
      categories: category?.trim(),
      About: des?.trim(),
      website_link: websiteLink?.trim(),
      twitter: Twitter?.trim(),
      facebook: facebook?.trim(),
      instagram: instagram?.trim(),
      linkedIn: LinkedIn?.trim(),
      founded_in: foundedIn ? foundedIn.toString().trim() : "",
      total_members: companySize,
      Contact: phone,
      city: City?.trim(),
      province: Province?.trim(),
      Ntn: Ntn?.trim(),
    };

    try {
      const res = await editCompanyMutation({ id: editId, payload }).unwrap();
      showSuccess(res.msg || "Company updated successfully!");
      navigate(`/employer/company`);
    } catch (error) {
      console.error("Error updating company:", error);
      showError("Failed to update company.");
    }
  };

  // ===== OPTIONAL LOGO FUNCTIONS =====
  /*
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = (e) => {
    e.preventDefault();
    setUploadedImage(null);
  };
  */

  return (
    <>
      <div className="dashboardWrapper addCompany">
        <div className="entry-my-page submit-company-dashboard">
          <form onSubmit={submit} className="form-dashboard">
            <div className="content-company">
              <div className="row">
                <div className="col-lg-8 col-md-7 entry-section">
                  <div
                    className={`d-flex active justify-content-xl-between align-items-center justify-content-center px-3 pt-5 pb-4 my-4 ${
                      isScrolled ? "companyHeader" : ""
                    }`}
                  >
                    <h4 className="d-none d-xl-block">Submit company</h4>
                    <div className="btn-wrapper d-flex gap-4">
                      <Link
                        to="/employer/employer-company"
                        className="btn-outline"
                      >
                        Cancel
                      </Link>
                      <button type="submit" className="btn-normal">
                        <span>Update</span>
                        <span className="btn-loading">
                          <FaSpinner />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="companyData">
                    <div className="block-from">
                      <h6 className="block-heading">Basic info</h6>
                      <div className="row">
                        <div className="entryGroup col-md-6">
                          <label>
                            Company name <sup>*</sup>
                          </label>
                          <input
                            type="text"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>
                            Categories <sup>*</sup>
                          </label>
                          <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-md-12">
                          <label>
                            About company <sup>*</sup>
                          </label>
                          <ReactQuill value={des} onChange={setDes} />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>Website</label>
                          <input
                            type="url"
                            value={websiteLink}
                            onChange={(e) => setWebsiteLink(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>
                            Email <sup>*</sup>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>Founded in</label>
                          <input
                            type="text"
                            value={foundedIn}
                            onChange={(e) => setFoundedIn(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-md-6">
                          <label>
                            Company size <sup>*</sup>
                          </label>
                          <input
                            type="number"
                            value={companySize}
                            onChange={(e) => setCompanySize(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ========== OPTIONAL LOGO UPLOAD ========== */}
                    {/*
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
                                <img src={uploadedImage} alt="Uploaded Preview" className="img-preview" />
                                <div className="close-btn">
                                  <button onClick={handleCancelUpload}>
                                    <IoCloseSharp className="icon" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="field-warning">Maximum file size: 1400kb.</div>
                        </div>
                      </div>
                    </div>
                    */}
                    {/* ========== END OPTIONAL LOGO UPLOAD ========== */}

                    <div className="block-from mt12" id="company-submit-social">
                      <h6 className="block-heading">Social network</h6>
                      <div className="row">
                        <div className="entryGroup col-sm-6">
                          <label>Twitter</label>
                          <input
                            type="url"
                            value={Twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-sm-6">
                          <label>Linkedin</label>
                          <input
                            type="url"
                            value={LinkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-sm-6">
                          <label>Facebook</label>
                          <input
                            type="url"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-sm-6">
                          <label>Instagram</label>
                          <input
                            type="url"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="block-from mt12"
                      id="company-submit-location"
                    >
                      <h6 className="block-heading">Location</h6>
                      <div className="row">
                        <div className="entryGroup col-lg-6">
                          <label>Province</label>
                          <input
                            type="text"
                            value={Province}
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-lg-6">
                          <label>City</label>
                          <input
                            type="text"
                            value={City}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div className="entryGroup col-lg-6">
                          <label>Ntn</label>
                          <input
                            type="text"
                            value={Ntn}
                            onChange={(e) => setNtn(e.target.value)}
                          />
                        </div>

                        <div className="entryGroup col-md-12 company-fields-map">
                          <div className="company-fields company-map">
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
            </div>
          </form>
        </div>
        <div className="footer mt-5">
          <EmpFooter />
        </div>
      </div>
    </>
  );
};

export default EmpEditCompany;
