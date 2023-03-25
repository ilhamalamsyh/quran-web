/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./style.css";

export const Search = ({ searchQuery }) => {
  const [query, setQuery] = useState("");
  const placeholder = "Search...";

  return (
    <div className="searchbar-container">
      <form>
        <input
          type="search"
          placeholder={placeholder}
          className="searchInput"
          value={query}
          onChange={(e) => setQuery(searchQuery(e.target.value))}
        />
      </form>
    </div>
  );
};
