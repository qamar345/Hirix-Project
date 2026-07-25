import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import PhoneInput from "react-phone-number-input";
import { AdFooter } from "../index.js";
import API, { BASE_URL } from "../../api";

const AddManager = () => {
  const check = sessionStorage.getItem("isLoggedIn");
  const token = sessionStorage.getItem("token");
  const [isScrolled, setIsScrolled] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [provinces, setProvince] = useState("");
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!check) navigate("/admin-login");
  }, [check]);
  const cats = [
    { value: "Manager", label: "Manager" },
    { value: "Assistant", label: "Assistant" },
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (!handleValidation()) {
    //   setIsLoading(false);
    //   return;
    // }

    const payload = {
      FirstName: FirstName.trim(),
      email,
      role,
      phone: phone.trim(),
      City: City.trim(),
      province: provinces.trim(),
    };

    try {
      await axios
        .post("/addManager", payload, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          alert(res.data.msg);
          navigate(`/admin/user-management`);
        })
        .catch((err) => {});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboardWrapper addCompany">
      <div className="entry-my-page submit-company-dashboard">
        <form onSubmit={handleSubmit} className="form-dashboard">
          <div className="content-company">
            <div className="row ">
              <div className="col-lg-8 col-md-7 entry-section ">
                <div
                  className={`d-flex active justify-content-xl-between align-items-center justify-content-center px-3 pt-5 pb-4 my-4 ${
                    isScrolled ? "companyHeader" : ""
                  }`}
                >
                  <h4 className=" d-none d-xl-block">Add Staff</h4>
                  <div className="btn-wrapper d-flex gap-4">
                    <Link to="/admin/user-management" className="btn-outline">
                      Cancel
                    </Link>
                    <button
                      // to="/admin/user-management"
                      type="submit"
                      className="btn-normal"
                    >
                      <span>Add</span>
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
                          Name <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          id="company_title"
                          placeholder="Name"
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label>
                          Role <sup>*</sup>
                        </label>

                        <Select
                          options={cats}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          value={cats.find((c) => c.value === role)}
                          onChange={(selectedOption) =>
                            setRole(selectedOption.value)
                          }
                        />
                      </div>

                      <div className="entryGroup col-md-6">
                        <label className="mb-1">Phone Number</label>
                        <div className="">
                          <PhoneInput
                            className="signUpPhone"
                            defaultCountry="PK"
                            value={phone}
                            onChange={setPhone}
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
                          placeholder="hello@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="block-from mt12" id="company-submit-location">
                    <h6 className="block-heading">Location</h6>
                    <div className="row">
                      <div className="entryGroup col-lg-6">
                        <label>Province</label>
                        <Select
                          options={province}
                          styles={customStyles}
                          className="border p-1 rounded-2"
                          value={province.find((p) => p.value === provinces)}
                          onChange={(selectedOption) =>
                            setProvince(
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                        />
                      </div>

                      <div className="entryGroup col-lg-6">
                        <label>City</label>
                        <Select
                          options={city}
                          styles={customStyles}
                          id="city"
                          value={city.find((l) => l.value === City)}
                          onChange={(selectedOption) =>
                            setCity(selectedOption ? selectedOption.value : "")
                          }
                          className="border p-1 rounded-2"
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
        <AdFooter />
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

export default AddManager;
