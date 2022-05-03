import React,{useState} from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Select } from "antd";
import "antd/dist/antd.css";
import Cbutton from "../Components/CustomButton";
import SaveProfile from "../api/post/save_profile";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const { Option } = Select;
const techStack = [
  "C",
  "C++",
  "HTML",
  "CSS",
  "React",
  "React Native",
  "Android Studio",
  "Flutter",
  "Vue.js",
  "JavaScript",
  "PHP",
  "Python",
  "Django",
  "Ruby on Rails",
  "Laravel",
  "Antd",
  "MUI",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Apache",
  "ASP.NET",
  "Angular",
  "Microsoft Azure",
  "Express.js",
  "Node.js",
  "Java",
  "Kotlin",
  "Swift",
  "Flask",
  "Nginx",
];
techStack.sort();
const children = [];
for (let i = 0; i < techStack.length; i++) {
  children.push(
    <Option key={techStack[i]} name={techStack[i]}>
      {techStack[i]}
    </Option>
  );
}

const Root = styled("div")(({ theme }) => ({
  padding: "80px 250px",
  backgroundColor: "#2C2E43",
  [theme.breakpoints.down("lg")]: {
    padding: "80px 100px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "80px 60px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "60px 10px",
  },
}));
const ProfileComplete = (props) => {
  const [skills, setSkills] = useState([]);
  const token = useSelector((state) => state.token);
  const [bio, setBio] =  useState(null);
  const [course, setCourse] = useState(null);
  const [branch, setBranch] = useState(null);
  const [year, setYear] = useState(null);
  const [college, setCollege] = useState(null);
  const [gender, setGender] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [github, setGithub] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
  const [open, setOpen] = useState(false);



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSkillsChange = (value) => {
    console.log(value);
    setSkills(value);
  };
  const isMaxValues = skills.length === 7;
  function check(a){
    if(a!==null && a!==""){
      return true;
    }
    return false;
  }
  const saveProfile = async () => {
    console.log(mobileNo);console.log(college);console.log(gender);
    if (
      check(bio) &&
      check(course) &&
      check(year) &&
      skills.length !== 0 &&
      check(branch) &&
      check(branch) &&
      check(mobileNo) &&
      check(gender)
    ) {
      const response = await SaveProfile(
        token,
        bio,
        gender,
        mobileNo,
        college,
        course,
        branch,
        year,
        skills,
        facebook,
        instagram,
        linkedIn,
        github
      );
      console.log(response);
      console.log("complete");
      props.load();
    } else {
      setOpen(true);
    }
  };



  return (
    <Root container>
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
        <Grid container>
          <Grid marginBottom={3} item xs={12}>
            <Typography color='#2C2E43' fontSize={25} fontWeight='600'>
              Complete Profile
            </Typography>
          </Grid>

          <Grid marginBottom={1} container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                fullWidth
                required
                type='number'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>+91</InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
                variant='outlined'
                label='mobile no'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin='dense'
                fullWidth
                required
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                variant='outlined'
                label='your bio'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item marginTop={1} xs={12}>
              <Select
                size='large'
                placeholder='gender *'
                onChange={(value) => {
                  setGender(value);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "300",
                }}
              >
                <Option key='Male'>Male</Option>
                <Option key='Female'>Female</Option>
                <Option key='Other'>Other</Option>
              </Select>
            </Grid>
          </Grid>
          <Grid textAlign='left' item xs={12}>
            <Typography color='#2C2E43' fontSize={20} fontWeight='600'>
              Education
            </Typography>
          </Grid>
          <Grid marginBottom={1} container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                required
                onChange={(e) => {
                  setCollege(e.target.value);
                }}
                variant='outlined'
                label='college'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                required
                onChange={(e) => {
                  setCourse(e.target.value);
                }}
                variant='outlined'
                label='course'
                error={false}
                helperText=''
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                required
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                variant='outlined'
                label='branch'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                required
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                variant='outlined'
                label='current studying year, eg: 1,2,3'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
          </Grid>
          <Grid textAlign='left' item xs={12}>
            <Typography color='#2C2E43' fontSize={20} fontWeight='600'>
              Technical Skills
            </Typography>
          </Grid>

          <Grid marginBottom={1} container spacing={1}>
            <Grid item xs={12}>
              <Select
                mode='multiple'
                size='large'
                showSearch={true}
                optionFilterProp='name'
                placeholder='skills * (max 7)'
                onChange={onSkillsChange}
                {...(isMaxValues && {
                  open: false,
                })}
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "300",
                }}
              >
                {children}
              </Select>
            </Grid>
          </Grid>
          <Grid textAlign='left' item xs={12}>
            <Typography color='#2C2E43' fontSize={20} fontWeight='600'>
              Social
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                variant='outlined'
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
                label='facebook'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                variant='outlined'
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
                label='instagram'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                variant='outlined'
                onChange={(e) => {
                  setLinkedIn(e.target.value);
                }}
                label='linkedIn'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                variant='outlined'
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                label='Github'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
          </Grid>
          <Grid justifyContent='center' marginTop={2.5} container spacing={1}>
            <Cbutton onClick={saveProfile}>Save</Cbutton>
          </Grid>
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='error'
              sx={{ width: "100%" }}
            >
              Enter the required fields
            </Alert>
          </Snackbar>
        </Grid>
      </Paper>
    </Root>
  );
};

export default ProfileComplete;
