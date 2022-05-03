import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Grid, } from "@mui/material";
import { IoMdPower } from "react-icons/io";
import Cbutton from "./CustomButton";
function NavbarScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

NavbarScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function PostNavbar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavbarScroll {...props}>
        <AppBar elevation={10} sx={{ backgroundColor: "#fff" }}>
          <Toolbar>
            <Grid container display='flex'>
              <Grid item xs={9}>
                <Grid container display='flex' spacing={1}>
                  <Grid item>
                    <Typography fontFamily='Poppins' color='#000' fontSize={36}>
                      My
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      fontFamily='Poppins'
                      color='#B91646'
                      fontSize={36}
                    >
                      Posts
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} display='flex' justifyContent='flex-end'>
                {props.open ? (
                  <Cbutton onClick={props.handleClose}>Close</Cbutton>
                ) : (
                  <Cbutton onClick={props.handleOpen}>Add Post</Cbutton>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </NavbarScroll>
    </React.Fragment>
  );
}
