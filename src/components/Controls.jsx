import React from "react";
import "./Controls.css";


export default function Controls({ search, setSearch, region, setRegion, clearFilters }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <button className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}
