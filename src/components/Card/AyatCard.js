/* eslint-disable react/prop-types */
import { makeStyles } from "@material-ui/core";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const useStyles = makeStyles(() => ({
  arabText: {
    width: 700,
    fontSize: 25,
    borderRadius: 20,
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right",
    fontWeight: "bold",
    "@media (max-width: 500px)": {
      width: 250,
    },
    "@media screen and (max-width: 1000px) and (min-width: 510px)": {
      width: 500,
    },
    "@media screen and (min-width: 1024px) and (max-width: 1030px)": {
      width: 650,
    },
  },
}));

export const AyatCard = ({ data }) => {
  const classes = useStyles();
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
            "@media (max-width: 500px)": {
              width: 330,
            },
            "@media screen and (max-width: 1000px) and (min-width: 510px)": {
              width: 650,
            },
            "@media screen and (min-width: 1024px) and (max-width: 1030px)": {
              width: 700,
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
                    <div className={classes.arabText}>
                      <Typography
                        sx={{
                          fontSize: 35,
                          "@media (max-width: 500px)": {
                            fontSize: 28,
                          },
                          "@media screen and (max-width: 1000px) and (min-width: 510px)":
                            {
                              fontSize: 28,
                            },
                        }}
                      >
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
                            "@media (max-width: 500px)": {
                              fontSize: 12,
                            },
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
                            "@media (max-width: 500px)": {
                              fontSize: 12,
                            },
                          }}
                        >
                          {value.teksIndonesia}
                        </Typography>
                      </Box>
                    </Grid>
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
