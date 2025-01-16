import React from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEllipsisH } from "react-icons/fa";

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
  const companies = [
    {
      name: "New",
      img: null,
      details: "",
      status: "Pending",
      category: "B2B SaaS",
      activeJobs: 0,
      editLink: "?company_id=15292",
      deleteMessage: 'This is a "Demo" account so you not cant delete it',
    },
    {
      name: "dfs",
      img: "http://civi.uxper.co/wp-content/uploads/2024/10/Leaders.png",
      details: "Aurora",
      status: "Approved",
      category: "B2B SaaS",
      activeJobs: 0,
      editLink: "?company_id=15279",
      deleteMessage: 'This is a "Demo" account so you not cant delete it',
    },
    {
      name: "Cirotechs",
      img: null,
      details: "",
      status: "Rejected",
      category: "Ecommerce",
      activeJobs: 0,
      editLink: "?company_id=14975",
      deleteMessage: 'This is a "Demo" account so you not cant delete it',
    },
  ];

  return (
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
        {companies.map((company, index) => (
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
                  <h6>{company.name}</h6>
                  <small>{company.details}</small>
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
            <td>{company.category}</td>
            <td>{company.activeJobs}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu>
                  <Dropdown.Item href={company.editLink}>Approve</Dropdown.Item>
                  <Dropdown.Item onClick={() => alert(company.deleteMessage)}>
                    Reject
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CompanyList;
