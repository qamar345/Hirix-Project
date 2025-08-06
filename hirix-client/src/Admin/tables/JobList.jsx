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
  const dataToShow = clientId ? appliedJobs : filterUsers;
  const GetJobPosts = async (page, search = "") => {
    try {
      const res = await axios.get("http://localhost:9000/get-postsBYAdmin", {
        params: {
          page: page,
          search: search,
        },
      });
      setdatauser(res.data.data);
      setfiltersUsers(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {}
  };

  const GetAppliedJobs = async () => {
    if (clientId) {
      try {
        const res = await axios.get(
          `http://localhost:9000/getPostSpecific/${clientId}`
        );
        useEffect(() => {
          let filteredData =
            filter === ""
              ? [...datauser]
              : datauser.filter((user) => user.status === filter);
          if (sort === "newest") {
            filteredData = filteredData.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
          } else if (sort === "oldest") {
            filteredData = filteredData.sort(
              (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
          }
          setfiltersUsers(filteredData || []);
        }, [filter, datauser, sort]);
      } catch (err) {}
    }
  };

  useEffect(() => {
    GetAppliedJobs();
    GetJobPosts();
    // Fetch the applied jobs for the client
  }, [clientId]);

  const Delete = async (id) => {
    await axios
      .delete(`http://localhost:9000/deleteJob/${id}`)
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
            <th>STATUS</th>
            <th>POSTED</th>
            <th>EXPIRED ON</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dataToShow) && dataToShow.length > 0 ? (
            dataToShow.map((job, index) => {
              const postDate = new Date(job.created_at)
                .toISOString()
                .split("T")[0];
              const expiryDate = job.expiry_date
                ? new Date(job.expiry_date).toISOString().split("T")[0]
                : null;

              // Update status dynamically for expired jobs
              const jobStatus =
                job.expiry_date < new Date() ? "Closed" : job.status;

              // Check if the current job is in the applied jobs list
              const isApplied = appliedJobs.some(
                (appliedJob) => appliedJob.job_id === job.id
              );

              return (
                <tr
                  key={index}
                  className={isApplied ? "highlight-applied-job" : ""} // Highlight the row if the client has applied
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
                        {job.career_level} / {job.job_type}
                      </span>
                    </p>
                  </td>
                  <td className="title-jobs-dashboard">
                    <span className="number">{job.applicant_count} </span>
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
                          jobStatus === "Pending"
                            ? "rgb(19, 175, 151)"
                            : jobStatus === "Open"
                            ? "green"
                            : jobStatus === "Closed"
                            ? "red"
                            : "orange",
                      }}
                    >
                      {jobStatus === "Closed"
                        ? "Expire"
                        : expiryDate || "No Expiry Date"}
                    </span>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        {/* <Dropdown.Item>
                          <button
                            className="btn btn-light"
                            onClick={() => Edit(job.id)}
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
                            onClick={() => Delete(job.id)}
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
              <td colSpan="5" className="text-gray-500 text-center">
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
