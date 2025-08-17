import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyJobDetail = () => {
  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/get-post-by-id/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setJob(res.data);
      } catch (err) {}
    };

    fetchJob();
  }, [id]);

  if (!job) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 p-5 col-12 col-md-10 col-lg-8">
        <div className="mb-4 text-center">
          <h1 className="text-secondary fw-bold">{job.title}</h1>
        </div>

        <hr />

        <div className="mb-4">
          <h5 className="fw-semibold pt-3 pb-3">Job Overview</h5>
          <div className="row p-3">
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Posted By:</strong>
              {"  "}
              {job.company_name}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Job Type:</strong>
              {"  "}
              {job.job_type} & {job.workplace_type}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Salary:</strong>
              {"  "}
              {job.minimum_currency} - {job.maximum_currency} {job.Rate}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Currency:</strong>
              {"  "}
              {job.currency}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Level:</strong>
              {"  "}
              {job.career_level || "Beginner"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Qualification:</strong>
              {"  "}
              {job.qualification || "No qualification required"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Gender:</strong>
              {"  "}
              {job.gender}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Location:</strong>
              {"  "}
              {job.province}, {job.city}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Available Seats:</strong>
              {"  "}
              {job.available_seats}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Experience Required:</strong>
              {"  "}
              {job.Experience} years
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h5 className="fw-semibold mb-3">Skills & Requirements</h5>
          <div className="d-flex flex-wrap gap-2">
            {job.required_skills?.split(",").map((skill, index) => (
              <span
                key={index}
                className="badge bg-info text-light px-3 py-2 rounded-pill"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-semibold">Job Description</h5>
          <p className="text-muted p-3">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MyJobDetail;
