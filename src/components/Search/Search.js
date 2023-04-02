/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./style.css";

export const Search = ({ searchQuery, q }) => {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState("");
  const placeholder = "Search...";

  return (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder={placeholder}
        className="searchInput"
        value={q}
        onChange={(e) => setQuery(searchQuery(e.target.value))}
      />
    </div>
  );
};
