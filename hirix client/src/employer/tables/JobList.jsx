import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import { lock, urgent } from "../assets/icons/index.js";
import { FaEllipsisH } from "react-icons/fa";
function JobList() {
  const jobData = [
    {
      title: "dqsd",
      description: "Design & Creative / Internship / Ashkasham",
      applicants: 0,
      status: "Closed",
      posted: "November 12, 2024",
      expires: "",
      tooltip: "Expired",
    },
    {
      title: "casfcasvcasf",
      description: "Development & IT",
      applicants: 0,
      status: "Closed",
      posted: "November 7, 2024",
      expires: "",
      tooltip: "Urgent",
    },
    {
      title: "gege",
      description: "Analytics / Part Time",
      applicants: 0,
      status: "Pending",
      posted: "November 1, 2024",
      expires: "December 1, 2024",
      tooltip: "Urgent",
    },
    {
      title: "dqsd",
      description: "Design & Creative / Internship / Ashkasham",
      applicants: 0,
      status: "Closed",
      posted: "November 12, 2024",
      expires: "",
      tooltip: "Expired",
    },
    {
      title: "casfcasvcasf",
      description: "Development & IT",
      applicants: 0,
      status: "Closed",
      posted: "November 7, 2024",
      expires: "",
      tooltip: "Urgent",
    },
    {
      title: "gege",
      description: "Analytics / Part Time",
      applicants: 0,
      status: "Pending",
      posted: "November 1, 2024",
      expires: "December 1, 2024",
      tooltip: "Urgent",
    },
  ];

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>APPLICANTS</th>
          <th>STATUS</th>
          <th>POSTED</th>
          <th>EXPIRED</th>
        </tr>
      </thead>
      <tbody>
        {jobData.map((job, index) => (
          <tr key={index} className="">
            <td className="">
              <h3 className="title-jobs-dashboard">
                <NavLink to="">
                  <span className="icon">
                    {job.tooltip && job.tooltip === "Expired" ? (
                      <img src={lock} alt={job.tooltip} title={job.tooltip} />
                    ) : (
                      <img src={urgent} alt={job.tooltip} title={job.tooltip} />
                    )}
                  </span>
                  {job.title}
                </NavLink>
              </h3>
              <p>{job.description}</p>
            </td>
            <td className="">
              <div className="number-applicant">
                <span className="number">{job.applicants}</span>
                <NavLink to="">Application</NavLink>
              </div>
            </td>
            <td>
              <span
                className={`label 
                ${job.status === "Closed" ? "label-close" : "label-pending"}
                `}
              >
                {job.status}
              </span>
            </td>
            <td>
              <span className="start-time">{job.posted}</span>
            </td>
            <td>
              <span className="expires-time">{job.expires || "Expires"}</span>
            </td>
            <td className="action-setting jobs-control">
              <a
                href="#"
                className="icon-setting btn-add-to-message"
                data-text={job.actions}
              >
                <FaEllipsisH />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default JobList;
