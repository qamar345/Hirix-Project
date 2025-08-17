import Table from "react-bootstrap/Table";
import { NavLink, useLocation } from "react-router-dom";
import { lock, urgent } from "../assets/icons/index.js";
import { FaEllipsisH } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "../components/Pagination";
import { Dropdown } from "react-bootstrap";

// Custom Toggle Component
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

const JobList = () => {
  const token = sessionStorage.getItem("token");
  const [datauser, setdatauser] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterUsers, setfiltersUsers] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";
  const searchQuery = queryParams.get("search") || "";
  const sort = queryParams.get("sort") || "newest";
  const clientId = queryParams.get("Jid"); // Fetch the clientId from query params

  // ✅ Final data to display
  const dataToShow = clientId ? appliedJobs : filterUsers;

  // ✅ Fetch all job posts
  const GetJobPosts = async (page = 1, search = "") => {
    try {
      const res = await axios.get("http://localhost:9000/get-postsBYAdmin", {
        params: { page, search },
        headers: { "x-access-token": token },
      });

      const jobs = Array.isArray(res.data.data) ? res.data.data : [];
      console.log(jobs);
      setdatauser(jobs);
      setfiltersUsers(jobs);
      settCurrentPage(res.data.meta?.page || 1);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching job posts:", error);
      setdatauser([]);
      setfiltersUsers([]);
    }
  };

  // ✅ Fetch applied jobs
  const GetAppliedJobs = async () => {
    if (clientId) {
      try {
        const res = await axios.get(
          `http://localhost:9000/getPostSpecific/${clientId}`,
          { headers: { "x-access-token": token } }
        );

        const jobs = Array.isArray(res.data) ? res.data : [];
        setdatauser(jobs);
        setAppliedJobs(jobs); // <-- Important
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setdatauser([]);
        setAppliedJobs([]);
      }
    }
  };

  // ✅ Initial fetch
  useEffect(() => {
    // GetAppliedJobs();
    GetJobPosts();
  }, [clientId]);

  // ✅ Filtering + sorting
  // useEffect(() => {
  //   console.log(datauser);
  //   if (!Array.isArray(datauser) || datauser.length === 0) {
  //     setfiltersUsers([]);
  //     return;
  //   }

  //   let filteredData = [...datauser];

  //   if (filter !== "") {
  //     filteredData = filteredData.filter((user) => user.status === filter);
  //   }

  //   if (sort === "newest") {
  //     filteredData.sort(
  //       (a, b) => new Date(b.created_at) - new Date(a.created_at)
  //     );
  //   } else if (sort === "oldest") {
  //     filteredData.sort(
  //       (a, b) => new Date(a.created_at) - new Date(b.created_at)
  //     );
  //   }

  //   setfiltersUsers(filteredData);
  // }, [filter, datauser, sort]);

  // ✅ Delete handler
  const Delete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9000/deleteJob/${id}`, {
        headers: { "x-access-token": token },
      });
      alert(res.data.msg);
      GetJobPosts(currentPage, searchQuery); // refresh instead of reload
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>APPLICANTS</th>
            <th>STATUS</th>
            <th>POSTED</th>
            <th>EXPIRED ON</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dataToShow) && dataToShow.length > 0 ? (
            dataToShow.map((job, index) => {
              const postDate = job.created_at
                ? new Date(job.created_at).toISOString().split("T")[0]
                : "N/A";
              const expiryDate = job.expiry_date
                ? new Date(job.expiry_date).toISOString().split("T")[0]
                : null;

              // ✅ Expired check
              const jobStatus =
                job.expiry_date && new Date(job.expiry_date) < new Date()
                  ? "Closed"
                  : job.status || "Open";

              // ✅ Applied check
              const isApplied = Array.isArray(appliedJobs)
                ? appliedJobs.some((appliedJob) => appliedJob.job_id === job.id)
                : false;

              return (
                <tr
                  key={index}
                  className={isApplied ? "highlight-applied-job" : ""}
                >
                  <td>
                    <h3 className="title-jobs-dashboard">
                      <NavLink to={`/jobdetail/${job.id}`}>
                        <span className="icon">
                          {jobStatus === "Closed" ? (
                            <img
                              src={lock}
                              alt={job.tooltip}
                              title={job.tooltip}
                            />
                          ) : (
                            <img
                              src={urgent}
                              alt={job.tooltip}
                              title={job.tooltip}
                            />
                          )}
                        </span>
                        {job.title}
                      </NavLink>
                    </h3>
                    <p>
                      <span>
                        {job.career_level || "N/A"} / {job.job_type || "N/A"}
                      </span>
                    </p>
                  </td>
                  <td className="title-jobs-dashboard">
                    <span className="number">{job.applicant_count ?? 0} </span>
                    <NavLink to=""> Application</NavLink>
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
                          jobStatus === "Closed"
                            ? "red"
                            : jobStatus === "Open"
                            ? "green"
                            : "orange",
                      }}
                    >
                      {jobStatus === "Closed"
                        ? "Expired"
                        : expiryDate || "No Expiry Date"}
                    </span>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <button
                            className="btn btn-light"
                            onClick={() => Delete(job.id)}
                            style={{
                              display: "block",
                              width: "100%",
                              fontSize: "1.2rem",
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
              <td colSpan="6" className="text-gray-500 text-center">
                No data yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        // onPageChange={handlePageChange}
      />
    </>
  );
};

export default JobList;
