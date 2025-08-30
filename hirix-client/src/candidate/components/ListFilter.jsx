import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaArrowsSpin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ListFilter = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedJobTypes, setSelectedJobTypes] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [rate, setRate] = useState("");
  const [careerLevels, setCareerLevels] = useState("");
  const [experiences, setExperiences] = useState("");

  const [filterOptions, setFilterOptions] = useState({
    jobTypes: [],
    careerLevels: [],
    experiences: [],
  });

  const handleSingleCheckboxChange = (e, setState) => {
    const value = e.target.value;
    if (e.target.checked) {
      setState(value);
    } else {
      setState("");
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedJobTypes) params.append("jobTypes", selectedJobTypes);
    if (salaryMin) params.append("salaryMin", salaryMin);
    if (salaryMax) params.append("salaryMax", salaryMax);
    if (rate) params.append("rate", rate);
    if (careerLevels) params.append("careerLevels", careerLevels);
    if (experiences) params.append("experiences", experiences);

    navigate(`/?${params.toString()}`);
  };

  const handleClearAll = () => {
    setSelectedJobTypes("");
    setSalaryMin("");
    setSalaryMax("");
    setRate("");
    setCareerLevels("");
    setExperiences("");

    navigate("/");
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await fetch("https://server.hirix.pk/filtersCountData", {
          headers: {
            "x-access-token": token,
          },
        });
        const data = await res.json();
        setFilterOptions(data); // set this to state
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  return (
    <div>
      <div
        className="offcanvas offcanvas-start list-filter"
        tabIndex="-1"
        id="filterList"
        aria-labelledby="filterListLabel"
      >
        <div className="offcanvas-body ">
          <div className="archive-layout">
            <div className="civi-nav-filter active ">
              <div className="civi-filter-toggle">
                <span>Filter</span>
              </div>
              <div className="civi-clear-filter ">
                <FaArrowsSpin className=" me-2 mb-2 spin-icon" />
                <span onClick={handleClearAll}>Clear All</span>
              </div>
            </div>
            <form onSubmit={handleFilterSubmit}>
              <div className="civi-menu-filter">
                <div className="filter-jobs-type">
                  <div className="entry-filter">
                    <h4>Jobs Type</h4>
                    <ul className="filter-control custom-scrollbar jobs-type">
                      <ul className="filter-control custom-scrollbar jobs-type">
                        {filterOptions.jobTypes.map((type, index) => (
                          <li key={index}>
                            <input
                              type="checkbox"
                              className="custom-checkbox input-control"
                              name="jobs-type_id[]"
                              id={`jobtype_${index}`}
                              value={type.value}
                              checked={selectedJobTypes === type.value}
                              onChange={(e) =>
                                handleSingleCheckboxChange(
                                  e,
                                  setSelectedJobTypes
                                )
                              }
                            />
                            <label htmlFor={`jobtype_${index}`}>
                              {type.value === "full"
                                ? "Full Time"
                                : type.value === "internship"
                                ? "Internship"
                                : "Part Time"}
                              <span className="count">({type.count})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                </div>
                <div className="filter-salary">
                  <div className="entry-filter">
                    <h4>Salary</h4>
                    <div className="salary-filter">
                      <div className="filter filter-salary-min">
                        <input
                          type="number"
                          name="jobs_filter_salary_min"
                          placeholder="Min"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                        />
                      </div>
                      <div className="filter filter-salary-max">
                        <input
                          type="number"
                          name="jobs_filter_salary_max"
                          placeholder="Max"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                        />
                      </div>
                      <select
                        name="jobs_filter_rate"
                        className="civi-select2"
                        tabIndex={-1}
                        aria-hidden="true"
                        data-select2-id={2425}
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      >
                        <option value="" data-select2-id={2427}>
                          Rate
                        </option>
                        <option value="hour">Hour</option>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={2426}
                        style={{ width: 124 }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2-jobs_filter_rate-6d-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-jobs_filter_rate-6d-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Rate"
                            >
                              Rate
                            </span>
                            <span className="" role="presentation">
                              <IoChevronDown className="menu-icon" />
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="filter-jobs-career">
                  <div className="entry-filter">
                    <h4>Jobs Career</h4>
                    <ul className="filter-control custom-scrollbar jobs-career">
                      {filterOptions.careerLevels.map((type, index) => (
                        <li key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox input-control"
                            name="job-career_id[]"
                            id={`careerLevels_${index}`}
                            value={type.value}
                            checked={careerLevels === type.value}
                            onChange={(e) =>
                              handleSingleCheckboxChange(e, setCareerLevels)
                            }
                          />
                          <label htmlFor={`careerLevels_${index}`}>
                            {type.value === "starting"
                              ? "Fresher"
                              : type.value === "junior"
                              ? "Junior"
                              : type.value === "middle"
                              ? "Middle"
                              : "Senior"}
                            <span className="count">({type.count})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="filter-jobs-experience">
                  <div className="entry-filter">
                    <h4>Jobs Experience</h4>
                    <ul className="filter-control custom-scrollbar jobs-experience">
                      {filterOptions.experiences.map((type, index) => (
                        <li key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox input-control"
                            name="jobs-experience_id[]"
                            id={`experiences_${index}`}
                            value={type.value}
                            checked={experiences === String(type.value)}
                            onChange={(e) =>
                              handleSingleCheckboxChange(e, setExperiences)
                            }
                          />
                          <label htmlFor={`experiences_${index}`}>
                            {type.value === 2
                              ? "1 - 2 Years"
                              : type.value === 5
                              ? "3 - 5 Years"
                              : type.value === 9
                              ? "6 - 9 Years"
                              : "10+ Years"}
                            <span className="count">({type.count})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <button
                style={{
                  backgroundColor: "#4169E1",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFilter;
