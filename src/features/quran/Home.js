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

import "./styles/home_style.css";
import "../../components/Search/style.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import openedQuranIcon from "../../assets/images/open_book_icon.svg";
import dotsNineIcon from "../../assets/images/dots-nine-selected.svg";
import quranLogo from "../../assets/images/quran.png";
import { Close, HomeRounded, MenuRounded } from "@mui/icons-material";
import { SurahCard } from "../../components/Card/SurahCard";
import { getSuratDetail, getSuratList } from "./services/quran_service";
// import { Search } from "../../components/Search/Search";
import { ModalDialog } from "../../components/ModalDialog/ModalDialog";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  suratList: {
    background: "#EBEFF1",
    width: "80%",
    marginTop: "0.5em",
    borderRadius: 40,
    padding: 30,
    display: "inline-block",
    overflowY: "scroll",
    maxHeight: 580,
    "@media (max-width: 500px)": {
      width: "85%",
      marginLeft: 8,
      paddingLeft: 10,
      paddingRight: 30,
      paddingTop: 30,
      paddingBottom: 30,
      borderRadius: 30,
    },
  },
}));

export const Home = () => {
  const [menuListIndex, setMenuListIndex] = useState(0);
  const [isQuran, setIsQuran] = useState(true);
  const [suratList, setSuratList] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [ayatOfTheDay, setAyatOfTheDay] = useState({
    ayatNumber: "",
    suratNumber: "",
    ayatTeksIndo: "",
  });

  const classes = useStyles();
  const history = useHistory();

  const surahIndex = Array.from({ length: 114 }, (_, index) => index + 1);
  const getRandomIndex = Math.floor(Math.random() * surahIndex.length);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const searching = (query) => {
  //   setQueryString(query);
  // };

  useEffect(async () => {
    const surat = await getSuratList();
    const suratDetail = await getSuratDetail(surahIndex[getRandomIndex]);

    const ayatIndex = Array.from(
      { length: suratDetail?.data?.data?.jumlahAyat },
      (_, index) => index + 1
    );

    const getRandomAyatIndex = Math.floor(Math.random() * ayatIndex.length);
    const randomAyat = suratDetail?.data?.data?.ayat[getRandomAyatIndex];
    const ayatKe = randomAyat.nomorAyat;

    setAyatOfTheDay({
      ayatNumber: ayatKe,
      suratNumber: suratDetail?.data?.data?.nomor,
      ayatTeksIndo: randomAyat.teksIndonesia,
    });

    setSuratList(surat?.data?.data);
  }, []);

  const query = suratList?.filter((item) => {
    return item.namaLatin.toLowerCase().includes(queryString.trimStart());
  });

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
    {
      title: "Ayat of the Day",
      icon: <MenuBookRoundedIcon />,
      onClick: handleClickOpen,
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
        <ModalDialog
          content={ayatOfTheDay}
          isOpen={open}
          handleClose={handleClose}
        />
      </List>
      <Divider />
    </Box>
  );
  // End of Drawer

  // debugging

  console.log("surat filter: ", query);
  console.log("surat list: ", suratList);
  console.log(queryString);

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
        <div className="searchbar-container">
          <input
            type="search"
            name="search"
            placeholder={"Search"}
            className="searchInput"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            // onKeyUp={() => query}
          />
        </div>
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
                <IconButton>
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
        <div className={classes.suratList}>
          <Grid container gap={0.5}>
            {window.innerWidth >= 500 ? (
              <React.Fragment>
                <Grid item>
                  <IconButton onClick={() => setMenuListIndex(0)}>
                    {menuListIndex === 0 ? (
                      <img
                        src={dotsNineIcon}
                        height={25}
                        width={25}
                        alt="dots-nine"
                      />
                    ) : (
                      <img
                        src={dotsNineIcon}
                        height={25}
                        width={25}
                        alt="dots-nine"
                        style={{
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => setMenuListIndex(1)}>
                    {menuListIndex === 0 ? (
                      <MenuRounded
                        color="black"
                        sx={{
                          opacity: 0.4,
                        }}
                      />
                    ) : (
                      <MenuRounded color="black" />
                    )}
                  </IconButton>
                </Grid>
              </React.Fragment>
            ) : null}
            <Grid
              container
              paddingLeft={window.innerWidth >= 500 ? 1.2 : null}
              marginTop={window.innerWidth >= 500 ? 5 : null}
              gap={2}
            >
              {menuListIndex === 0 ? (
                <SurahCard
                  menuIndex={menuListIndex}
                  data={queryString === "" ? suratList : query}
                />
              ) : (
                <SurahCard
                  menuIndex={menuListIndex}
                  data={queryString === "" ? suratList : query}
                />
              )}
            </Grid>
          </Grid>
        </div>
        {window.innerWidth >= 500 ? (
          <Sidebar width="18.2%">
            <div style={{ marginTop: "1em", padding: "2em" }}>
              <Card
                sx={{
                  background: "#05AC67",
                  color: "#FFFFFF",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: 14,
                      }}
                    >
                      Ayat of the day
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 6,
                      }}
                    >
                      {ayatOfTheDay.ayatTeksIndo}
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      marginTop: 1,
                      marginBottom: 2,
                      borderBottomWidth: 0.1,
                      opacity: 0.5,
                      backgroundColor: "#ffffff",
                    }}
                  />
                  <Button
                    size="small"
                    onClick={handleClickOpen}
                    sx={{
                      fontSize: 10,
                      color: "#ffffff",
                      textTransform: "capitalize",
                    }}
                  >
                    Read more...
                  </Button>
                  <ModalDialog
                    content={ayatOfTheDay}
                    isOpen={open}
                    handleClose={handleClose}
                  />
                </CardContent>
              </Card>
            </div>
          </Sidebar>
        ) : null}
      </div>
    </React.Fragment>
  );
};
