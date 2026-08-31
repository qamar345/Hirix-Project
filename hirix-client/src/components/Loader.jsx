import React from "react";
import { FaSpinner } from "react-icons/fa";

// Inline spinner for a section that's fetching data. Renders in the normal
// document flow (not an overlay) so it can drop straight into a table body,
// a card, or any content area while data loads.
const Loader = ({ label = "Loading...", size = 28, className = "" }) => (
  <div className={`hirix-loader ${className}`}>
    <FaSpinner className="hirix-loader-spin" style={{ fontSize: size }} />
    {label && <span className="hirix-loader-label">{label}</span>}
  </div>
);

export default Loader;
