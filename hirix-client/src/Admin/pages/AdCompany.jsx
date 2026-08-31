import React, { useEffect, useState } from "react";
import {
  AdSideBar,
  CompanyList,
  AdHeader,
  AdFooter,
} from "../index.js";
const EmpCompany = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
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
            <h4 className="heading">Companies</h4>
          </div>

          <div className=" d-grid">
            <CompanyList />
          </div>
          </div>
        <div className="page-footer align-self-end">
          <AdFooter />
        </div>
      </div>
    </div>
  );
};

export default EmpCompany;
