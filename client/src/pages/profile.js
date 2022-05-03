import React, {useState} from "react";
import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import getAvatarName from "../Components/avatar";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineMinusCircle } from "react-icons/ai";
import AddProjectModal from "../Components/addProjectModal";
import DisplayBox from "../Components/displayBox";
const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid
      container
      p={3}
      sx={{ backgroundColor: "#2C2E43" }}
      justifyContent='center'
      display='flex'
      flexDirection='column'
      textAlign='center'
    >
      <Paper
        sx={{
          display: "flex",
          p: 4,
          flexDirection: "column",
          backgroundColor: "#fff",
          boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.25)",
          borderRadius: "20px",
        }}
        elevation={10}
      >
        <Grid container display='flex'>
          <Grid item textAlign='left' xs={9}>
            <Typography
              color='#00B4D8'
              fontSize={40}
              lineHeight={1.14}
              fontWeight='600'
            >
              {props.userProfile.user.name}
            </Typography>
          </Grid>
          <Grid
            item
            display='flex'
            justifyContent='right'
            alignItems='center'
            xs={3}
          >
            <Avatar sx={{ backgroundColor: "#000", width: 76, height: 76 }}>
              <Typography color='white' fontSize={26} fontWeight='600'>
                {getAvatarName(props.userProfile.user.name)}
              </Typography>
            </Avatar>
          </Grid>
        </Grid>
        <Grid container display='flex'>
          <Grid item xs={12} sm={6}>
            <Typography
              textAlign='left'
              color='#2C2E43'
              fontSize={20}
              fontWeight='600'
            >
              {props.userProfile.gender}
            </Typography>
          </Grid>
          {props.userProfile.social ? (
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                {props.userProfile.social.facebook ? (
                  <Grid item color='#4267B2'>
                    <FaFacebookSquare size={24} />
                  </Grid>
                ) : (
                  <div></div>
                )}
                {props.userProfile.social.instagram ? (
                  <Grid item color='##C13584'>
                    <FaInstagram size={24} />
                  </Grid>
                ) : (
                  <div></div>
                )}
                {props.userProfile.social.linkedin ? (
                  <Grid item color='#0077b5'>
                    <FaLinkedin size={24} />
                  </Grid>
                ) : (
                  <div></div>
                )}
                {props.userProfile.social.github ? (
                  <Grid item color='#171515'>
                    <BsGithub size={24} />
                  </Grid>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
        <Grid marginTop={0.5} />
        <Divider />
        <Grid container display='flex'>
          <Grid container display='flex'>
            <Grid item marginTop={1.2} textAlign='left' xs={9}>
              <Typography color='#00B4D8' fontSize={20} fontWeight='600'>
                Education
              </Typography>
            </Grid>
          </Grid>

          <Grid item textAlign='left' xs={12}>
            <Typography color='#000' fontSize={18} fontWeight='600'>
              College
            </Typography>
            <Typography>{props.userProfile.college}</Typography>
          </Grid>
          <Grid item textAlign='left' xs={8} sm={6}>
            <Typography color='#000' fontSize={18} fontWeight='600'>
              Current year
            </Typography>
            <Typography>
              {props.userProfile.year === 1
                ? "1st"
                : props.userProfile.year === 2
                ? "2nd"
                : props.userProfile.year === 3
                ? "3rd"
                : props.userProfile.year + "th"}
            </Typography>
          </Grid>
          <Grid item textAlign='left' xs={4} sm={6}>
            <Typography color='#000' fontSize={18} fontWeight='600'>
              Course
            </Typography>
            <Typography>{props.userProfile.course}</Typography>
          </Grid>
        </Grid>

        <Grid container display='flex'>
          <Grid item marginTop={1.2} textAlign='left' xs={9}>
            <Typography color='#00B4D8' fontSize={20} fontWeight='600'>
              Personal details
            </Typography>
          </Grid>
        </Grid>

        <Grid container display='flex'>
          <Grid item textAlign='left' xs={12} sm={6}>
            <Typography color='#000' fontSize={18} fontWeight='600'>
              Email
            </Typography>
            <Typography>{props.userProfile.user.email}</Typography>
          </Grid>
          <Grid item textAlign='left' xs={12} sm={6}>
            <Typography color='#000' fontSize={18} fontWeight='600'>
              Mobile no
            </Typography>
            <Typography>+91 {props.userProfile.mobileNo}</Typography>
          </Grid>
        </Grid>
        <Grid container display='flex'>
          <Grid item marginTop={1.2} textAlign='left' xs={9}>
            <Typography color='#00B4D8' fontSize={20} fontWeight='600'>
              Projects
            </Typography>
          </Grid>
          <Grid
            item
            marginTop={1.5}
            display='flex'
            justifyContent='flex-end'
            xs={3}
          >
            {open ? (
              <AiOutlineMinusCircle onClick={handleClose} size={26} />
            ) : (
              <IoAddCircleOutline onClick={handleOpen} size={26} />
            )}
          </Grid>
        </Grid>
        <Grid container display='flex'>
          {open ? (
            <Grid item xs={12}>
              <AddProjectModal load={props.load} />
            </Grid>
          ) : (
            <div></div>
          )}
          {props.userProfile.projects.map((item) => {
            return (
              <Grid item my={1} textAlign='left' xs={12}>
                <Typography color='#000' fontSize={18} fontWeight='600'>
                  {item.title} | {item.role}
                </Typography>
                <Typography>{item.description}</Typography>

                <Grid container display='flex'>
                  <DisplayBox
                    title='Technology Used'
                    background={{ backgroundColor: "#233a54" }}
                    color='#fff'
                  />
                  {item.technologiesUsed.map((tech) => {
                    return (
                      <DisplayBox
                        title={tech}
                        color='#000'
                        background={{ backgroundColor: "#f7f7f7" }}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Grid>
  );
};
export default Profile;
