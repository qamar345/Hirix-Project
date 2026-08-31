import React from "react";

const SUCCESS = ["active", "approved", "open", "verified", "selected", "yes"];
const DANGER = ["inactive", "rejected", "closed", "not verified", "no", "frozen"];
// Everything else (Pending, Draft, Review, Applied, Wishlist, Pause, N/A...)
// reads as a neutral/muted pill rather than guessing a color for it.

// Renders any status string as a dark-theme pill, colored by what it means
// rather than by a fixed per-table list - so a new status value anywhere
// still gets a sensible color instead of falling through unstyled.
const StatusBadge = ({ status }) => {
  if (status === null || status === undefined || status === "") {
    return <span className="dt-badge dt-badge--na">N/A</span>;
  }

  const normalized = String(status).trim().toLowerCase();
  let variant = "muted";
  if (SUCCESS.includes(normalized)) variant = "success";
  else if (DANGER.includes(normalized)) variant = "danger";

  return <span className={`dt-badge dt-badge--${variant}`}>{status}</span>;
};

export default StatusBadge;
