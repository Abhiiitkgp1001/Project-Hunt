import React from "react";
import { Grid, Typography } from "@mui/material";
const displayBox = (probs) => {
  return (
    <Grid
      item
      px={1}
      py={0.5}
      marginRight={1}
      borderRadius='8px'
      marginBottom={1}
      sx={probs.background}
    >
      <Typography fontFamily='Poppins' color={probs.color} fontSize={14}>
        {probs.title}
      </Typography>
    </Grid>
  );
};

export default displayBox;
