/* eslint-disable react/prop-types */
import React from "react";
import "./sidebar.css";

export const Sidebar = (props) => {
  const width = props.width;
  return (
    <React.Fragment>
      <div className="sidebar" style={{ width: width }}>
        {props.children}
      </div>
    </React.Fragment>
  );
};
