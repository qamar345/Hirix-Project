import React from "react";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Pagination = () => {
  const jobPage = [
    { value: "one", label: "10" },
    { value: "two", label: "20" },
    { value: "three", label: "30" },
  ];
  return (
    <div className="pagination-dashboard">
      <div className="civi-pagination dashboard d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div className="items-pagination d-flex align-items-center gap-3 justify-content-between selectFull">
          <Select
            options={jobPage}
            styles={customStyles}
            className="border p-1 rounded-2 mb-3 "
            defaultValue={jobPage.find((option) => option.value === "one")}
          />
          <label className="text-pagination d-flex gap-2 ">
            <span className="num-first">1</span>
            <span className="num-last">10</span> of
            <span className="num-total">53</span> items
          </label>
        </div>
        <div className="pagination active selectFull justify-content-between">
          <NavLink className={`prev page-numbers`} to="">
            <FaChevronLeft />
          </NavLink>

          <NavLink className={` page-numbers`} to="">
            1
          </NavLink>
          <NavLink className={` page-numbers`} to="">
            2
          </NavLink>

          <span className="page-numbers dots">…</span>
          <NavLink className={` page-numbers current`} to="">
            5
          </NavLink>

          <NavLink className={`next page-numbers`} to="">
            <FaChevronRight />
          </NavLink>
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

export default Pagination;
