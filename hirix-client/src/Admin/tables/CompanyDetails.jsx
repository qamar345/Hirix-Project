import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CompanyDetail = () => {
  const { id } = useParams();
  const [companies, setCompanies] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `https://server.hirix.pk/getSpecificCompany/${id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setCompanies(res.data[0]);
      } catch (err) {}
    };

    fetchJob();
  }, [id]);

  if (!companies) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 p-5 col-12 col-md-10 col-lg-8">
        <div className="mb-4 text-center">
          <h1 className="text-secondary fw-bold">{companies.name}</h1>
        </div>

        <hr />

        <div className="mb-4">
          <h5 className="fw-semibold pt-3 pb-3">Company Details</h5>
          <div className="row p-3">
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Category:</strong>
              {"  "}
              {companies.categories}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Email:</strong>
              {"  "}
              {companies.E_mail}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Contact:</strong>
              {"  "}
              {companies.Contact}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Total Members:</strong>
              {"  "}
              {companies.total_members}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Ntn:</strong>
              {"  "}
              {companies.postalCode}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Founded In:</strong>
              {"  "}
              {companies.founded_in}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Location:</strong>
              {"  "}
              {companies.province} , {companies.city}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-secondary">Website Link:</strong>
              {"  "}
              <a
                href={companies.website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {companies.website_link}
              </a>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h5 className="fw-semibold mb-3">About Company</h5>
          <div className="d-flex flex-wrap gap-2">{companies.About}</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
