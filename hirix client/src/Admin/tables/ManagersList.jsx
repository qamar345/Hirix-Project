import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaExternalLinkAlt, FaDownload, FaEllipsisH } from "react-icons/fa";

const ManagersList = () => {
  const applicantsData = [
    {
      name: "Aslam",
      status: "Active",
      email: "drkphnx99@gmail.com",
      phone: "+8801739761068",
      role: "Manager",
    },
    {
      name: "Raza",
      status: "Inactive",
      email: "leo@yopmail.com",
      phone: "+3581234567",
      role: "Assistant",
    },
  ];
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {applicantsData.map((applicant, index) => (
          <tr key={index}>
            <td className="info-user">
              <div className="info-details">
                <h3>{applicant.name}</h3>
              </div>
            </td>
            <td className="status">
              <div className={applicant.status.toLowerCase()}>
                <span
                  className={`label label-${
                    applicant.status === "Active" ? "open" : "close"
                  }`}
                >
                  {applicant.status}
                </span>
              </div>
            </td>
            <td className="info">
              <span className="gmail">{applicant.email}</span>
            </td>
            <td className="info">
              <span className="phone">{applicant.phone}</span>
            </td>
            <td className="info">
              <span className="phone">{applicant.role}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ManagersList;
