/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./style.css";

export const Search = ({ searchQuery, q }) => {
  const [query, setQuery] = useState("");
  const placeholder = "Search...";

  console.log("query-search: ", q);
  console.log("query-search-2: ", query);

  return (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder={placeholder}
        className="searchInput"
        value={q}
        onChange={(e) => setQuery(searchQuery(e.target.value))}
        onKeyUp={() => query}
      />
    </div>
  );
};
