/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalDialog = ({ content, isOpen, handleClose }) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Grid container display={"flex"} justifyContent="space-between">
          <Grid item textAlign={"center"}>
            Ayat of the Day
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ maxWidth: 400 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid container display={"flex"} direction={"column"}>
            <Grid item>{content.ayatTeksIndo}</Grid>
            <Grid
              item
              textAlign={"center"}
            >{`Quran (${content.suratNumber}:${content.ayatNumber})`}</Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
