import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const JobsEdits = () => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  const check = sessionStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!check) navigate("/");
  });

  return (
    <div id="candidate-profile" className="dashboardWrapper addCompany">
      <div className="entry-my-page candidate-profile-dashboard">
        <div className="entry-title">
          <h4 className="heading">Edit Jobs</h4>
        </div>
        <form onSubmit={submit}>
          <div className="row">
            <div className="entryGroup col-lg-6">
              <label>Job Title</label>
              <input
                type="text"
                className="border p-1 rounded-2"
                name="title"
                id="title"
                value={Title}
              />
            </div>
            <div className="entryGroup col-lg-6">
              <label>Job Category</label>
              <input
                type="text"
                className="border p-1 rounded-2"
                name="title"
                id="title"
                value={Title}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="control-btn">
            <Link
              to="/candidate/dashboard"
              className="civi-button button-outline"
            >
              Cancel
            </Link>
            <button type="submit" className="civi-button btn-add-to-message">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default JobsEdits;
