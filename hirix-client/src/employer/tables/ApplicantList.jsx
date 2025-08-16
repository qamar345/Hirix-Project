import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaExternalLinkAlt, FaDownload, FaEllipsisH } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { Pagination } from "../components/Pagination";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
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
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filterUsers, setfiltersUsers] = useState([]);
  const id = sessionStorage.getItem("id");
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter") || "";
  const searchQuery = queryParams.get("search") || "";
  const sort = queryParams.get("sort") || "newest";

  const GetApplicants = async (page, search) => {
    // setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:9000/get-applicants/${id}`,
        {
          params: {
            page: page,
            search: search,
          },
        }
      );
      setApplicants(res.data?.data || []);
      //       setCurrentPage(res.data?.meta?.page ?? 1);
      setTotalPages(res.data?.meta?.totalPages ?? 1);
      // setLoading(false);
    } catch (error) {
      setApplicants([]);
      setCurrentPage(1);
      setTotalPages(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetApplicants(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    let filteredData =
      filter === ""
        ? [...applicants]
        : applicants.filter((user) => user.application_status === filter);

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
  }, [filter, applicants, sort]);

  useEffect(() => {}, [applicants]);

  const Review = async (id) => {
    await axios
      .put(`http://localhost:9000/status-review/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };
  const Selected = async (id) => {
    await axios
      .put(`http://localhost:9000/statusselected/${id}`)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };

  const Rejected = async (id) => {
    await axios
      .put(`http://localhost:9000/statusrejected/${id}`)
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
            <th>Name</th>
            <th>Status</th>
            <th>Applied To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.length > 0 ? (
            filterUsers.map((applicant, index) => {
              if (applicant.application_status !== "Wishlist") {
                return (
                  <>
                    <tr key={index}>
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
                          {/* <div className="applied">
                          Applied:
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <span> {applicant.qualification}</span>
                            <FaExternalLinkAlt className="externalIcon" />
                          </a>
                        </div> */}
                        </div>
                      </td>
                      <td className="status">
                        <div>
                          {applicant.application_status === "Applied" ? (
                            <span className="label label-open">Applied</span>
                          ) : applicant.application_status === "Review" ? (
                            <span className="label label-pending">Review</span>
                          ) : applicant.application_status === "Selected" ? (
                            <span className="label label-open">Selected</span>
                          ) : (
                            <span className="label label-close">Rejected</span>
                          )}
                        </div>
                      </td>
                      <td className="info">
                        <span className="gmail">{applicant.jobs_title}</span>
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
                              {applicant.application_status === "Applied" ? (
                                <>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Review(applicant.Applicantion_id)
                                      }
                                      style={{
                                        display: "block",
                                        width: "100%",
                                        fontSize: "1.5rem",
                                      }}
                                    >
                                      Review
                                    </button>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Selected(applicant.Applicantion_id)
                                      }
                                      style={{
                                        display: "block",
                                        width: "100%",
                                        fontSize: "1.5rem",
                                      }}
                                    >
                                      Selected
                                    </button>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Rejected(applicant.Applicantion_id)
                                      }
                                      style={{
                                        display: "block",
                                        width: "100%",
                                        fontSize: "1.5rem",
                                      }}
                                    >
                                      Rejected
                                    </button>
                                  </Dropdown.Item>
                                </>
                              ) : applicant.application_status === "Review" ? (
                                <>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Selected(applicant.Applicantion_id)
                                      }
                                      style={{
                                        display: "block",
                                        width: "100%",
                                        fontSize: "1.5rem",
                                      }}
                                    >
                                      Selected
                                    </button>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Rejected(applicant.Applicantion_id)
                                      }
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
                              ) : applicant.application_status ===
                                "Selected" ? (
                                <>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Rejected(applicant.Applicantion_id)
                                      }
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
                              ) : (
                                <>
                                  <Dropdown.Item>
                                    <button
                                      className="btn btn-light"
                                      onClick={() =>
                                        Review(applicant.Applicantion_id)
                                      }
                                      style={{
                                        display: "block",
                                        width: "100%",
                                        fontSize: "1.5rem",
                                      }}
                                    >
                                      Review
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
              }
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
