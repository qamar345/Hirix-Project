import React, { useState } from "react";
import Select from "react-select";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import {
  AdSideBar,
  ApplicantList,
  AdHeader,
  AdFooter,
  Pagination,
} from "../index.js";
const AdCandidates = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
   const handleSortChange = (selectedOption) => {
    const sort = selectedOption.value;
    navigate(`/admin/candidates?sort=${sort}`);
  };
  const jobType = [
    { value: "", label: "All candidates" },
    { value: 1, label: "Active" },
    { value: 0, label: "Freeze" },
  ];

  const jobAge = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "featured", label: "Featured" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/admin/candidates?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleFilterChange = (selectedOption) => {
    const filter = selectedOption.value;
    navigate(`/admin/candidates?filter=${filter}`);
  };

  return (
    <div className={`tablePage ${isCollapsed ? "half" : "full"}`}>
      <div className="page-sidebar">
        <AdSideBar
          isCollapsed={isCollapsed}
          handleSidebarToggle={handleSidebarToggle}
        />
      </div>

      <div className="page-content">
        <div className="page-header">
          <AdHeader />
        </div>
        <div className="content-main p-5">
          <div className="entry-title">
            <h4 className="heading">All Candidates</h4>
          </div>
          <div className="searchWrapper flex-wrap gap-3 ">
            <div className="search-left d-flex flex-wrap gap-3 ">
              <Select
                options={jobType}
                styles={customStyles}
                className="border p-1 rounded-2  selectFull "
                defaultValue={jobType.find((option) => option.value === "")}
                onChange={handleFilterChange}
              />

              <div className="action-search selectFull">
                  <input
                    type="text"
                    // name="jobs_search"
                    placeholder="Find Candidates"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="btn-search d-flex"
                    style={{ all: "unset", cursor: "pointer" }}
                  >
                    <IoIosSearch className="mx-3" />
                  </button>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 selectFull">
              <label className="text-sorting d-none d-md-block ">Sort by</label>
              <Select
                options={jobAge}
                styles={customStyles}
                className="border p-1 rounded-2 text-nowrap mb-2 selectFull"
                defaultValue={jobAge.find(
                  (option) => option.value === "newest"
                )}
                 onChange={handleSortChange}
              />
            </div>
          </div>
          <div className=" d-grid">
            <ApplicantList />
          </div>
          <div className="page-list">
            <Pagination />
          </div>
        </div>
        <div className="page-footer align-self-end">
          <AdFooter />
        </div>
      </div>
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",

    border: "0",

    boxShadow: state.isFocused ? "0 0 0 2px transparent" : null,
    "&:hover": { borderColor: "0" },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e6f2ff"
      : state.isFocused
      ? "#e6f2ff"
      : null,
    color: state.isSelected ? "#126ebb" : "#333",
    "&:active": { backgroundColor: "#e6f2ff" },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
};

export default AdCandidates;
