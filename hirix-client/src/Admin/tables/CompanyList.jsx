import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import API, { BASE_URL } from "../../api";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";
import TableToolbar from "../../components/TableToolbar";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { showSuccess, showError } from "../../utils/toast";

const CompanyList = () => {
  const [companydata, setcompanydata] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [brokenImages, setBrokenImages] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  const getcompanies = async (page, limit, searchTerm) => {
    setLoading(true);
    try {
      const res = await API.get("/getcompanies", {
        params: { page, limit, search: searchTerm },
        headers: {
          "x-access-token": token,
        },
      });
      setcompanydata(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.error("Failed to load companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    getcompanies(currentPage, entries, search);
  }, [currentPage, entries, search]);

  useEffect(() => {
    settCurrentPage(1);
  }, [entries, search]);

  const ApprovedCompany = async (id) => {
    await API
      .put(`/approvedCompany/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        getcompanies(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to approve company. Please try again.");
      });
  };
  const RejectCompany = async (id) => {
    await API
      .put(`/rejectCompany/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        getcompanies(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to reject company. Please try again.");
      });
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search companies..."
      />
      <div className="table-responsive">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Category</th>
              <th>Active Jobs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>
                  <Loader label="Loading companies..." />
                </td>
              </tr>
            ) : companydata.length > 0 ? (
              companydata.map((company) => (
                <tr key={company.id}>
                  <td style={{ width: "220px" }}>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        {company.images && !brokenImages.has(company.id) ? (
                          <img
                            src={`${BASE_URL}${company.images}`}
                            alt={company.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            onError={() =>
                              setBrokenImages((prev) => new Set(prev).add(company.id))
                            }
                          />
                        ) : (
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#eef0f4",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              color: "#7c8493",
                            }}
                          >
                            N/A
                          </div>
                        )}
                      </div>
                      <div>
                        <Link to={`/CompanyDetails/${company.id}`}>
                          <h6 style={{ color: "inherit", margin: 0 }}>{company.name}</h6>
                        </Link>
                        <small>{company.E_mail}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={company.status} />
                  </td>
                  <td>{company.categories}</td>
                  <td>{company.active_jobs}</td>
                  <td>
                    <div className="dt-actions">
                      {company.status !== "Approved" && (
                        <button
                          className="dt-icon-btn dt-icon-btn--success"
                          title="Approve"
                          onClick={() => ApprovedCompany(company.id)}
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                      {company.status !== "Rejected" && (
                        <button
                          className="dt-icon-btn dt-icon-btn--danger"
                          title="Reject"
                          onClick={() => RejectCompany(company.id)}
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
                <td colSpan={5} className="dt-empty">
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

export default CompanyList;
