import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { avatarUxper } from "../assets/icons/index.js";
import Table from "react-bootstrap/Table";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH,
} from "react-icons/fa";
import { CanFooter } from "../index.js";
import Select from "react-select";
const CanJobs = () => {
  const [activeTab, setActiveTab] = useState("applied");
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  const jobAge = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "featured", label: "Featured" },
  ];
  const jobPage = [
    { value: "one", label: "10" },
    { value: "two", label: "20" },
    { value: "three", label: "30" },
  ];
  return (
    <>
      <div className="dashboardWrapper">
        <div className="entry-title">
          <h4 className="heading">My Jobs</h4>
        </div>
        <div className="tab-dashboard">
          <div className=" d-grid">
            <ul className="tab-list overflow-x-auto">
              <li
                className={`tab-item ${
                  activeTab === "applied" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("applied")}
              >
                <Link>
                  Applied<span>(41)</span>
                </Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "wishlist" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("wishlist")}
              >
                <Link>
                  Wishlist<span>(37)</span>
                </Link>
              </li>
              <li
                className={`tab-item ${activeTab === "invite" ? "active" : ""}`}
                onClick={() => handleActiveTab("invite")}
              >
                <Link>
                  Invite<span>(5)</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            <div
              className={`tab-info ${activeTab === "applied" ? "active" : ""}`}
              id="applied"
            >
              {/* Applied */}
              <div className="civi-my-apply entry-my-page">
              <div className="d-flex flex-wrap gap-3 justify-content-md-between">
                  <div className="search-left">
                    <div className="action-search">
                      <input
                        className="search-control"
                        type="text"
                        name="jobs_search"
                        placeholder="Search title,description"
                      />
                      <Link className="me-3">
                        <FaSearch />
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex mb-5 align-items-center">
                    <label className="text-sorting d-none d-md-block">Sort by</label>
                    <Select
                      options={jobAge}
                      styles={customStyles}
                      className=" mb-3 py-1 border ms-md-3"
                      defaultValue={jobAge.find(
                        (option) => option.value === "newest"
                      )}
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Status</th>
                        <th>Date Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">Sr. Visual Designer</a>
                              </h3>
                              <p>Design &amp; Creative / Full Time / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-open">Approved</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">October 14, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">Creative Director</a>
                              </h3>
                              <p>Design &amp; Creative / Remote / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-pending">Pending</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">October 5, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">(Senior) SEO Manager (f/m/x)</a>
                              </h3>
                              <p>Marketing &amp; Sales / Remote / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-close">Rejected</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">September 2, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="pagination-dashboard">
                  <div
                    className="civi-pagination dashboard d-flex flex-wrap justify-content-between align-items-center"
                    data-type="number"
                  >
                    <div
                      className="items-pagination d-flex align-items-center"
                      data-max-number={53}
                    >
                      <Select
                        options={jobPage}
                        styles={customStyles}
                        className=" mb-3 border me-3"
                        defaultValue={jobPage.find(
                          (option) => option.value === "one"
                        )}
                      />
                      <label className="text-pagination d-flex gap-2">
                        <span className="num-first">1</span>
                        <span className="num-last">10</span> of
                        <span className="num-total">53</span> items
                      </label>
                    </div>
                    <div className="pagination active">
                      <NavLink className={`prev page-numbers`} to="">
                        <FaChevronLeft />
                      </NavLink>

                      <NavLink className={` page-numbers`} to="">
                        1
                      </NavLink>
                      <NavLink className={` page-numbers`} to="">
                        2
                      </NavLink>

                      <span className="page-numbers dots">…</span>
                      <NavLink className={` page-numbers current`} to="">
                        5
                      </NavLink>

                      <NavLink className={`next page-numbers`} to="">
                        <FaChevronRight />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Wishlist */}
            <div
              className={`tab-info ${activeTab === "wishlist" ? "active" : ""}`}
              id="wishlist"
            >
              <div className="civi-my-apply entry-my-page">
                <div className="d-flex flex-wrap gap-3 justify-content-md-between">
                  <div className="search-left">
                    <div className="action-search">
                      <input
                        className="search-control"
                        type="text"
                        name="jobs_search"
                        placeholder="Search title,description"
                      />
                      <Link className="me-3">
                        <FaSearch />
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex mb-5 align-items-center">
                    <label className="text-sorting d-none d-md-block">Sort by</label>
                    <Select
                      options={jobAge}
                      styles={customStyles}
                      className=" mb-3 py-1 border ms-md-3"
                      defaultValue={jobAge.find(
                        (option) => option.value === "newest"
                      )}
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Status</th>
                        <th>Date Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">(Senior) SEO Manager (f/m/x)</a>
                              </h3>
                              <p>Marketing &amp; Sales / Remote / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-close">Rejected</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">September 2, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">Sr. Visual Designer</a>
                              </h3>
                              <p>Design &amp; Creative / Full Time / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-open">Approved</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">October 14, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">Creative Director</a>
                              </h3>
                              <p>Design &amp; Creative / Remote / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-pending">Pending</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">October 5, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="pagination-dashboard">
                  <div
                    className="civi-pagination dashboard d-flex flex-wrap justify-content-between align-items-center"
                    data-type="number"
                  >
                    <div
                      className="items-pagination d-flex align-items-center"
                      data-max-number={53}
                    >
                      <Select
                        options={jobPage}
                        styles={customStyles}
                        className=" mb-3 border me-3"
                        defaultValue={jobPage.find(
                          (option) => option.value === "one"
                        )}
                      />
                      <label className="text-pagination d-flex gap-2">
                        <span className="num-first">1</span>
                        <span className="num-last">10</span> of
                        <span className="num-total">53</span> items
                      </label>
                    </div>
                    <div className="pagination active">
                      <NavLink className={`prev page-numbers`} to="">
                        <FaChevronLeft />
                      </NavLink>

                      <NavLink className={` page-numbers`} to="">
                        1
                      </NavLink>
                      <NavLink className={` page-numbers`} to="">
                        2
                      </NavLink>

                      <span className="page-numbers dots">…</span>
                      <NavLink className={` page-numbers current`} to="">
                        5
                      </NavLink>

                      <NavLink className={`next page-numbers`} to="">
                        <FaChevronRight />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Invite */}
            <div
              className={`tab-info ${activeTab === "invite" ? "active" : ""}`}
              id="invite"
            >
              <div className="civi-my-apply entry-my-page">
              <div className="d-flex flex-wrap gap-3 justify-content-md-between">
                  <div className="search-left">
                    <div className="action-search">
                      <input
                        className="search-control"
                        type="text"
                        name="jobs_search"
                        placeholder="Search title,description"
                      />
                      <Link className="me-3">
                        <FaSearch />
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex mb-5 align-items-center">
                    <label className="text-sorting d-none d-md-block">Sort by</label>
                    <Select
                      options={jobAge}
                      styles={customStyles}
                      className=" mb-3 py-1 border ms-md-3"
                      defaultValue={jobAge.find(
                        (option) => option.value === "newest"
                      )}
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Status</th>
                        <th>Date Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">Sr. Visual Designer</a>
                              </h3>
                              <p>Design &amp; Creative / Full Time / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-open">Approved</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">October 14, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">(Senior) SEO Manager (f/m/x)</a>
                              </h3>
                              <p>Marketing &amp; Sales / Remote / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-close">Rejected</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">September 2, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="company-header">
                            <div className="img-comnpany">
                              <img
                                decoding="async"
                                className="job-logo"
                                src={avatarUxper}
                                alt=""
                              />
                            </div>
                            <div className="info-jobs">
                              <h3 className="title-jobs-dashboard">
                                <a href="">Creative Director</a>
                              </h3>
                              <p>Design &amp; Creative / Remote / Boston </p>
                            </div>
                          </div>
                        </td>
                        <td className="status">
                          <span className="label label-pending">Pending</span>
                        </td>
                        <td className="table-time">
                          <span className="start-time">October 5, 2024</span>
                        </td>
                        <td className="action-setting jobs-control">
                          <a href="#" className="icon-setting">
                            <FaEllipsisH />
                          </a>
                          <ul className="action-dropdown">
                            <li>
                              <a
                                className="btn-add-to-message"
                                data-text='This is a "Demo" account so you not cant delete it'
                                href="#"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="pagination-dashboard">
                  <div
                    className="civi-pagination dashboard d-flex flex-wrap justify-content-between align-items-center"
                    data-type="number"
                  >
                    <div
                      className="items-pagination d-flex align-items-center"
                      data-max-number={53}
                    >
                      <Select
                        options={jobPage}
                        styles={customStyles}
                        className=" mb-3 border me-3"
                        defaultValue={jobPage.find(
                          (option) => option.value === "one"
                        )}
                      />
                      <label className="text-pagination d-flex gap-2">
                        <span className="num-first">1</span>
                        <span className="num-last">10</span> of
                        <span className="num-total">53</span> items
                      </label>
                    </div>
                    <div className="pagination active">
                      <NavLink className={`prev page-numbers`} to="">
                        <FaChevronLeft />
                      </NavLink>

                      <NavLink className={` page-numbers`} to="">
                        1
                      </NavLink>
                      <NavLink className={` page-numbers`} to="">
                        2
                      </NavLink>

                      <span className="page-numbers dots">…</span>
                      <NavLink className={` page-numbers current`} to="">
                        5
                      </NavLink>

                      <NavLink className={`next page-numbers`} to="">
                        <FaChevronRight />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <CanFooter />
      </div>
    </>
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

export default CanJobs;
