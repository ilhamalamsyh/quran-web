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
  Tooltip,
  Typography,
} from "@mui/material";

import openedQuranIcon from "../../assets/images/open_book_icon.svg";
import dotsNineIcon from "../../assets/images/dots-nine-selected.svg";
import quranLogo from "../../assets/images/quran.png";
import { MenuRounded } from "@mui/icons-material";
import { SurahCard } from "../../components/Card/SurahCard";
import { getSuratDetail, getSuratList } from "./services/quran_service";
import { Search } from "../../components/Search/Search";
import { ModalDialog } from "../../components/ModalDialog/ModalDialog";

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

  const surahIndex = Array.from({ length: 114 }, (_, index) => index + 1);
  const getRandomIndex = Math.floor(Math.random() * surahIndex.length);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searching = (query) => {
    setQueryString(query);
  };

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
    return item.namaLatin.toLowerCase().includes(queryString);
  });

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
        <Search searchQuery={searching} />
      </Header>
      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar width="7.8%">
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
          <Grid container gap={0.5}>
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

            <Grid container paddingLeft={1.2} marginTop={5} gap={2}>
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
        <Sidebar width="18.2%">
          <div style={{ marginTop: "1em", padding: "2em" }}>
            <Card
              sx={{ background: "#05AC67", color: "#FFFFFF", borderRadius: 3 }}
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
                  {/* TODO: algorithm to get the random ayat
                1. create number array from 1 until 114
                2. when reload:
                  1. randomize the number array
                  2. when get the number, passing to surat detail endpoint
                  3. success get data, randomize respon for ayat and get the teks indonesia
                   */}
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
      </div>
    </React.Fragment>
  );
};
