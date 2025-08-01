import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { Pagination } from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

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
  // const companies = [
  //   {
  //     name: "New",
  //     img: null,
  //     details: "",
  //     status: "Pending",
  //     category: "B2B SaaS",
  //     activeJobs: 0,
  //     editLink: "?company_id=15292",
  //     deleteMessage: 'This is a "Demo" account so you not cant delete it',
  //   },
  //   {
  //     name: "dfs",
  //     img: "http://civi.uxper.co/wp-content/uploads/2024/10/Leaders.png",
  //     details: "Aurora",
  //     status: "Approved",
  //     category: "B2B SaaS",
  //     activeJobs: 0,
  //     editLink: "?company_id=15279",
  //     deleteMessage: 'This is a "Demo" account so you not cant delete it',
  //   },
  //   {
  //     name: "Cirotechs",
  //     img: null,
  //     details: "",
  //     status: "Pending",
  //     category: "Ecommerce",
  //     activeJobs: 0,
  //     editLink: "?company_id=14975",
  //     deleteMessage: 'This is a "Demo" account so you not cant delete it',
  //   },
  // ];
const [companydata, setcompanydata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const id = sessionStorage.getItem("id");
  const getcompanies = async (page) => {
    // setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9000/select-company/${id}`, {
        params: {
          page: page,
        },
      });
      setcompanydata(res.data.data);
      setCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
      // setLoading(false);
    } catch (error) {
          }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getcompanies(currentPage);
  }, [currentPage]);

  const EditCompany = async (id) => {
        sessionStorage.setItem("editCompanyData", JSON.stringify(id));
    navigate("/employer/Edit_Company");
  }
  const DeleteCompany = async (did) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;
  
    try {
      const res = await axios.delete(`http://localhost:9000/deletecompany/${did}`);
      alert(res.data.msg);
      // Instead of reloading, remove the deleted item from the state if using React
      // Example: setCompanies(companies.filter(company => company.id !== did));
    } catch (err) {
            alert("Failed to delete company. Please try again.");
    }
  };
  
  return (
    <>
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
      {companydata.length > 0 ? (
            companydata.map((company, index) => {
              return (
                <>
                  <tr key={index}>
                    <td style={{ width: "170px" }}>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          {company.img ? (
                            <img
                              src={company.img}
                              alt={company.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#ddd",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                color: "#555",
                              }}
                            >
                              N/A
                            </div>
                          )}
                        </div>
                        <div>
                          <Link to={`/CompanyDetails/${company.id}`}>
                            <h6>{company.name}</h6>
                          </Link>
                          <small>{company.E_mail}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        // className={`label
                        // ${company.status === "Pending" ? "label-pending" :  "label-open"}
                        // `}
                        className={`label ${
                          company.status === "Pending"
                            ? "label-pending"
                            : company.status === "Rejected"
                            ? "label-close"
                            : "label-open"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td>{company.categories}</td>
                    <td>{company.active_jobs}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => EditCompany(company.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Edit
                                </button>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => DeleteCompany(company.id)}
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
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-gray-500 text-center">
                No data yet.
              </td>
            </tr>
          )}
      </tbody>
    </Table>
  <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        </>
  )
};

export default CompanyList;
