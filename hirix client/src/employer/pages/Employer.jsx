import React, { useState } from "react";
import { EmpSideBar, EmpHeader } from "../index.js";
import { Outlet } from "react-router-dom";

const Employer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };


  return (
    <div className="userAccount">
      <div
        className={` ${
          isCollapsed ? "sidebarSmall" : "sidebarFull"
        } sidebar bg-info`}
      >
        <EmpSideBar
          isCollapsed={isCollapsed}
          handleSidebarToggle={handleSidebarToggle}
        />
      </div>
      <div className="main">
        <div className="header ">
          <EmpHeader />
        </div>
        <div className="">
          <Outlet />
        </div>
        {/* <div className="footer">
          <EmpFooter />
        </div> */}
      </div>
    </div>
  );
};

export default Employer;
