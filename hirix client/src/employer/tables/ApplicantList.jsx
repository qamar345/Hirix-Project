import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaExternalLinkAlt, FaDownload, FaEllipsisH } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";



const ApplicantList = () => {
  const applicantsData = [
    {
      name: "reza123",
      appliedPosition: "Sr. Backend Go Developer",
      appliedDate: "November 9, 2024",
      status: "Rejected",
      email: "drkphnx99@gmail.com",
      phone: "+8801739761068",
      actions: {
        meetings: true,
        downloadCV: true,
        settings: true,
        dropdownActions: ["Approved", "Rejected"],
      },
    },
    {
      name: "User not logged in",
      appliedPosition: "Sr. Backend Go Developer",
      appliedDate: "November 5, 2024",
      status: "Rejected",
      email: "leo@yopmail.com",
      phone: "+3581234567",
      actions: {
        meetings: true,
        downloadCV: true,
        settings: true,
        dropdownActions: ["Approved", "Rejected"],
      },
    },
    {
      name: "User not logged in",
      appliedPosition: "Blockchain Engineer",
      appliedDate: "September 20, 2024",
      status: "Approved",
      email: "gason.eric55@gmail.com",
      phone: "0484180700",
      actions: {
        meetings: true,
        downloadCV: true,
        settings: true,
        dropdownActions: ["Approved", "Rejected"],
      },
    },
    {
      name: "User not logged in",
      appliedPosition: "Sr. Backend Go Developer",
      appliedDate: "September 16, 2024",
      status: "Approved",
      email: "de@g.com",
      phone: "+2250101010101",
      actions: {
        meetings: true,
        downloadCV: true,
        settings: true,
        dropdownActions: ["Approved", "Rejected"],
      },
    },
  ];
  return (
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
        {applicantsData.map((applicant, index) => (
          <tr key={index}>
            <td className="info-user">
              <div className="image-applicants">
                <CiCamera />
              </div>
              <div className="info-details">
                <h3>{applicant.name}</h3>
                <div className="applied">
                  Applied:
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <span> {applicant.appliedPosition}</span>
                    <FaExternalLinkAlt className="externalIcon" />
                  </a>
                </div>
              </div>
            </td>
            <td className="status">
              <div className={applicant.status.toLowerCase()}>
                <span
                  className={`label label-${
                    applicant.status === "Approved" ? "open" : "close"
                  }`}
                >
                  {applicant.status}
                </span>
                <span className="applied-time">
                  Applied: {applicant.appliedDate}
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
                  {/* {applicant.actions.meetings && (
                    <Link
                      to=""
                      className="action icon-video btn-reschedule-meetings"
                      data-title="Meetings"
                    >
                      <RiVideoAddFill />
                    </Link>
                  )} */}
                  {applicant.actions.downloadCV && (
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
                  )}
                </div>
                <div className="action">
                  <ul className="action-dropdown">
                    {applicant.actions.dropdownActions.map(
                      (action, dropdownIndex) => (
                        <li key={dropdownIndex}>
                          <Link
                            className={`btn-${action.toLowerCase()}`}
                            to=""
                          >
                            {action}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </Table>
  );
};

export default ApplicantList;
