import React from "react";

// The "Show N entries / Search:" bar used above every dark-themed admin
// data table. Purely presentational + controlled - each table owns its own
// entries/search state and wires the change handlers to its own fetch.
const TableToolbar = ({
  entries,
  onEntriesChange,
  entriesOptions = [10, 25, 50, 100],
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
}) => {
  return (
    <div className="dt-toolbar">
      <div className="dt-toolbar-entries">
        <span>Show</span>
        <select
          value={entries}
          onChange={(e) => onEntriesChange(Number(e.target.value))}
        >
          {entriesOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span>entries</span>
      </div>
      <div className="dt-toolbar-search">
        <span>Search:</span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>
    </div>
  );
};

export default TableToolbar;
