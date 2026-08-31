import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisH } from "react-icons/fa";
import API from "../../api";
import { Pagination } from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useSelectCompanyQuery, useDeleteCompanyMutation } from "../../store/employerApi";
import TableToolbar from "../../components/TableToolbar";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { showSuccess, showError } from "../../utils/toast";

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
const CompanyList = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [brokenImages, setBrokenImages] = useState(new Set());
  const id = sessionStorage.getItem("id");
  const { data: responseData, refetch, isFetching } = useSelectCompanyQuery({
    id,
    page: currentPage,
    limit: entries,
    search,
  });
  const [deleteCompanyMutation] = useDeleteCompanyMutation();

  const companydata = responseData?.data || [];
  const totalPages = responseData?.meta?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (value) => {
    setEntries(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const EditCompany = async (companyId) => {
    sessionStorage.setItem("editCompanyData", JSON.stringify(companyId));
    navigate("/employer/Edit_Company");
  };

  const DeleteCompany = async (did) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteCompanyMutation(did).unwrap();
      showSuccess(res.msg || "Company deleted successfully!");
    } catch (err) {
      showError(err?.data?.msg || "Failed to delete company. Please try again.");
    }
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={handleEntriesChange}
        search={search}
        onSearchChange={handleSearchChange}
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
            {isFetching ? (
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
                        {company.img && !brokenImages.has(company.id) ? (
                          <img
                            src={company.img}
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
                          <h6 className="d-flex align-items-center gap-1" style={{ color: "inherit", margin: 0 }}>
                            {company.name}
                            {company.is_linkedin_verified === 1 && (
                              <span
                                style={{
                                  backgroundColor: "#0077b5",
                                  color: "white",
                                  fontSize: "10px",
                                  padding: "1px 5px",
                                  borderRadius: "3px",
                                  fontWeight: "normal",
                                }}
                              >
                                LinkedIn Verified
                              </span>
                            )}
                            {company.is_email_verified === 1 ? (
                              <span
                                style={{
                                  backgroundColor: "#2ec4b6",
                                  color: "white",
                                  fontSize: "10px",
                                  padding: "1px 5px",
                                  borderRadius: "3px",
                                  fontWeight: "normal",
                                }}
                              >
                                Email Verified
                              </span>
                            ) : (
                              <span
                                style={{
                                  backgroundColor: "#ff9f1c",
                                  color: "white",
                                  fontSize: "10px",
                                  padding: "1px 5px",
                                  borderRadius: "3px",
                                  fontWeight: "normal",
                                }}
                              >
                                Email Unverified
                              </span>
                            )}
                          </h6>
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
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => EditCompany(company.id)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => DeleteCompany(company.id)}>
                          Delete
                        </Dropdown.Item>
                        {!company.is_linkedin_verified && (
                          <Dropdown.Item
                            onClick={async () => {
                              try {
                                const res = await API.get(`/auth/linkedin?company_id=${company.id}`, {
                                  headers: { "x-access-token": token },
                                });
                                if (res.data.url) {
                                  const width = 600, height = 600;
                                  const left = window.screen.width / 2 - width / 2;
                                  const top = window.screen.height / 2 - height / 2;
                                  window.open(
                                    res.data.url,
                                    "linkedin_verify",
                                    `width=${width},height=${height},left=${left},top=${top}`
                                  );

                                  const messageListener = (event) => {
                                    if (event.data.type === "LINKEDIN_VERIFICATION_SUCCESS") {
                                      showSuccess("Company successfully verified with LinkedIn!");
                                      refetch();
                                      window.removeEventListener("message", messageListener);
                                    }
                                  };
                                  window.addEventListener("message", messageListener);
                                }
                              } catch (err) {
                                showError("Failed to initiate verification.");
                              }
                            }}
                          >
                            Verify LinkedIn
                          </Dropdown.Item>
                        )}
                        {company.is_email_verified === 0 && (
                          <Dropdown.Item
                            onClick={async () => {
                              try {
                                const res = await API.post(`/resend-company-verification/${company.id}`);
                                showSuccess(res.data.msg);
                              } catch (err) {
                                showError("Failed to resend verification email.");
                              }
                            }}
                          >
                            Resend Verification Email
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
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
