import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { avatarUxper } from "../assets/icons/index.js";
import Table from "react-bootstrap/Table";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH,
} from "react-icons/fa";
import { CanFooter, Pagination } from "../index.js";
import Select from "react-select";
import API, { BASE_URL } from "../../api";
import { Dropdown } from "react-bootstrap";
import TableToolbar from "../../components/TableToolbar";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { showSuccess, showError } from "../../utils/toast";

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    <FaEllipsisH />
  </span>
));
const CanJobs = () => {
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [token, navigate]);

  const id = sessionStorage.getItem("id");
  const [Alljobs, setJobs] = useState([]);
  // const [total, setTotal] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("applied");
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobsLoading, setJobsLoading] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const sort = queryParams.get("sort") || "newest";
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  const fetchJobs = async (searchTerm, sortOrder, type, page, limit) => {
    setJobsLoading(true);
    try {
      const res = await API.get(`/appliedTo/${id}`, {
        params: { search: searchTerm, sort: sortOrder, type, page, limit },
        headers: {
          "x-access-token": token,
        },
      });

      if (type === "applied") {
        setAppliedCount(res.data.TotalApplications || 0);
      } else if (type === "wishlist") {
        setWishlistCount(res.data.TotalApplications || 0);
      }

      setJobs(res.data.jobs && res.data.jobs.length > 0 ? res.data.jobs : []);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (error) {
      setJobs([]);
      setTotalPages(1);

      if (type === "applied") {
        setAppliedCount(0);
      } else if (type === "wishlist") {
        setWishlistCount(0);
      }
    } finally {
      setJobsLoading(false);
    }
  };

  // Lightweight fetch used only to keep the two tab badge counts in sync -
  // never touches the currently rendered job list/pagination state.
  const fetchCount = async (type) => {
    try {
      const res = await API.get(`/appliedTo/${id}`, {
        params: { type, page: 1, limit: 1 },
        headers: { "x-access-token": token },
      });
      if (type === "applied") {
        setAppliedCount(res.data.TotalApplications || 0);
      } else if (type === "wishlist") {
        setWishlistCount(res.data.TotalApplications || 0);
      }
    } catch (error) {
      if (type === "applied") {
        setAppliedCount(0);
      } else if (type === "wishlist") {
        setWishlistCount(0);
      }
    }
  };

  useEffect(() => {
    fetchCount("applied");
    fetchCount("wishlist");
  }, []);

  useEffect(() => {
    fetchJobs(search, sort, activeTab, currentPage, entries);
  }, [search, sort, activeTab, currentPage, entries]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entries, activeTab]);

  useEffect(() => {
    if (Alljobs && Array.isArray(Alljobs)) {
      let filteredData = [...Alljobs];

      if (sort === "newest") {
        filteredData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (sort === "oldest") {
        filteredData.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      }

      setFilteredJobs(filteredData);
    } else {
      setFilteredJobs([]);
    }
  }, [sort, Alljobs]);

  const StatusDelete = async (application_id) => {
    await API
      .put(`/Deleted/${application_id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to remove from wishlist. Please try again.");
      });
  };

  const StatusApply = async (application_id) => {
    await API
      .put(`/apply/${application_id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to apply. Please try again.");
      });
  };

  const StatusCancelApplication = async (application_id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this application?"
    );
    if (confirm) {
      await API
        .delete(
          `/cancleApplication/${application_id}`,
          null,
          {
            headers: {
              "x-access-token": token,
            },
          }
        )
        .then((res) => {
          showSuccess(res.data.msg);
          window.location.reload();
        })
        .catch((err) => {
          showError(err.response?.data?.msg || "Failed to cancel application. Please try again.");
        });
    }
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

  const handleSortChange = (selectedOption) => {
    const sort = selectedOption.value;
    navigate(`/candidate/jobs?sort=${sort}`);
  };

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
                  Applied<span> ({appliedCount})</span>
                </Link>
              </li>
              <li
                className={`tab-item ${
                  activeTab === "wishlist" ? "active" : ""
                }`}
                onClick={() => handleActiveTab("wishlist")}
              >
                <Link>
                  Wishlist<span>({wishlistCount})</span>
                </Link>
              </li>
              {/* <li
                      className={`tab-item ${
                        activeTab === "invite" ? "active" : ""
                      }`}
                      onClick={() => handleActiveTab("invite")}
                    >
                      <Link>
                        Invite<span>(5)</span>
                      </Link>
                    </li> */}
            </ul>
          </div>

          <div className="tab-content">
            <div
              className={`tab-info ${activeTab === "applied" ? "active" : ""}`}
              id="applied"
            >
              {/* Applied */}
              <div className="civi-my-apply entry-my-page">
                <div className="d-flex flex-wrap gap-3 justify-content-md-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <label className="text-sorting d-none d-md-block">
                      Sort by
                    </label>
                    <Select
                      options={jobAge}
                      styles={customStyles}
                      className=" py-1 border ms-md-3"
                      defaultValue={jobAge.find(
                        (option) => option.value === "newest"
                      )}
                      onChange={handleSortChange}
                    />
                  </div>
                </div>

                <div className="dt-wrapper">
                  <TableToolbar
                    entries={entries}
                    onEntriesChange={setEntries}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search title, city..."
                  />
                  <div className="table-responsive">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Status</th>
                          <th>Date Applied</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobsLoading ? (
                          <tr>
                            <td colSpan={4}>
                              <Loader label="Loading jobs..." />
                            </td>
                          </tr>
                        ) : filteredJobs.length > 0 ? (
                          filteredJobs.map((job) => {
                            return (
                              <tr key={job.id}>
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
                                        <span>{job.title}</span>
                                      </h3>
                                      <p>
                                        {job.job_category} / &nbsp;{job.job_type}{" "}
                                        / &nbsp;{job.workplace_type}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <StatusBadge status={job.status} />
                                </td>
                                <td className="table-time">
                                  <span className="start-time">
                                    {
                                      new Date(job.created_at)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </td>
                                <td className="action-setting jobs-control">
                                  <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu>
                                      <Dropdown.Item>
                                        <button
                                          className="btn btn-light"
                                          onClick={() => StatusDelete(job.id)}
                                          style={{
                                            display: "block",
                                            width: "100%",
                                            fontSize: "1.5rem",
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </Dropdown.Item>
                                      <Dropdown.Item>
                                        <button
                                          className="btn btn-light"
                                          onClick={() =>
                                            StatusCancelApplication(job.id)
                                          }
                                          style={{
                                            display: "block",
                                            width: "100%",
                                            fontSize: "1.5rem",
                                          }}
                                        >
                                          Cancel Application
                                        </button>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={4} className="dt-empty">
                              No jobs found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
            {/* Wishlist */}
            <div
              className={`tab-info ${activeTab === "wishlist" ? "active" : ""}`}
              id="wishlist"
            >
              <div className="civi-my-apply entry-my-page">
                <div className="d-flex flex-wrap gap-3 justify-content-md-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <label className="text-sorting d-none d-md-block">
                      Sort by
                    </label>
                    <Select
                      options={jobAge}
                      styles={customStyles}
                      className=" py-1 border ms-md-3"
                      defaultValue={jobAge.find(
                        (option) => option.value === "newest"
                      )}
                      onChange={handleSortChange}
                    />
                  </div>
                </div>

                <div className="dt-wrapper">
                  <TableToolbar
                    entries={entries}
                    onEntriesChange={setEntries}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search title, city..."
                  />
                  <div className="table-responsive">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Status</th>
                          <th>Expiry Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobsLoading ? (
                          <tr>
                            <td colSpan={4}>
                              <Loader label="Loading jobs..." />
                            </td>
                          </tr>
                        ) : filteredJobs.length > 0 ? (
                          filteredJobs.map((job) => {
                            return (
                              <tr key={job.id}>
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
                                        <span>{job.title}</span>
                                      </h3>
                                      <p>
                                        {" "}
                                        {job.job_category} / {job.job_type} /
                                        {job.workplace_type}{" "}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <StatusBadge status={job.status} />
                                </td>
                                <td className="table-time">
                                  <span className="start-time">
                                    {" "}
                                    {
                                      new Date(job.expiry_date)
                                        .toISOString()
                                        .split("T")[0]
                                    }
                                  </span>
                                </td>
                                <td className="action-setting jobs-control">
                                  <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu>
                                      <Dropdown.Item>
                                        <button
                                          className="btn btn-light"
                                          onClick={() => StatusDelete(job.id)}
                                          style={{
                                            display: "block",
                                            width: "100%",
                                            fontSize: "1.5rem",
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </Dropdown.Item>
                                      <Dropdown.Item>
                                        <button
                                          className="btn btn-light"
                                          onClick={() => StatusApply(job.id)}
                                          style={{
                                            display: "block",
                                            width: "100%",
                                            fontSize: "1.5rem",
                                          }}
                                        >
                                          Apply
                                        </button>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={4} className="dt-empty">
                              No jobs found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
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
                    <label className="text-sorting d-none d-md-block">
                      Sort by
                    </label>
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
                    </tbody>
                  </Table>
                </div>
                {/* <div className="pagination-dashboard">
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
                </div> */}
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
