import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/SideBar/Sidebar";
import {
  Autocomplete,
  Box,
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
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import openedQuranIcon from "../../assets/images/open_book_icon_disable.svg";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import quranLogo from "../../assets/images/quran.png";
import { useHistory } from "react-router-dom";
import { CalendarMonthOutlined, Close, HomeRounded } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";
import {
  getCityList,
  getProvinceList,
  getSholatSchedule,
} from "./services/imsakiyah_service";

const useStyles = makeStyles(() => ({
  imsakiyahSchedule: {
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
  header: {
    width: 700,
    fontSize: 25,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
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
  sticky: {
    "@media (max-width: 500px)": {
      position: "sticky",
      left: 0,
      boxShadow: "0.5px 0.5px 0.5px grey  ",
      borderRight: "0.5px solid black",
    },
  },
  tableHead: {
    background: "#B5C2CD",
    "@media (max-width: 500px)": {
      background: "#B5C2CD",
    },
  },
}));

export const Imsakiyah = () => {
  const [isQuran, setIsQuran] = useState(true);
  const history = useHistory();
  const classes = useStyles();
  const [provinceList, setProvinceList] = useState([]);
  const [province, setProvince] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [solatSchedule, setSolatSchedule] = useState({});
  const [sholatTime, setSholatTime] = useState([]);

  const sideBarMenu = [
    {
      title: "Quran",
      icon: (
        <img src={openedQuranIcon} height={30} width={30} alt="quran-logo" />
      ),
      onClick: () => history.push("/"),
    },
    {
      title: "Imsakiyah",
      icon: <CalendarMonthOutlined sx={{ color: "#3B9B6E" }} />,
      onClick: () => history.push("imsakiyah"),
    },
  ];

  useEffect(async () => {
    const getProvince = await getProvinceList();
    const getCity = await getCityList(province);

    setProvinceList(getProvince?.data?.data);
    setCityList(getCity?.data?.data);

    const getSholatTime = await getSholatSchedule(province, city);
    Object.assign(solatSchedule, getSholatTime?.data?.data?.data);

    setSolatSchedule(
      typeof getSholatTime === "object"
        ? await getSholatTime?.data?.data?.data
        : {}
    );

    setSholatTime(Object.values(solatSchedule));
  }, [province, city]);

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

  const onChangeProvince = (event, value) => {
    setProvince(value);
  };

  const onChangeCity = (event, value) => {
    setCity(value);
  };

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
            <div
              style={{
                marginTop: "2em",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {sideBarMenu.map((menu, index) => (
                <Tooltip key={index} title={menu.title} placement="right">
                  <IconButton onClick={menu.onClick}>{menu.icon}</IconButton>
                </Tooltip>
              ))}
            </div>
          </Sidebar>
        ) : null}
        <div className={classes.imsakiyahSchedule}>
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
                    <div className={classes.header}>
                      <Typography
                        paddingTop={2}
                        sx={{
                          fontSize: 20,
                          "@media (max-width: 500px)": {
                            fontSize: 20,
                          },
                        }}
                      >
                        Jadwal Imsakiyah Ramadhan 1444 H / 2023 M
                      </Typography>
                      <Typography
                        paddingTop={2}
                        sx={{
                          fontSize: 20,
                          "@media (max-width: 500px)": {
                            fontSize: 20,
                          },
                        }}
                      >
                        {city} - {province}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid item>
                  <Autocomplete
                    // id="disabled-options-demo"
                    onChange={onChangeProvince}
                    options={provinceList}
                    getOptionDisabled={(option) => option}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Pilih Provinsi" />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Autocomplete
                    // id="disabled-options-demo"
                    onChange={onChangeCity}
                    options={cityList ? cityList : []}
                    getOptionDisabled={(option) => option}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Pilih Kota/Kab" />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ borderRadius: 2, marginTop: 5 }}>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      <TableCell className={classes.sticky}>Tanggal</TableCell>
                      <TableCell align="right">Imsak</TableCell>
                      <TableCell align="right">Subuh</TableCell>
                      <TableCell align="right">Fajr</TableCell>
                      <TableCell align="right">Dhuha</TableCell>
                      <TableCell align="right">Dzuhur</TableCell>
                      <TableCell align="right">Ashar</TableCell>
                      <TableCell align="right">Maghrib</TableCell>
                      <TableCell align="right">Isya</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sholatTime.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.sticky}
                        >
                          {row.tanggal}
                        </TableCell>
                        <TableCell align="right">{row.imsak}</TableCell>
                        <TableCell align="right">{row.subuh}</TableCell>
                        <TableCell align="right">{row.terbit}</TableCell>
                        <TableCell align="right">{row.dhuha}</TableCell>
                        <TableCell align="right">{row.dzuhur}</TableCell>
                        <TableCell align="right">{row.ashar}</TableCell>
                        <TableCell align="right">{row.maghrib}</TableCell>
                        <TableCell align="right">{row.isya}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
