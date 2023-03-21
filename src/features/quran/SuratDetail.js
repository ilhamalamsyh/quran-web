import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/SideBar/Sidebar";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import openedQuranIcon from "../../assets/images/open_book_icon.svg";

import quranLogo from "../../assets/images/quran.png";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import { getSuratDetail } from "./services/quran_service";
import { AyatCard } from "../../components/Card/AyatCard";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack, ArrowForward, Info } from "@mui/icons-material";
import { ModalDialogSuratDetail } from "../../components/ModalDialog/ModalDialogSuratDetail";

export const SuratDetail = () => {
  const { nomor } = useParams();
  const [isQuran, setIsQuran] = useState(true);
  const [ayatList, setAyatList] = useState([]);
  const [surat, setSurat] = useState({});
  const history = useHistory();

  const surahIndex = Array.from({ length: 114 }, (_, index) => index + 1);
  // eslint-disable-next-line no-unused-vars
  const getRandomIndex = Math.floor(Math.random() * surahIndex.length);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    const suratDetail = await getSuratDetail(nomor);
    setSurat(suratDetail?.data?.data);
    setAyatList(suratDetail?.data?.data?.ayat);
  }, []);

  return (
    <React.Fragment>
      <Header>
        <div style={{ marginRight: "2.3%", marginLeft: 8 }}>
          <img src={quranLogo} height={40} width={40} alt="quran-logo" />
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            gap: "10%",
          }}
        >
          {isQuran ? (
            <React.Fragment>
              <div onClick={() => setIsQuran(true)}>
                <p style={{ fontWeight: "bold", fontSize: "22px" }}>Quran</p>
              </div>
              <div onClick={() => setIsQuran(false)}>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#B5C2CD",
                  }}
                >
                  Hadith
                </p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div onClick={() => setIsQuran(true)}>
                <p style={{ fontSize: "22px", color: "#B5C2CD" }}>Quran</p>
              </div>
              <div onClick={() => setIsQuran(false)}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  Hadith
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
      </Header>
      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar width="7.8%">
          <div style={{ marginTop: "2em" }}>
            <Tooltip title="Quran">
              <IconButton onClick={() => history.push("/")}>
                <img
                  src={openedQuranIcon}
                  height={30}
                  width={30}
                  alt="quran-logo"
                />
              </IconButton>
            </Tooltip>
          </div>
        </Sidebar>
        <div
          style={{
            background: "#EBEFF1",
            width: "74%",
            marginTop: "0.5em",
            borderRadius: 40,
            padding: 30,
            display: "inline-block",
            overflowY: "scroll",
            maxHeight: 580,
          }}
        >
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Grid
                container
                display="flex"
                flexDirection="column"
                gap={6}
                paddingTop={2}
              >
                <Grid item>
                  <Grid
                    container
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    rowGap={2}
                  >
                    <div
                      style={{
                        width: 700,
                        fontSize: 25,
                        borderRadius: 20,
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        fontWeight: "bold",
                        gap: 12,
                      }}
                    >
                      <Typography paddingTop={2} sx={{ fontSize: 20 }}>
                        {surat.namaLatin}
                      </Typography>
                      <Brightness5OutlinedIcon sx={{ paddingTop: 2 }} />
                      <Typography sx={{ fontSize: 40 }}>
                        {surat.nama}
                      </Typography>
                    </div>
                    {surat.nomor === 1 ? null : (
                      <div
                        style={{
                          width: 700,
                          fontSize: 25,
                          borderRadius: 20,
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <Typography sx={{ fontSize: 35 }}>
                          بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
                        </Typography>
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleClickOpen}
                    disableRipple
                    variant="text"
                    endIcon={<Info fontSize="small" />}
                    sx={{
                      borderRadius: 20,
                      fontSize: "14px",
                      textTransform: "none",
                      color: "#2c5f2dff",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Info Surat
                  </Button>
                  <ModalDialogSuratDetail
                    content={surat}
                    isOpen={open}
                    handleClose={handleClose}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid container gap={0.5} display={"flex"}>
            <Grid container marginTop={5} gap={2} justifyContent={"center"}>
              <AyatCard data={ayatList} />
            </Grid>
            <Grid
              container
              marginTop={5}
              gap={2}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={
                surat.suratSebelumnya === false ? "end" : "space-between"
              }
            >
              {surat.suratSebelumnya === false ? null : (
                <Button
                  onClick={() => {
                    history.push(`/surat/${surat.suratSebelumnya?.nomor}`);
                    window.location.reload(true);
                  }}
                  disableRipple
                  variant="text"
                  startIcon={<ArrowBack />}
                  sx={{
                    borderRadius: 20,
                    fontSize: "14px",
                    textTransform: "none",
                    color: "#2c5f2dff",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  Surat sebelumnya
                </Button>
              )}
              {surat.suratSelanjutnya === false ? null : (
                <Button
                  onClick={() => {
                    history.push(`/surat/${surat.suratSelanjutnya?.nomor}`);
                    window.location.reload(true);
                  }}
                  disableRipple
                  variant="text"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 20,
                    fontSize: "14px",
                    textTransform: "none",
                    color: "#2c5f2dff",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  Surat berikutnya
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};
