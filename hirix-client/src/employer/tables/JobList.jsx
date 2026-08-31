import Table from "react-bootstrap/Table";
import { NavLink, useLocation } from "react-router-dom";
import { lock, urgent } from "../assets/icons/index.js";
import { FaEllipsisH, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import API from "../../api";
import { Pagination } from "../components/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
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
function JobList() {
  const token = sessionStorage.getItem("token");
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("id");
  const location = useLocation();

  // Status filter + sort are still driven by the page header's dropdowns
  // (via URL params); free-text search now lives in the table's own
  // toolbar instead of the page-level search box.
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";
  const sort = queryParams.get("sort") || "newest";

  const fetchJobs = async (page, limit, searchTerm) => {
    setLoading(true);
    try {
      const res = await API.get(`/get-his-posts/${id}`, {
        params: { page, limit, search: searchTerm },
        headers: {
          "x-access-token": token,
        },
      });

      setJobs(res.data.data);
      setCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage, entries, search);
  }, [currentPage, entries, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  const filteredJobs = React.useMemo(() => {
    let result = filter === "" ? jobs : jobs.filter((job) => job.status === filter);
    result = [...result].sort((a, b) =>
      sort === "oldest"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );
    return result;
  }, [filter, sort, jobs]);

  const StatusClosed = async (jobId) => {
    await API
      .put(`/del-job-posts/${jobId}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        fetchJobs(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to close job. Please try again.");
      });
  };

  const DeleteJob = async (jobId) => {
    await API
      .delete(`/deleteJob/${jobId}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        fetchJobs(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to delete job. Please try again.");
      });
  };

  const StatusOpen = async (jobId) => {
    await API
      .put(`/update-status-opening/${jobId}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        fetchJobs(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to reopen job. Please try again.");
      });
  };

  const StatusPause = async (jobId) => {
    await API
      .put(`/status_Pause/${jobId}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        fetchJobs(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to pause job. Please try again.");
      });
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search your jobs..."
      />
      <div className="table-responsive">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Applicants</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Expired On</th>
              <th>Update Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <Loader label="Loading jobs..." />
                </td>
              </tr>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const postDate = new Date(job.created_at)
                  .toISOString()
                  .split("T")[0];

                // Determine Job Status
                const jobStatus =
                  job.expiry_date &&
                  new Date(new Date(job.expiry_date).setHours(0, 0, 0, 0)) <
                    new Date(new Date().setHours(0, 0, 0, 0))
                    ? "Closed"
                    : job.status;

                return (
                  <tr key={job.id}>
                    <td>
                      <h3 className="title-jobs-dashboard">
                        <NavLink to={`/jobdetail/${job.id}`}>
                          <span className="icon">
                            <img
                              src={jobStatus === "Closed" ? lock : urgent}
                              alt={jobStatus === "Closed" ? "Closed" : "Open"}
                            />
                          </span>
                          {job.title}
                        </NavLink>
                      </h3>
                      <p>
                        <span>
                          {job.career_level} / {job.job_type}
                        </span>
                      </p>
                    </td>
                    <td>
                      <span className="number">{job.total_applicants}</span>
                    </td>
                    <td>
                      <StatusBadge status={jobStatus} />
                    </td>
                    <td>{postDate}</td>
                    <td>
                      {jobStatus === "Closed"
                        ? "Expired"
                        : job.expiry_date
                        ? new Date(job.expiry_date).toLocaleDateString()
                        : "No Expiry Date"}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                          {job.status === "Pending" ? (
                            <>
                              <Dropdown.Item onClick={() => StatusOpen(job.id)}>
                                Open
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => StatusPause(job.id)}>
                                Pause
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => StatusClosed(job.id)}>
                                Closed
                              </Dropdown.Item>
                            </>
                          ) : job.status === "Open" ? (
                            <>
                              <Dropdown.Item onClick={() => StatusPause(job.id)}>
                                Pause
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => StatusClosed(job.id)}>
                                Closed
                              </Dropdown.Item>
                            </>
                          ) : job.status === "Pause" ? (
                            <>
                              <Dropdown.Item onClick={() => StatusOpen(job.id)}>
                                Open
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => StatusClosed(job.id)}>
                                Closed
                              </Dropdown.Item>
                            </>
                          ) : (
                            <Dropdown.Item onClick={() => StatusOpen(job.id)}>
                              Open
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <div className="dt-actions">
                        <button
                          className="dt-icon-btn dt-icon-btn--danger"
                          title="Delete"
                          onClick={() => DeleteJob(job.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="dt-empty">
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
  );
}

export default JobList;
