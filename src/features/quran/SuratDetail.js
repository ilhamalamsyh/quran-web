import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/SideBar/Sidebar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from "@mui/material";

import openedQuranIcon from "../../assets/images/open_book_icon.svg";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import quranLogo from "../../assets/images/quran.png";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import { getSuratDetail } from "./services/quran_service";
import { AyatCard } from "../../components/Card/AyatCard";
import { useHistory, useParams } from "react-router-dom";
import {
  ArrowBack,
  ArrowForward,
  Close,
  HomeRounded,
  Info,
} from "@mui/icons-material";
import { ModalDialogSuratDetail } from "../../components/ModalDialog/ModalDialogSuratDetail";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  ayatList: {
    background: "#EBEFF1",
    width: "74%",
    marginTop: "0.5em",
    borderRadius: 40,
    padding: 30,
    display: "inline-block",
    overflowY: "scroll",
    maxHeight: 580,
    "@media (max-width: 500px)": {
      width: "90%",
      marginLeft: 5,
      paddingLeft: 10,
      paddingRight: 12,
      paddingTop: 30,
      paddingBottom: 30,
      borderRadius: 30,
    },
  },
  suratHeader: {
    width: 700,
    fontSize: 25,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    gap: 12,
    "@media (max-width: 500px)": {
      width: 200,
      fontSize: 12,
      gap: 10,
    },
  },
}));

export const SuratDetail = () => {
  const { nomor } = useParams();
  const [isQuran, setIsQuran] = useState(true);
  const [ayatList, setAyatList] = useState([]);
  const [surat, setSurat] = useState({});
  const history = useHistory();
  const classes = useStyles();

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

  // Start of Drawer
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuListData = [
    {
      title: "Home",
      icon: <HomeRounded />,
      onClick: () => history.push("/"),
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ textAlign: "right", paddingRight: 10 }}>
        <IconButton>
          <Close />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuListData.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={menu.onClick}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  // End of Drawer

  return (
    <React.Fragment>
      <Header>
        <div className="container-logo">
          {window.innerWidth >= 500 ? (
            <img className="logo-image" src={quranLogo} alt="quran-logo" />
          ) : (
            <React.Fragment>
              <IconButton onClick={toggleDrawer("left", true)}>
                <MenuRoundedIcon color="primary" />
              </IconButton>
              <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
              </SwipeableDrawer>
            </React.Fragment>
          )}
        </div>
        {window.innerWidth >= 500 ? (
          <div className="header-menu">
            {isQuran ? (
              <React.Fragment>
                <div onClick={() => setIsQuran(true)}>
                  <p className="header-menu-text-selected">Quran</p>
                </div>
                <div onClick={() => setIsQuran(false)}>
                  <p className="header-menu-text-unselected">Hadith</p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div onClick={() => setIsQuran(true)}>
                  <p className="header-menu-text-unselected">Quran</p>
                </div>
                <div onClick={() => setIsQuran(false)}>
                  <p className="header-menu-text-selected">Hadith</p>
                </div>
              </React.Fragment>
            )}
          </div>
        ) : (
          <div>
            <p className="header-menu-text-selected">Quran</p>
          </div>
        )}
      </Header>
      <div
        style={{
          display: "flex",
        }}
      >
        {window.innerWidth >= 500 ? (
          <Sidebar>
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
        ) : null}
        <div className={classes.ayatList}>
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
                    <div className={classes.suratHeader}>
                      <Typography
                        paddingTop={2}
                        sx={{
                          fontSize: 20,
                          "@media (max-width: 500px)": {
                            fontSize: 14,
                          },
                        }}
                      >
                        {surat.namaLatin}
                      </Typography>
                      <Brightness5OutlinedIcon
                        fontSize="small"
                        sx={{ paddingTop: 2 }}
                      />
                      <Typography
                        paddingTop={window.innerWidth >= 500 ? 0 : 1.5}
                        sx={{
                          fontSize: 40,
                          "@media (max-width: 500px)": {
                            fontSize: 20,
                          },
                        }}
                      >
                        {surat.nama}
                      </Typography>
                    </div>
                    {surat.nomor === 1 ? null : (
                      <div className={classes.suratHeader}>
                        <Typography
                          sx={{
                            fontSize: 35,
                            "@media (max-width: 500px)": {
                              fontSize: 25,
                            },
                          }}
                        >
                          بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيْمِ
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
                      "@media (max-width: 500px)": {
                        fontSize: "12px",
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
                  startIcon={
                    <ArrowBack
                      fontSize={window.innerWidth >= 500 ? "medium" : "small"}
                    />
                  }
                  sx={{
                    borderRadius: 20,
                    fontSize: "14px",
                    textTransform: "none",
                    color: "#2c5f2dff",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "@media (max-width: 500px)": {
                      fontSize: "11px",
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
                  endIcon={
                    <ArrowForward
                      fontSize={window.innerWidth >= 500 ? "medium" : "small"}
                    />
                  }
                  sx={{
                    borderRadius: 20,
                    fontSize: "14px",
                    textTransform: "none",
                    color: "#2c5f2dff",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "@media (max-width: 500px)": {
                      fontSize: "11px",
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
