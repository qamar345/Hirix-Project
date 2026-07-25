import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { BASE_URL } from "../../api";
import { format } from "date-fns";
const ApplicantDetail = () => {
  const token = sessionStorage.getItem("token");
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString || dateString == "Present") {
      return "Present";
    }
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch {
      return "Invalid Date";
    }
  };
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(
          `/GetAllProfileData/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setApplicant(res.data);
      } catch (err) {}
    };

    fetchJob();
  }, [id]);

  if (!applicant) return <div className="text-center mt-5">Loading...</div>;

  const { user, details, projects, awards, qualification, experience } =
    applicant;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 p-5 col-12 col-md-10 col-lg-8">
        <div className="mb-4 text-center">
          <h1 className="text-secondary fw-bold">
            {user.first_name} {user.last_name}
          </h1>
        </div>

        <hr />

        <div className="mb-4">
          <h5 className="fw-semibold pt-3 pb-3">Personal Details</h5>
          <div className="row p-3">
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Username:</strong>
              {"  "}
              {user?.username || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Email:</strong>
              {"  "}
              {user?.email || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Phone No:</strong>
              {"  "}
              {user?.phone || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Qualification:</strong>
              {"  "}
              {user?.qualification || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Current Position:</strong>
              {"  "}
              {details?.CurrentPosition || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Category:</strong>
              {"  "}
              {details?.Category || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Age:</strong>
              {"  "}
              {details?.Age || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Gender:</strong>
              {"  "}
              {details?.Gender || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Language:</strong>
              {"  "}
              {details?.Language || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Experience:</strong>
              {"  "}
              {details?.Experience || "N/A"} Years
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Offer Salary:</strong>
              {"  "}
              {details?.offer_salary || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Salary Type:</strong>
              {"  "}
              {details?.Salary_type || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Currency:</strong>
              {"  "}
              {details?.Currency || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Address:</strong>
              {"  "}
              {user?.province || "N/A"}, {user?.location || "N/A"}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Linkedin:</strong>
              {"  "}
              {details?.LinkedIn || "N/A"}
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h5 className="fw-semibold mb-3">Qualification Details</h5>
          {qualification.length > 0 ? (
            <div className="row">
              {qualification.map((qual, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="border rounded p-3 shadow-sm">
                    <h6 className="fw-bold text-primary">
                      {qual?.Title || "N/A"}
                    </h6>
                    <p className="mb-1">
                      <strong>Level:</strong> {qual?.Level || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>From:</strong> {formatDate(qual?.From || "N/A")}
                    </p>
                    <p className="mb-1">
                      <strong>To:</strong> {formatDate(qual?.To || "N/A")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No Qualification Added.</p>
          )}
        </div>

        <div className="mb-5">
          <h5 className="fw-semibold mb-3">Project Details</h5>
          {projects.length > 0 ? (
            <div className="row">
              {projects.map((pro, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="border rounded p-3 shadow-sm">
                    <h6 className="fw-bold text-primary">
                      {pro?.Title || "N/A"}
                    </h6>
                    <p className="mb-1">
                      <strong>Link:</strong> {pro?.Link || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Description:</strong> {pro?.Description || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No Projects Added.</p>
          )}
        </div>

        <div className="mb-5">
          <h5 className="fw-semibold mb-3">Experience Details</h5>
          {experience.length > 0 ? (
            <div className="row">
              {experience.map((exp, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="border rounded p-3 shadow-sm">
                    <h6 className="fw-bold text-primary">
                      {exp?.Title || "N/A"}
                    </h6>
                    <p className="mb-1">
                      <strong>Company:</strong> {exp?.Company || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>From:</strong> {formatDate(exp?.From || "N/A")}
                    </p>
                    <p className="mb-1">
                      <strong>To:</strong> {formatDate(exp?.From || "N/A")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No Experience Added.</p>
          )}
        </div>
        <div className="mb-5">
          <h5 className="fw-semibold mb-3">Award Details</h5>
          {awards.length > 0 ? (
            <div className="row">
              {awards.map((award, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="border rounded p-3 shadow-sm">
                    <h6 className="fw-bold text-primary">
                      {award?.Title || "N/A"}
                    </h6>
                    <p className="mb-1">
                      <strong>Date Awarded:</strong>{" "}
                      {formatDate(award?.date_awarded || "N/A")}
                    </p>
                    <p className="mb-1">
                      <strong>Description:</strong>{" "}
                      {award?.Description || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No Award Added.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
