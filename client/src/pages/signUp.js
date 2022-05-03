import { Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CgUserlane } from "react-icons/cg";
import Cbutton from "../Components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import Register from "../api/post/register_user";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const { userName, userEmail, userPassword } = formData;

  const onChange = (item) =>
    setFormData({ ...formData, [item.target.name]: item.target.value });

  const onSubmit = async (item) => {
    item.preventDefault();

    if (
      userPassword.length < 6 ||
      userName.length === 0 ||
      userEmail.length === 0
    ) {
      console.log("wrong entry");
    } else {
      console.log(formData);
      const response = await Register(userName, userEmail, userPassword);
      console.log(response);
      if (response["token"]) {
        console.log("dispatching action");
        console.log(response["token"]);
        dispatch({ type: "Login", token: response["token"] });
        Navigate("/home");
      } else {
        console.log("Error present");
        console.log("error");
      }
    }
  };

  return (
    <Grid
      sx={{
        backgroundColor: "#2C2E43",
      }}
      height='100vh'
      p={1.5}
      container
      display='flex'
    >
      <Paper
        sx={{
          m: "auto",
          width: 480,
          py: 5,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.25)",
          borderRadius: "20px",
        }}
        elevation={10}
      >
        <Grid>
          <CgUserlane size={80} />
        </Grid>
        <Grid my={2}></Grid>
        <Typography color='#2C2E43' fontSize={25} fontWeight='600'>
          Sign Up
        </Typography>
        <form noValidate autoComplete='off'>
          <Grid my={2} display='flex' container flexDirection='column'>
            <Grid item px={3} xs={12}>
              <TextField
                margin='normal'
                variant='outlined'
                label='name'
                name='userName'
                error={false}
                helperText=''
                required
                fullWidth
                onChange={(item) => onChange(item)}
              ></TextField>
            </Grid>
            <Grid item px={3} xs={12}>
              <TextField
                margin='normal'
                variant='outlined'
                label='email'
                name='userEmail'
                error={false}
                required
                fullWidth
                helperText=''
                onChange={(item) => onChange(item)}
              ></TextField>
            </Grid>
            <Grid item px={3} xs={12}>
              <TextField
                margin='normal'
                variant='outlined'
                name='userPassword'
                label='password'
                error={false}
                required
                fullWidth
                helperText=''
                onChange={(item) => onChange(item)}
              ></TextField>
            </Grid>
          </Grid>
          <Grid my={5} />
          <Cbutton onClick={(item) => onSubmit(item)}>Register</Cbutton>
        </form>
        <Grid my={0.8} />
        <Grid display='flex' flexDirection='row' justifyContent='center'>
          <Typography color='#2C2E43' fontSize={16} fontWeight='600'>
            Already have an account?
          </Typography>
          <Grid mx={0.25} />
          <Link to='/'>
            <Typography color='#BB6464' fontSize={16} fontWeight='600'>
              Sign In
            </Typography>
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SignUp;
