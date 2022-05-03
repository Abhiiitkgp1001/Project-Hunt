import React from "react";
import { Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import DisplayBox from "./displayBox";
const postStructure = (probs) => {
  return (
    <Grid
      container
      display='flex'
      flexGrow={1}
      flexDirection='row'
      rowSpacing={0}
      columnSpacing={1.5}
    >
      <Grid
        item
        border='solid'
        borderColor='#fff'
        borderRadius='16px'
        py={1}
        sx={{
          background:
            "-webkit-linear-gradient(-45deg, #141e31 50%, #233a54 50%)",
          background: "linear-gradient(-45deg, #141e31 50%, #233a54 50%)",
        }}
        justifyContent='center'
        display='flex'
        flexDirection='column'
        xs={12}
        sm={3}
      >
        <Typography
          color='#fff'
          lineHeight={1.14}
          fontSize={70}
          fontWeight='600'
        >
          {probs.day}
        </Typography>
        <Typography
          lineHeight={1.14}
          color='#fff'
          fontSize={30}
          fontWeight='600'
        >
          {probs.month}
        </Typography>
      </Grid>
      <Grid item textAlign='left' xs={12} sm={8}>
        <Grid>
          <Grid item>
            <Typography color='#000' fontSize={25} fontWeight='600'>
              {probs.title}
            </Typography>
          </Grid>
          <Grid item>
            <Box component='div' textOverflow='ellipsis' overflow='hidden'>
              {/* <Typography
                color='#000'
                fontSize={15}
                lineHeight={1.14}
                fontWeight='500'
                textOverflow='ellipsis'
                overflow='hidden'
              >
                {probs.description}
              </Typography> */}
              {probs.description}
            </Box>
          </Grid>
          <Grid item marginTop={1.2}>
            <Grid>
              <Grid item>
                <Typography color='#000' fontSize={16} fontWeight='600'>
                  Needed
                </Typography>
              </Grid>
              <Grid item>
                <Grid container display='flex'>
                  {probs.needed.map((item) => {
                    if (probs.needed.indexOf(item) === 0)
                      return (
                        <DisplayBox
                          key={item}
                          title={item}
                          background={{ backgroundColor: "#233a54" }}
                          color='#fff'
                        />
                      );
                    else
                      return (
                        <DisplayBox
                          key={item}
                          title={item}
                          color='#000'
                          background={{ backgroundColor: "#f7f7f7" }}
                        />
                      );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item marginTop={1.2}>
            <Grid>
              <Grid item>
                <Typography color='#000' fontSize={16} fontWeight='600'>
                  Technology to be used
                </Typography>
              </Grid>
              <Grid item>
                <Grid container display='flex'>
                  {probs.technology.map((item) => {
                    if (probs.technology.indexOf(item) === 0)
                      return (
                        <DisplayBox
                          title={item}
                          key={item}
                          background={{ backgroundColor: "#233a54" }}
                          color='#fff'
                        />
                      );
                    else
                      return (
                        <DisplayBox
                          title={item}
                          key={item}
                          color='#000'
                          background={{ backgroundColor: "#f7f7f7" }}
                        />
                      );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default postStructure;
