import React, { useState } from "react";
import { AdSideBar, AdHeader } from "../index.js";
import { Outlet } from "react-router-dom";

const Admin = () => {
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
        <AdSideBar
          isCollapsed={isCollapsed}
          handleSidebarToggle={handleSidebarToggle}
        />
      </div>
      <div className="main">
        <div className="header ">
          <AdHeader />
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

export default Admin;
