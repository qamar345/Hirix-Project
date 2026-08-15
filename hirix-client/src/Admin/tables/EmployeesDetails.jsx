import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { BASE_URL } from "../../api";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState(null);
  const [companies, setCompanies] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(
          `/GetEmployeesWithCompanies/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setEmployees(res.data.employee);
        setCompanies(res.data.companies);
      } catch (err) {}
    };

    fetchJob();
  }, [id]);

  if (!employees) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 p-5 col-12 col-md-10 col-lg-8">
        <div className="mb-4 text-center">
          <h1 className="text-secondary fw-bold">
            {employees.first_name} {employees.last_name}
          </h1>
        </div>

        <hr />

        <div className="mb-4">
          <h5 className="fw-semibold pt-3 pb-3">Employee Details</h5>
          <div className="row p-3">
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Username:</strong>
              {"  "}
              {employees.username}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Email:</strong>
              {"  "}
              {employees.email}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Phone No:</strong>
              {"  "}
              {employees.phone}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Address:</strong>
              {"  "}
              {[employees.province, employees.location].filter(Boolean).join(", ") || "Not provided"}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h5 className="fw-semibold mb-3">Registered Companies</h5>
          {companies.length > 0 ? (
            <div className="row">
              {companies.map((comp, index) => (
                <div className="col-md-12 mb-3" key={index}>
                  <div className="border rounded p-3 shadow-sm">
                    <h6 className="fw-bold text-primary">{comp.name}</h6>
                    <p className="mb-1">
                      <strong>Category:</strong> {comp.categories}
                    </p>
                    <p className="mb-1">
                      <strong>Website Link:</strong> {comp.website_link}
                    </p>
                    <p className="mb-1">
                      <strong>Contact:</strong> {comp.Contact}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {comp.email}
                    </p>
                    <p className="mb-1">
                      <strong>Location:</strong> {comp.province}, {comp.city}
                    </p>
                    {/* Add more fields if needed */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No companies registered.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
