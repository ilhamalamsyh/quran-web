/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const SurahCard = ({ menuIndex, data }) => {
  let width = 0;
  menuIndex === 0 ? (width = 200) : (width = 800);
  const history = useHistory();

  return data?.map((value) => {
    return (
      <div key={value.nomor}>
        <Card
          sx={{
            borderRadius: 3,
            width: width,
            boxShadow: "0px 2px 40px -28px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12px rgba(0,0,0,0.3)",
            },
          }}
          elevation={0}
          onClick={() => history.push(`/surat/${value.nomor}`)}
        >
          <CardActionArea>
            <CardContent>
              <Grid container display="flex" flexDirection="column" gap={4}>
                <Grid item>
                  <Grid
                    container
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        background: "#90D0B5",
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#3B9B6E",
                        fontWeight: "bold",
                      }}
                    >
                      {value.nomor}
                    </div>
                    <div
                      style={{
                        //   background: "#90D0B5",
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        //   color: "#3B9B6E",
                        fontWeight: "bold",
                      }}
                    >
                      {value.nama}
                    </div>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container display="flex" flexDirection="column">
                    <Grid item>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {value.namaLatin}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            opacity: 0.3,
                            fontWeight: "bold",
                          }}
                        >
                          {value.arti}
                        </Typography>
                      </Box>
                    </Grid>
                    {menuIndex === 1 ? (
                      <Grid item sx={{ paddingTop: 2 }}>
                        <Grid
                          container
                          display="flex"
                          flexDirection="row"
                          gap={2}
                        >
                          <Grid item>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  background: "#90D0B5",
                                  width: 100,
                                  height: 30,
                                  borderRadius: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#3B9B6E",
                                }}
                              >
                                {value.jumlahAyat} Ayat
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  background: "#90D0B5",
                                  width: 100,
                                  height: 30,
                                  borderRadius: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#3B9B6E",
                                }}
                              >
                                {value.tempatTurun}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item sx={{ paddingTop: 2 }}>
                        <Grid
                          container
                          display="flex"
                          flexDirection="row"
                          gap={2}
                        >
                          <Grid item>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 11,
                                  fontWeight: "bold",
                                  background: "#90D0B5",
                                  width: 65,
                                  height: 30,
                                  borderRadius: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#3B9B6E",
                                }}
                              >
                                {value.jumlahAyat} Ayat
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 11,
                                  fontWeight: "bold",
                                  background: "#90D0B5",
                                  width: 80,
                                  height: 30,
                                  borderRadius: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#3B9B6E",
                                }}
                              >
                                {value.tempatTurun}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  });
};
