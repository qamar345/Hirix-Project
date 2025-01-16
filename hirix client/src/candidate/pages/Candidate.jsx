import React,{useState} from "react";
import { CanSidebar, CanHeader } from "../index.js";
import { Outlet } from "react-router-dom";
const Candidate = () => {
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
        <CanSidebar
          isCollapsed={isCollapsed}
          handleSidebarToggle={handleSidebarToggle}
        />
      </div>
      <div className="main">
        <div className="header ">
          <CanHeader />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Candidate;
