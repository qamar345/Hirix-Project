import React from "react";
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
import {coinTracker} from '../assets/icons/index.js'
const HomePage = () => {
  return (
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
                <FilterWrapper />

                <div className="entry-mobie">
                  <span className="result-count">
                    <span className="count">72</span> Jobs
                  </span>
                  <div className="civi-clear-filter hidden-lg-up d-block">
                    <FaSpinner className=" me-2 mb-2 spin-icon" />
                    <span>Clear All</span>
                  </div>
                </div>
                {/* Job List */}
                <JobList />

                {/* Pagination */}
                <PageList />
              </main>
            </div>
          </div>

          <div className="col-right preview-job-wrapper ">
            {/* Job Post */}
            <JobPost
              logo={coinTracker}
              title="Customer Success Manager"
              author="Uxper"
              company="Design & Creative"
              views="106"
              isFeatured="true"
              isUrgent="true"
              timing="Full Time"
              city="California"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
