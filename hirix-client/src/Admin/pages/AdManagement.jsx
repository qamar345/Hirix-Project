import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AdSideBar, ManagersList, AdHeader, AdFooter } from "../index.js";
const AdManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const jobType = [
    { value: "", label: "All jobs" },
    { value: "backend", label: "Sr. Backend Go Developer" },
    { value: "blockchain", label: "Blockchain Engineer" },
  ];

  const jobAge = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "featured", label: "Featured" },
  ];
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
            <h4 className="heading">Managers List</h4>
          </div>

          <div className=" d-grid">
            <ManagersList />
          </div>

          <NavLink to="/admin/add-manager" className="civi-button mt-3">
            <FaPlus />
            Add New Staff
          </NavLink>
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

export default AdManagement;
