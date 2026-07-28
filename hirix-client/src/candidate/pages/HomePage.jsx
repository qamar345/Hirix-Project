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
import API, { BASE_URL } from "../../api";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [totalJobs, setTotalJobs] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchParams] = useSearchParams();
  const sharedId = searchParams.get("id");
  useEffect(() => {
    const jobId = searchParams.get("id");
    if (jobId) {
      navigate(`/JobPage/${jobId}?fromShare=true`);
    }
  }, []);

  useEffect(() => {
    const getJobCount = async () => {
      try {
        const res = await API.get("/getTotal_jobs");
        setTotalJobs(res.data.TotalJobs);
      } catch (error) {}
    };
    getJobCount();
  }, []);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      const params = new URLSearchParams(location.search);
      const search = params.get("search") || "";
      const city = params.get("city") || "";
      const category = params.get("category") || "";

      // Only fetch if at least one filter is active
      if (!search.trim() && !city.trim() && !category.trim()) {
        return;
      }
      try {
        const res = await API.get("/jobs", {
          params: { search, city, category },
        });
        const fetchedJobs = res.data || [];
        setJobs(fetchedJobs);
        // Auto-select first job when new search results arrive
        if (fetchedJobs.length > 0) {
          setSelectedJob(fetchedJobs[0]);
        }
      } catch (error) {
        setJobs([]);
      }
    };

    fetchFilteredJobs();
  }, [location.search]);
  return (
    <>
      <div>
        {/* Top Nav */}
        <TopNav />

        {/* Nabbar */}
        <NavbarMenu />
        {/* Search Filter */}

        <SearchFilter />
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
                    onSelectJob={(job) => {
                      if (window.innerWidth <= 991) {
                        navigate(`/JobPage/${job.id}`);
                      } else {
                        setSelectedJob(job);
                      }
                    }}
                    jobs={jobs}
                    setJobs={setJobs}
                    companies={companies}
                    setCompanies={setCompanies}
                    fromShare={!!sharedId}
                  />

                  {/* Pagination */}
                  {/* <PageList /> */}
                </main>
              </div>
            </div>

            <div className="col-right preview-job-wrapper">
              {selectedJob ? (
                <JobPost job={selectedJob} />
              ) : (
                <div className="job-post-placeholder">
                  <p>Please select a job to view details.</p>
                </div>
              )}
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
