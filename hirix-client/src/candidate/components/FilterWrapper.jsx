import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaArrowsSpin } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

const FilterWrapper = ({totalJobs}) => {
  const navigate = useNavigate();
  const [sortValue, setsortValue] = useState([]);
  const location = useLocation();
  const jobAge = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "featured", label: "Featured" },
  ];

  const query = new URLSearchParams(location.search);
  const sort = query.get("sort") || "newest";

  const handleSortChange = (selectedOption) => {
    
    query.set("sort", selectedOption.value);
    navigate(`?${query.toString()}`);
  };

  return (
    <div className="filter-warpper ">
      <div className="entry-left align-items-center mt-1">
        <div className="btn-canvas-filter">
          <a
            data-bs-toggle="offcanvas"
            href="#filterList"
            role="button"
            aria-controls="filterList"
          >
            <CiFilter className="icon" />
            Filter
          </a>
        </div>
        <span className="result-count d-block mt-1">
          <span className="count">{totalJobs}</span> Jobs
        </span>
      </div>

      <div className="entry-right">
        <div className="d-flex align-items-center justify-content-around flex-wrap">
          <div className="civi-clear-filter hidden-lg-up d-block">
            <FaArrowsSpin className=" me-2 mb-2 spin-icon" />
            <span>Clear All</span>
          </div>
          <span className="text-sort-by d-none d-xl-block">Sort by</span>

          <Select options={jobAge} styles={customStyles} 
           className="border p-1 rounded-2 text-nowrap mb-1 ms-3 selectFull"
           value={jobAge.find(
             (option) => option.value === sort
           )}
           onChange={handleSortChange}
          />
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

export default FilterWrapper;
