import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { NavLink, useLocation } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaEllipsisH } from "react-icons/fa";
import { Pagination } from "../components/Pagination";
import API from "../../api";
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
const ApplicantList = () => {
  const token = sessionStorage.getItem("token");
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("id");
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";
  const sort = queryParams.get("sort") || "newest";

  const GetApplicants = async (page, limit, searchTerm) => {
    setLoading(true);
    try {
      const res = await API.get(
        `/get-applicants/${id}`,
        {
          params: { page, limit, search: searchTerm },
          headers: {
            "x-access-token": token,
          },
        }
      );
      setApplicants(res.data?.data || []);
      setCurrentPage(res.data?.meta?.page ?? 1);
      setTotalPages(res.data?.meta?.totalPages ?? 1);
    } catch (error) {
      console.error("Failed to load applicants:", error);
      setApplicants([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetApplicants(currentPage, entries, search);
  }, [currentPage, entries, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  const filterUsers = React.useMemo(() => {
    let result =
      filter === ""
        ? applicants
        : applicants.filter((user) => user.application_status === filter);
    result = [...result]
      .filter((user) => user.application_status !== "Wishlist")
      .sort((a, b) =>
        sort === "oldest"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at)
      );
    return result;
  }, [filter, sort, applicants]);

  const Review = async (applicationId) => {
    await API
      .put(`/status-review/${applicationId}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetApplicants(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to update status. Please try again.");
      });
  };
  const Selected = async (applicationId) => {
    await API
      .put(`/statusselected/${applicationId}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetApplicants(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to update status. Please try again.");
      });
  };

  const Rejected = async (applicationId) => {
    await API
      .put(`/statusrejected/${applicationId}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetApplicants(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to update status. Please try again.");
      });
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search applicants..."
      />
      <div className="table-responsive">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Applied To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>
                  <Loader label="Loading applicants..." />
                </td>
              </tr>
            ) : filterUsers.length > 0 ? (
              filterUsers.map((applicant) => (
                <tr key={applicant.Applicantion_id}>
                  <td className="info-user">
                    <div className="image-applicants">
                      <CiCamera />
                    </div>
                    <div className="info-details">
                      <NavLink
                        target="_self"
                        to={`/ApplicantDetails/${applicant.job_seeker_id}`}
                      >
                        <h3>{applicant.jobseeker_name}</h3>
                      </NavLink>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={applicant.application_status} />
                  </td>
                  <td>{applicant.jobs_title}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        {applicant.application_status === "Applied" ? (
                          <>
                            <Dropdown.Item onClick={() => Review(applicant.Applicantion_id)}>
                              Review
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => Selected(applicant.Applicantion_id)}>
                              Selected
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => Rejected(applicant.Applicantion_id)}>
                              Rejected
                            </Dropdown.Item>
                          </>
                        ) : applicant.application_status === "Review" ? (
                          <>
                            <Dropdown.Item onClick={() => Selected(applicant.Applicantion_id)}>
                              Selected
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => Rejected(applicant.Applicantion_id)}>
                              Reject
                            </Dropdown.Item>
                          </>
                        ) : applicant.application_status === "Selected" ? (
                          <Dropdown.Item onClick={() => Rejected(applicant.Applicantion_id)}>
                            Reject
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={() => Review(applicant.Applicantion_id)}>
                            Review
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="dt-empty">
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

export default ApplicantList;
