/* eslint-disable react/prop-types */
import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

export const Header = (props) => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          elevation={0}
          position="static"
          sx={{ background: "#FFFFFF", color: "#3D454F" }}
        >
          <Toolbar>{props.children}</Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
