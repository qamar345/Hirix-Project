import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const PageList = () => {
  return (
    <div className="civi-pagination ajax-call" data-type="number">
      <div className="pagination active">
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
  );
};

export default PageList;
