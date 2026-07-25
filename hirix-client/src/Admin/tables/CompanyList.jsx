import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisH } from "react-icons/fa";
import API, { BASE_URL } from "../../api";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";

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
  const [companydata, setcompanydata] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = sessionStorage.getItem("token");

  const getcompanies = async (page) => {
    // setLoading(true);
    try {
      const res = await API.get("/getcompanies", {
        params: {
          page: page,
        },
        headers: {
          "x-access-token": token,
        },
      });
      setcompanydata(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
      // setLoading(false);
    } catch (error) {}
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    getcompanies(currentPage);
  }, [currentPage]);
  // useEffect(() => {
  //   const GetUsers = async () => {
  //     await axios
  //       .get("/getcompanies")
  //       .then((res) => {
  //         setcompanydata(res.data);
  //       })
  //       .catch((err) => {
  //           //       });
  //   };

  //   GetUsers();
  // }, []);
  const ApprovedCompany = async (id) => {
    await API
      .put(`/approvedCompany/${id}`, null, {
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
  const RejectCompany = async (id) => {
    await API
      .put(`/rejectCompany/${id}`, null, {
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
  //     status: "Rejected",
  //     category: "Ecommerce",
  //     activeJobs: 0,
  //     editLink: "?company_id=14975",
  //     deleteMessage: 'This is a "Demo" account so you not cant delete it',
  //   },
  // ];

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
                    <td style={{ width: "200px" }}>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          {company.images ? (
                            <img
                              src={`${BASE_URL}${company.images}`}
                              alt={company.name}
                              style={{
                                width: "50px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "50px",
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
                          {company.status === "Pending" ? (
                            <>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => ApprovedCompany(company.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Approve
                                </button>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => RejectCompany(company.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Reject
                                </button>
                              </Dropdown.Item>
                            </>
                          ) : company.status === "Approved" ? (
                            <>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => RejectCompany(company.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Reject
                                </button>
                              </Dropdown.Item>
                              <Dropdown.Item></Dropdown.Item>
                            </>
                          ) : (
                            <>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => ApprovedCompany(company.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Approve
                                </button>
                              </Dropdown.Item>
                              <Dropdown.Item></Dropdown.Item>
                            </>
                          )}
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
  );
};

export default CompanyList;
