import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  EmpSideBar,
  CompanyList,
  EmpHeader,
  EmpFooter,
  Pagination,
} from "../index.js";
const EmpCompany = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`tablePage ${isCollapsed ? "half" : "full"}`}>
      <div className="page-sidebar">
        <EmpSideBar
          isCollapsed={isCollapsed}
          handleSidebarToggle={handleSidebarToggle}
        />
      </div>

      <div className="page-content">
        <div className="page-header">
          <EmpHeader />
        </div>
        <div className="content-main p-5">
          <div className="entry-title">
            <h4 className="heading">Companies</h4>
          </div>

          <div className=" d-grid">
            <CompanyList />
          </div>
          <div className="page-list">
            <Pagination />
          </div>

          <NavLink to="/employer/add-company" className="civi-button mt-3">
            <FaPlus />
            Add new company
          </NavLink>
        </div>
        <div className="page-footer align-self-end">
          <EmpFooter />
        </div>
      </div>
    </div>
  );
};

export default EmpCompany;
