import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { NavLink, useLocation } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import API, { BASE_URL } from "../../api";
import { Pagination } from "../components/Pagination";
import TableToolbar from "../../components/TableToolbar";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { showSuccess, showError } from "../../utils/toast";

const EmployeeList = () => {
  const [datauser, setdatauser] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [brokenImages, setBrokenImages] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  // Status filter + sort are still driven by the page header's dropdowns
  // (via URL params); free-text search now lives in the table's own
  // toolbar instead of the page-level search box.
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";
  const sort = queryParams.get("sort") || "newest";

  const GetEmployee = async (page, limit, searchTerm) => {
    setLoading(true);
    try {
      const res = await API.get("/get-data", {
        params: { page, limit, search: searchTerm },
        headers: {
          "x-access-token": token,
        },
      });
      setdatauser(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.error("Failed to load user list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    GetEmployee(currentPage, entries, search);
  }, [currentPage, entries, search]);

  useEffect(() => {
    settCurrentPage(1);
  }, [entries, search]);

  const filteredUsers = React.useMemo(() => {
    let result =
      filter === ""
        ? datauser
        : datauser.filter((user) => String(user.account_status) === filter);
    result = [...result].sort((a, b) =>
      sort === "oldest"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );
    return result;
  }, [filter, sort, datauser]);

  const ActiveAccount = async (id) => {
    await API
      .put(`/active-employee/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetEmployee(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to activate account. Please try again.");
      });
  };

  const FreezeAccount = async (id) => {
    await API
      .put(`/freezeusers/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetEmployee(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to freeze account. Please try again.");
      });
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search employers..."
      />
      <div className="table-responsive">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Information</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>
                  <Loader label="Loading employers..." />
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="info-user">
                    <div className="image-applicants">
                      {applicant.image && !brokenImages.has(applicant.id) ? (
                        <img
                          src={`${BASE_URL}${applicant.image}`}
                          alt={applicant.username}
                          onError={() =>
                            setBrokenImages((prev) => new Set(prev).add(applicant.id))
                          }
                        />
                      ) : (
                        <CiCamera />
                      )}
                    </div>
                    <NavLink to={`/employeeDetails/${applicant.id}`}>
                      <div className="info-details">
                        <h3>{applicant.username}</h3>
                      </div>
                    </NavLink>
                  </td>
                  <td>
                    <StatusBadge status={applicant.account_status == 0 ? "Frozen" : "Active"} />
                  </td>
                  <td>
                    <div>{applicant.email}</div>
                    <div>{applicant.phone}</div>
                  </td>
                  <td>
                    <div className="dt-actions">
                      {applicant.account_status === 0 ? (
                        <button
                          className="dt-icon-btn dt-icon-btn--success"
                          title="Activate"
                          onClick={() => ActiveAccount(applicant.id)}
                        >
                          <FaCheckCircle />
                        </button>
                      ) : (
                        <button
                          className="dt-icon-btn dt-icon-btn--danger"
                          title="Freeze"
                          onClick={() => FreezeAccount(applicant.id)}
                        >
                          <FaBan />
                        </button>
                      )}
                    </div>
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

export default EmployeeList;
