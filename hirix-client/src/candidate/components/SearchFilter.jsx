import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoChevronDown } from "react-icons/io5";
import { CiFolderOn } from "react-icons/ci";
import { ImSpinner } from "react-icons/im";
import { searchFilterImg } from "../assets/images/index.js";
import { job } from "../assets/icons/index.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchFilter = () => {
  const [job, setjob] = useState("");
  const [category, setcategory] = useState("");
  const [city, setcity] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  // const [jobData, setJobData] = useState(false)

  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (job.trim() !== "" || city.trim() !== "" || category.trim() !== "") {
      navigate(
        `?search=${encodeURIComponent(job)}&city=${city}&category=${category}`
      );
    }
  };
  const handleClearSearch = () => {
    setjob("");
    setcategory("");
    setcity("");
    navigate("/");
  };
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`https://testserver.hirix.pk/getSkills`);
        setSkillsList(res.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);
  return (
    <div className="archive-layout archive-jobs filter-canvas search-section">
      <div
        className="archive-jobs-top archive-filter-top has-bg"
        style={{
          backgroundImage: `url(${searchFilterImg})`,
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: "3.4rem", fontWeight: "normal" }}>
            Find Your Dream Jobs
          </h2>
          <form
            onSubmit={handleSearchSubmit}
            className="form-jobs-top-filter form-archive-top-filter"
          >
            <div className="row">
              <div className="form-group h-100">
                <input
                  className="jobs-search-control archive-search-control ui-autocomplete-input "
                  id="jobs_filter_search"
                  type="text"
                  name="jobs_filter_search"
                  placeholder="Jobs title or keywords"
                  value={job}
                  onChange={(e) => setjob(e.target.value)}
                />
                <span className="btn-filter-search">
                  <GoSearch className="icon" />
                </span>
              </div>

              <div className="form-group civi-form-location h-100 ">
                <input
                  className="archive-search-location "
                  type="text"
                  name="jobs-search-location"
                  placeholder="All Cities"
                  autoComplete="off"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />

                <span className="icon-location">
                  <svg
                    className="mb-2"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_8969_23265)">
                      <path
                        d="M13 1L13.001 4.062C14.7632 4.28479 16.4013 5.08743 17.6572 6.34351C18.9131 7.5996 19.7155 9.23775 19.938 11H23V13L19.938 13.001C19.7153 14.7631 18.9128 16.401 17.6569 17.6569C16.401 18.9128 14.7631 19.7153 13.001 19.938L13 23H11V19.938C9.23775 19.7155 7.5996 18.9131 6.34351 17.6572C5.08743 16.4013 4.28479 14.7632 4.062 13.001L1 13V11H4.062C4.28459 9.23761 5.08713 7.59934 6.34324 6.34324C7.59934 5.08713 9.23761 4.28459 11 4.062V1H13ZM12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10Z"
                        fill="#999999"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_8969_23265">
                        <rect width={24} height={24} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                {/* <span className="icon-arrow">
                  <IoChevronDown className="icon" />
                </span> */}
              </div>

              <div className="form-group category-group">
                <CiFolderOn className="folder-icon" />

                {/* <span className="select2 select2-container "> */}
                {/* <span className="selection">  */}
                {/* <span
                      className="select2-selection select2-selection--single"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                      aria-disabled="false"
                      aria-labelledby="select2-jobs-categories-re-container"
                    >
                      <div className="form-group category-group">
                        <CiFolderOn className="folder-icon" /> */}

                <select
                  className="select2 select2-container "
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option value="">All Skills</option>
                  {skillsList.map((skill) => (
                    <option key={skill.id} value={skill.name}>
                      {skill.name}
                    </option>
                  ))}
                </select>
                {/* </div> */}

                {/* <span
                        type="text"
                        className="select2-selection__rendered"
                        id="select2-jobs-categories-re-container"
                        role="textbox"
                        aria-readonly="true"
                        title="All Categories"
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        All Categories
                      </span> */}
                {/* <span className="" role="presentation">
                        <span className="icon-arrow">
                          <IoChevronDown className="icon" />
                        </span>
                        <b role="presentation" />
                      </span> */}
                {/* </span> */}
                {/* </span> */}
                {/* <span className="dropdown-wrapper" aria-hidden="true" /> */}
                {/* </span> */}
              </div>

              <div className="form-group last ">
                <span
                  className="civi-clear-top-filter "
                  onClick={handleClearSearch}
                >
                  Clear
                </span>

                <button
                  type="submit"
                  onClick={onclick}
                  className="btn-top-filter civi-button ms-lg-4"
                >
                  Search
                  <span className="btn-loading">
                    <ImSpinner />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
