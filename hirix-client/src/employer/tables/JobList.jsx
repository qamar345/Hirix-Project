import Table from "react-bootstrap/Table";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { lock, urgent } from "../assets/icons/index.js";
import { FaEllipsisH } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "../components/Pagination";
import Dropdown from "react-bootstrap/Dropdown";

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
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const id = sessionStorage.getItem("id");
  const location = useLocation();

  // Extract Query Params
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";
  const searchQuery = queryParams.get("search") || "";
  const sort = queryParams.get("sort") || "newest";
  const fetchJobs = async (page, search, statusFilter, sortOrder) => {
    try {
      const res = await axios.get(`https://server.hirix.pk/get-his-posts/${id}`, {
        params: { page, search, status: statusFilter, sort: sortOrder },
        headers: {
          "x-access-token": token,
        },
      });

      setJobs(res.data.data);
      setCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobs(currentPage, searchQuery, filter, sort);
  }, [currentPage, searchQuery, filter, sort]);

  useEffect(() => {
    let filteredData = jobs;
    if (filter !== "") {
      filteredData = jobs.filter((job) => job.status === filter);
    }
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
  }, [filter, sort, jobs]);

  const StatusClosed = async (id) => {
    await axios
      .put(`https://server.hirix.pk/del-job-posts/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };

  const DeleteJob = async (id) => {
    await axios
      .delete(`https://server.hirix.pk/deleteJob/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };

  const EditJob = async (id) => {
    sessionStorage.setItem("editJobData", JSON.stringify(id));
    navigate("/employer/Edit_job");
  };

  const StatusOpen = async (id) => {
    await axios
      .put(`https://server.hirix.pk/update-status-opening/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };

  const StatusPause = async (id) => {
    await axios
      .put(`https://server.hirix.pk/status_Pause/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>APPLICANTS</th>
            <th>CURRENT STATUS</th>
            <th>POSTED</th>
            <th>EXPIRED ON</th>
            <th>UPDATE STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => {
              const postDate = new Date(job.created_at)
                .toISOString()
                .split("T")[0];
              const expiryDate = job.expiry_date
                ? new Date(job.expiry_date).toISOString().split("T")[0]
                : "No Expiry Date";

              // Determine Job Status
              const jobStatus =
                job.expiry_date &&
                new Date(new Date(job.expiry_date).setHours(0, 0, 0, 0)) <
                  new Date(new Date().setHours(0, 0, 0, 0))
                  ? "Closed"
                  : job.status;

              return (
                <tr key={index}>
                  <td>
                    <h3 className="title-jobs-dashboard">
                      <NavLink to={`/jobdetail/${job.id}`}>
                        <span className="icon">
                          <img
                            src={jobStatus === "Closed" ? lock : urgent}
                            alt={job.tooltip}
                            title={job.tooltip}
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
                    <div className="number-applicant">
                      <span className="number">{job.total_applicants}</span>
                      {/* <NavLink to="">Application</NavLink> */}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`label ${
                        jobStatus === "Closed"
                          ? "label-close"
                          : jobStatus === "Open"
                          ? "label-pending"
                          : "label-open"
                      }`}
                    >
                      {jobStatus}
                    </span>
                  </td>
                  <td>
                    <span className="start-time">{postDate}</span>
                  </td>
                  <td>
                    <span
                      className="expires-time"
                      style={{
                        color:
                          jobStatus === "Pending"
                            ? "rgb(19, 175, 151)"
                            : jobStatus === "Open"
                            ? "green"
                            : "red",
                      }}
                    >
                      {jobStatus === "Closed"
                        ? "Expired"
                        : new Date(job.expiry_date).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        {job.status === "Pending" ? (
                          <>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusOpen(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Open
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusPause(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Pause
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusClosed(job.status)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Closed
                              </button>
                            </Dropdown.Item>
                          </>
                        ) : job.status === "Open" ? (
                          <>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusPause(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Pause
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusClosed(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Closed
                              </button>
                            </Dropdown.Item>
                          </>
                        ) : job.status === "Pause" ? (
                          <>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusOpen(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Open
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusClosed(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Closed
                              </button>
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item>
                              <button
                                className="btn btn-light"
                                onClick={() => StatusOpen(job.id)}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  fontSize: "1.5rem",
                                }}
                              >
                                Open
                              </button>
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        {/* <Dropdown.Item>
                          <button
                            className="btn btn-light"
                            onClick={() => EditJob(job.id)}
                            style={{
                              display: "block",
                              width: "100%",
                              fontSize: "1.5rem",
                            }}
                          >
                            Edit
                          </button>
                        </Dropdown.Item> */}
                        <Dropdown.Item>
                          <button
                            className="btn btn-light"
                            onClick={() => DeleteJob(job.id)}
                            style={{
                              display: "block",
                              width: "100%",
                              fontSize: "1.5rem",
                            }}
                          >
                            Delete
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
              <td colSpan="7" className="text-gray-500 text-center">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default JobList;
