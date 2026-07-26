import React, { useEffect, useState } from "react";
import { JobCard } from "../index.js";
import {
  givethLogo,
  avatarUxper,
  coinTracker,
  nightFall,
} from "../assets/icons/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../../api";

const JobList = ({ onSelectJob }) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [jobData, setjobData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtersJob, setfiltersJobs] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const sortselector = query.get("sort") || "newest";
  const searchQuery = query.get("search") || "";
  const filter = query.get("filter") || "";
  const jobTypes = query.get("jobTypes") || "";
  const salaryMin = query.get("salaryMin");
  const salaryMax = query.get("salaryMax");
  const rate = query.get("rate");
  const experiences = query.get("experiences") || "";
  const careerLevels = query.get("careerLevels") || "";
  const city = query.get("city") || "";
  const category = query.get("category") || "";

  const GetJobs = async () => {
    try {
      const params = {
        page: currentPage,
        search: searchQuery,
        city,
        category,
      };

      if (city) params.city = city;
      if (category) params.category = category;
      if (jobTypes) params.jobTypes = jobTypes;
      if (salaryMin) params.salaryMin = salaryMin;
      if (salaryMax) params.salaryMax = salaryMax;
      if (rate) params.rate = rate;
      if (experiences) params.experiences = experiences;
      if (careerLevels) params.careerLevels = careerLevels;

      const res = await API.get("/get-posts", {
        params,
        headers: {
          "x-access-token": token,
        },
      });

      console.log("GET /get-posts response:", res.data);

      const jobs = res.data?.data?.jobs || [];
      const companies = res.data?.data?.company || [];
      const meta = res.data?.meta || {};

      setjobData(jobs);
      setfiltersJobs(jobs);
      settCurrentPage(meta.page || 1);
      setTotalPages(meta.totalPages || 1);
      setCompanies(companies);
    } catch (error) {
      console.error("GET /get-posts failed:", error?.response?.data || error.message);
    }
  };


  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    GetJobs();
  }, [sortselector, search, currentPage]);

  useEffect(() => {
    let filteredData = [...jobData];

    if (sortselector === "newest") {
      filteredData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortselector === "oldest") {
      filteredData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    setfiltersJobs(filteredData);
  }, [jobData, sortselector]);

  return (
    <div>
      {filtersJob.map((job) => {
        const companyDetail = companies.find(
          (comp) => comp.name === job.company_name
        );

        return (
          <JobCard
            key={job.id}
            onClick={() => onSelectJob({ ...job, companyDetail })}
            {...job}
          />
        );
      })}
    </div>
  );
};

export default JobList;
