import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  TopNav,
  NavbarMenu,
  SearchFilter,
  ListFilter,
  FilterWrapper,
  JobList,
  PageList,
  JobPost,
  Footer,
} from "../index.js";
import Select from "react-select";
import { coinTracker } from "../assets/icons/index.js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [totalJobs, setTotalJobs] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    const getJobCount = async () => {
      try {
        const res = await axios.get("http://localhost:9000/getTotal_jobs");
        console.log("Total jobs from backend:", res.data);
        setTotalJobs(res.data.TotalJobs);
      } catch (error) {
        console.log(error);
      }
    };
    getJobCount();
  }, [1000]);
  return (
    <>
      <div>
        {/* Top Nav */}
        <TopNav />

        {/* Nabbar */}
        <NavbarMenu />
        {/* Search Filter */}

        <SearchFilter
        />
        {/* Job Listing */}
        <div className="archive-layout archive-jobs filter-canvas">
          <div className="inner-content container layout-full">
            <div className="col-left custom-scrollbar listing-section">
              <div className="archive-filter">
                <ListFilter />
              </div>

              <div id="primary">
                <main id="main" className="site-main" role="main">
                  <FilterWrapper totalJobs={totalJobs} />

                  {/* <div className="entry-mobie">
                  <span className="result-count">
                    <span className="count">{totalJobs}</span> All Jobs
                  </span>
                  <div className="civi-clear-filter hidden-lg-up d-block">
                    <FaSpinner className=" me-2 mb-2 spin-icon" />
                    <span>Clear All</span>
                  </div>
                </div> */}
                  {/* Job List */}
                  <JobList
                    onSelectJob={(job) => setSelectedJob(job)}
                    jobs={jobs}
                    setJobs={setJobs}
                    companies={companies}
                    setCompanies={setCompanies}
                  />

                  {/* Pagination */}
                  {/* <PageList /> */}
                </main>
              </div>
            </div>

            <div className="col-right preview-job-wrapper ">
              {/* Job Post */}
              {/* <JobPost
              logo={coinTracker}
              title="Customer Success Manager"
              author="Uxper"
              company="Design & Creative"
              views="106"
              isFeatured="true"
              isUrgent="true"
              timing="Full Time"
              city="California"
            /> */}
              <JobPost job={selectedJob} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
