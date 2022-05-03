import { Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
const Cbutton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  borderRadius: "8px",
  color: "white",
  padding: "8px 60px",
  backgroundColor: "#2C2E43",
  "&:hover": {
    backgroundColor: "#03045E",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#2C2E43",
  },
});

export default Cbutton;
