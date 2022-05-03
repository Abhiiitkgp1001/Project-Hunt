import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Grid, Avatar, Button } from "@mui/material";
import { IoMdPower } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

export default function Navbar(props) {
  const token = useSelector((state) => state.token);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const Login = () => {
    Navigate("/");
  };
  const Logout = () => {
    Navigate("/");
    dispatch({ type: "Logout" });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <NavbarScroll {...props}>
        <AppBar elevation={10} sx={{ backgroundColor: "#fff" }}>
          <Toolbar>
            <Grid container alignItems='center' display='flex'>
              <Grid item xs={9}>
                <Grid container display='flex' spacing={1}>
                  <Grid item>
                    <Typography fontFamily='Poppins' color='#000' fontSize={36}>
                      Project
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      fontFamily='Poppins'
                      color='#B91646'
                      fontSize={36}
                    >
                      Hunt
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {token ? (
                <Grid item xs={3} display='flex' justifyContent='flex-end'>
                  <Button onClick={Logout}>
                    <Avatar
                      sx={{
                        my: 2,
                        backgroundColor: "#f7f7f7",
                        width: 36,
                        height: 36,
                      }}
                    >
                      <IoMdPower color='#B91646' />
                    </Avatar>
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={3} display='flex' justifyContent='flex-end'>
                  <Cbutton onClick={Login}>Login</Cbutton>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </NavbarScroll>
    </React.Fragment>
  );
}
