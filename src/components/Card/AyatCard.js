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

export const AyatCard = ({ data }) => {
  return data?.map((value) => {
    return (
      <div key={value.nomorAyat}>
        <Card
          sx={{
            borderRadius: 3,
            width: 900,
            boxShadow: "0px 2px 40px -28px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12px rgba(0,0,0,0.3)",
            },
          }}
          elevation={0}
        >
          <CardActionArea>
            <CardContent>
              <Grid container display="flex" flexDirection="column" gap={6}>
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
                      {value.nomorAyat}
                    </div>
                    <div
                      style={{
                        width: 700,
                        fontSize: 25,
                        borderRadius: 20,
                        display: "flex",
                        justifyContent: "flex-end",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography sx={{ fontSize: 35 }}>
                        {value.teksArab}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container display="flex" flexDirection="column" gap={1}>
                    <Grid item>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {value.teksLatin}
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
                          {value.teksIndonesia}
                        </Typography>
                      </Box>
                    </Grid>
                    {/* <Grid item sx={{ paddingTop: 2 }}>
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
                    </Grid> */}
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
