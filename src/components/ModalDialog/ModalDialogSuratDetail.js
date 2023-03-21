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
  Typography,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalDialogSuratDetail = ({ content, isOpen, handleClose }) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Grid container display={"flex"} flexDirection={"column"}>
          <Grid item>
            <Grid container display={"flex"} justifyContent="space-between">
              <Grid item textAlign={"center"}>
                <Typography sx={{ fontSize: 20 }}>
                  Surat {content.namaLatin} ({content.arti})
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container display={"flex"} flexDirection={"column"}>
              <Grid item>
                <Typography>Jumlah ayat {content.jumlahAyat}</Typography>
              </Grid>
              <Grid item>
                <Typography>Surat ke {content.nomor}</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Diturunkan di kota {content.tempatTurun}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ maxWidth: 600, width: 500, paddingBottom: 4 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid container display={"flex"} direction={"column"}>
            <Grid item>
              <Typography>{content.deskripsi}</Typography>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
