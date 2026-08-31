import Table from "react-bootstrap/Table";
import { NavLink, useLocation } from "react-router-dom";
import { lock, urgent } from "../assets/icons/index.js";
import { FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import API from "../../api";
import { Pagination } from "../components/Pagination";
import TableToolbar from "../../components/TableToolbar";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { showSuccess, showError } from "../../utils/toast";

const JobList = () => {
  const token = sessionStorage.getItem("token");
  const [datauser, setdatauser] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get("Jid"); // Fetch the clientId from query params

  // Final data to display
  const dataToShow = clientId ? appliedJobs : datauser;

  // Fetch all job posts
  const GetJobPosts = async (page = 1, limit = 10, searchTerm = "") => {
    setLoading(true);
    try {
      const res = await API.get("/get-postsBYAdmin", {
        params: { page, limit, search: searchTerm },
        headers: { "x-access-token": token },
      });

      const jobs = Array.isArray(res.data.data) ? res.data.data : [];
      setdatauser(jobs);
      settCurrentPage(res.data.meta?.page || 1);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching job posts:", error);
      setdatauser([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applied jobs (when viewing a specific candidate's applications)
  useEffect(() => {
    const GetAppliedJobs = async () => {
      if (!clientId) return;
      try {
        const res = await API.get(
          `/getPostSpecific/${clientId}`,
          { headers: { "x-access-token": token } }
        );
        const jobs = Array.isArray(res.data) ? res.data : [];
        setAppliedJobs(jobs);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setAppliedJobs([]);
      }
    };
    GetAppliedJobs();
  }, [clientId]);

  useEffect(() => {
    GetJobPosts(currentPage, entries, search);
  }, [currentPage, entries, search]);

  useEffect(() => {
    settCurrentPage(1);
  }, [entries, search]);

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  const Delete = async (id) => {
    try {
      const res = await API.delete(`/deleteJob/${id}`, {
        headers: { "x-access-token": token },
      });
      showSuccess(res.data.msg);
      GetJobPosts(currentPage, entries, search);
    } catch (err) {
      console.error("Delete failed:", err);
      showError(err.response?.data?.msg || "Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search jobs..."
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loader label="Loading jobs..." />
                </td>
              </tr>
            ) : Array.isArray(dataToShow) && dataToShow.length > 0 ? (
              dataToShow.map((job) => {
                const postDate = job.created_at
                  ? new Date(job.created_at).toISOString().split("T")[0]
                  : "N/A";
                const expiryDate = job.expiry_date
                  ? new Date(job.expiry_date).toISOString().split("T")[0]
                  : null;

                const jobStatus =
                  job.expiry_date && new Date(job.expiry_date) < new Date()
                    ? "Closed"
                    : job.status || "Open";

                const isApplied = Array.isArray(appliedJobs)
                  ? appliedJobs.some((appliedJob) => appliedJob.job_id === job.id)
                  : false;

                return (
                  <tr
                    key={job.id}
                    className={isApplied ? "highlight-applied-job" : ""}
                  >
                    <td>
                      <h3 className="title-jobs-dashboard">
                        <NavLink to={`/jobdetail/${job.id}`}>
                          <span className="icon">
                            {jobStatus === "Closed" ? (
                              <img src={lock} alt="Closed" />
                            ) : (
                              <img src={urgent} alt="Open" />
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
                    <td>
                      <span>{job.applicant_count ?? 0} </span>
                      Application
                    </td>
                    <td>
                      <StatusBadge status={jobStatus} />
                    </td>
                    <td>{postDate}</td>
                    <td>
                      {jobStatus === "Closed" ? "Expired" : expiryDate || "No Expiry Date"}
                    </td>
                    <td>
                      <div className="dt-actions">
                        <button
                          className="dt-icon-btn dt-icon-btn--danger"
                          title="Delete"
                          onClick={() => Delete(job.id)}
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
                <td colSpan={6} className="dt-empty">
                  No data yet.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobList;
