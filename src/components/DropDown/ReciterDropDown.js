/* eslint-disable react/prop-types */
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./dropdown.css";

export const ReciterDropDown = ({
  reciters,
  toogleDropDownReciter,
  handleReciterClick,
  isOpen,
  selectedReciter,
}) => {
  return (
    <React.Fragment>
      <div style={{ marginLeft: 4, marginBottom: 10 }}>Pilih Reciter</div>
      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => toogleDropDownReciter()}
        >
          {selectedReciter
            ? reciters.find((item) => item.id == selectedReciter).name
            : "Pilih Reciter"}
          <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}>
            <ChevronRightIcon fontSize="small" color="primary" />
          </i>
        </div>
        <div className={`dropdown-body ${isOpen && "open"}`}>
          {reciters.map((item) => (
            <div
              key={item.id}
              className="dropdown-item"
              onClick={(e) => {
                handleReciterClick(e.target.id);
              }}
              id={item.id}
            >
              <span
                className={`dropdown-item-dot ${
                  item.id == selectedReciter && "selected"
                }`}
              >
                •
              </span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
