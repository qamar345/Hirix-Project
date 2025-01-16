import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaArrowsSpin } from "react-icons/fa6";
const ListFilter = () => {
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
                <span>Clear All</span>
              </div>
            </div>

            <div className="civi-menu-filter">
              <div className="filter-jobs-type">
                <div className="entry-filter">
                  <h4>Jobs Type</h4>
                  <ul className="filter-control custom-scrollbar jobs-type">
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-type_id[]"
                        defaultValue={68}
                        id="civi_68"
                      />
                      <label htmlFor="civi_68">
                        Full Time<span className="count">(38)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-type_id[]"
                        defaultValue={73}
                        id="civi_73"
                      />
                      <label htmlFor="civi_73">
                        Internship<span className="count">(0)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-type_id[]"
                        defaultValue={88}
                        id="civi_88"
                      />
                      <label htmlFor="civi_88">
                        Part Time<span className="count">(12)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-type_id[]"
                        defaultValue={92}
                        id="civi_92"
                      />
                      <label htmlFor="civi_92">
                        Remote<span className="count">(22)</span>
                      </label>
                    </li>
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
                      />
                    </div>
                    <div className="filter filter-salary-max">
                      <input
                        type="number"
                        name="jobs_filter_salary_max"
                        placeholder="Max"
                      />
                    </div>
                    <select
                      name="jobs_filter_rate"
                      className="civi-select2 select2-hidden-accessible"
                      tabIndex={-1}
                      aria-hidden="true"
                      data-select2-id={2425}
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
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-career_id[]"
                        defaultValue={67}
                        id="civi_67"
                      />
                      <label htmlFor="civi_67">
                        Fresher<span className="count">(1)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-career_id[]"
                        defaultValue={74}
                        id="civi_74"
                      />
                      <label htmlFor="civi_74">
                        Junior<span className="count">(12)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-career_id[]"
                        defaultValue={82}
                        id="civi_82"
                      />
                      <label htmlFor="civi_82">
                        Middle<span className="count">(26)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-career_id[]"
                        defaultValue={98}
                        id="civi_98"
                      />
                      <label htmlFor="civi_98">
                        Senior<span className="count">(33)</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter-jobs-experience">
                <div className="entry-filter">
                  <h4>Jobs Experience</h4>
                  <ul className="filter-control custom-scrollbar jobs-experience">
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-experience_id[]"
                        defaultValue={7}
                        id="civi_7"
                      />
                      <label htmlFor="civi_7">
                        1 - 2 Years<span className="count">(22)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-experience_id[]"
                        defaultValue={16}
                        id="civi_16"
                      />
                      <label htmlFor="civi_16">
                        3 - 5 Years<span className="count">(29)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-experience_id[]"
                        defaultValue={26}
                        id="civi_26"
                      />
                      <label htmlFor="civi_26">
                        6 - 9 Years<span className="count">(9)</span>
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="custom-checkbox input-control"
                        name="jobs-experience_id[]"
                        defaultValue={9}
                        id="civi_9"
                      />
                      <label htmlFor="civi_9">
                        10+ Years<span className="count">(12)</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFilter;
