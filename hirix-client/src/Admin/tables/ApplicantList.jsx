import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaExternalLinkAlt, FaDownload, FaEllipsisH } from "react-icons/fa";
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
const ApplicantList = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [datauser, setdatauser] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filterUsers, setfiltersUsers] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";

  const querysearch = new URLSearchParams(location.search);
  const searchQuery = querysearch.get("search") || "";
  const sort = queryParams.get("sort") || "newest";
  const GetApplicants = async (page, search = "") => {
    // setLoading(true);
    try {
      const res = await axios.get("https://server.hirix.pk/getusers", {
        params: {
          page: page,
          search: search,
        },

        headers: {
          "x-access-token": token,
        },
      });
      setdatauser(res.data.data);
      setfiltersUsers(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
      // setLoading(false);
    } catch (error) {}
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    GetApplicants(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    let filteredData =
      filter == ""
        ? datauser
        : datauser.filter((user) => user.account_status == filter);
    if (sort === "newest") {
      filteredData = filteredData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sort === "oldest") {
      filteredData = filteredData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }
    setfiltersUsers(filteredData);
  }, [filter, datauser, sort]);

  const ActiveAccount = async (id) => {
    const token = sessionStorage.getItem("token");

    await axios
      .put(`https://server.hirix.pk/active-employee/${id}`, null, {
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

  const FreezeAccount = async (id) => {
    const token = sessionStorage.getItem("token");

    await axios
      .put(`https://server.hirix.pk/freezeusers/${id}`, null, {
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
  const handleClick = (Jid) => {
    navigate(`/admin/jobs?highlight=${Jid}`);
  };
  // const applicantsData = [
  //   {
  //     name: "reza123",
  //     appliedPosition: "Sr. Backend Go Developer",
  //     appliedDate: "November 9, 2024",
  //     status: "Rejected",
  //     email: "drkphnx99@gmail.com",
  //     phone: "+8801739761068",
  //     actions: {
  //       meetings: true,
  //       downloadCV: true,
  //       settings: true,
  //       dropdownActions: ["Approved", "Rejected"],
  //     },
  //   },
  //   {
  //     name: "User not logged in",
  //     appliedPosition: "Sr. Backend Go Developer",
  //     appliedDate: "November 5, 2024",
  //     status: "Rejected",
  //     email: "leo@yopmail.com",
  //     phone: "+3581234567",
  //     actions: {
  //       meetings: true,
  //       downloadCV: true,
  //       settings: true,
  //       dropdownActions: ["Approved", "Rejected"],
  //     },
  //   },
  //   {
  //     name: "User not logged in",
  //     appliedPosition: "Blockchain Engineer",
  //     appliedDate: "September 20, 2024",
  //     status: "Approved",
  //     email: "gason.eric55@gmail.com",
  //     phone: "0484180700",
  //     actions: {
  //       meetings: true,
  //       downloadCV: true,
  //       settings: true,
  //       dropdownActions: ["Approved", "Rejected"],
  //     },
  //   },
  //   {
  //     name: "User not logged in",
  //     appliedPosition: "Sr. Backend Go Developer",
  //     appliedDate: "September 16, 2024",
  //     status: "Approved",
  //     email: "de@g.com",
  //     phone: "+2250101010101",
  //     actions: {
  //       meetings: true,
  //       downloadCV: true,
  //       settings: true,
  //       dropdownActions: ["Approved", "Rejected"],
  //     },
  //   },
  // ];
  return (
    <>
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
          {filterUsers.length > 0 ? (
            filterUsers.map((applicant, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="info-user">
                      <div className="image-applicants">
                        {/* <CiCamera /> */}
                        {applicant.image ? (
                          <img
                            src={`https://server.hirix.pk${applicant.image}`}
                          />
                        ) : (
                          <CiCamera />
                        )}
                      </div>
                      <div className="info-details">
                        <NavLink to={`/ApplicantDetails/${applicant.id}`}>
                          <h3>{applicant.username}</h3>
                        </NavLink>
                        <div className="applied">
                          Applied:
                          <NavLink to={`/admin/jobs?Jid=${applicant.id}`}>
                            <FaExternalLinkAlt className="externalIcon" />
                          </NavLink>
                        </div>
                      </div>
                    </td>
                    <td className="status">
                      <div>
                        <span
                          className={`label 
                ${applicant.account_status == 0 ? "label-close" : "label-open"}
                `}
                        >
                          {applicant.account_status == 0 ? "Freeze" : "Active"}
                        </span>
                      </div>
                    </td>
                    <td className="info">
                      <span className="gmail">{applicant.email}</span>
                      <span className="phone">{applicant.phone}</span>
                    </td>
                    <td className="applicants-control action-setting">
                      <div className="list-action">
                        <div className="links">
                          {/* {applicant.actions.downloadCV && (
                      <Link
                        to=""
                        className="action icon-download"
                        data-title="Download CV"
                      >
                        <FaDownload />
                      </Link>
                    )}
                    {applicant.actions.settings && (
                      <Link href="#" className="icon-setting">
                        <FaEllipsisH />
                      </Link>
                     )} */}
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} />
                          <Dropdown.Menu>
                            {applicant.account_status === 0 ? (
                              <>
                                <Dropdown.Item>
                                  <button
                                    className="btn btn-light"
                                    onClick={() => ActiveAccount(applicant.id)}
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      fontSize: "1.5rem",
                                    }}
                                  >
                                    Active
                                  </button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <button
                                    className="btn btn-light"
                                    onClick={() => FreezeAccount(applicant.id)}
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      fontSize: "1.5rem",
                                    }}
                                  >
                                    Freeze
                                  </button>
                                </Dropdown.Item>
                              </>
                            ) : (
                              <>
                                <Dropdown.Item>
                                  <button
                                    className="btn btn-light"
                                    onClick={() => FreezeAccount(applicant.id)}
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      fontSize: "1.5rem",
                                    }}
                                  >
                                    Freeze
                                  </button>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <button
                                    className="btn btn-light"
                                    onClick={() => ActiveAccount(applicant.id)}
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      fontSize: "1.5rem",
                                    }}
                                  >
                                    Active
                                  </button>
                                </Dropdown.Item>
                              </>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
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

export default ApplicantList;
