import React, { useState } from "react";
import {
  Grid,
  Backdrop,
  TextField,
  Modal,
  Fade,
  Typography,
} from "@mui/material";
import { Select } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import Cbutton from "./CustomButton";
import AddProject from "../api/post/add_project";
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
const AddProjectModal = (props) => {
  const [skills, setSkills] = useState([]);
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const onSkillsChange = (value) => {
    console.log(value);
    setSkills(value);
  };
  const isMaxValues = skills.length === 7;
  function check(a) {
    if (a !== null && a !== "") {
      return true;
    }
    return false;
  }
  const addProject = async () => {
    console.log(title);
    console.log(description);
    console.log(role);
    console.log(skills);
    if (
      check(title) &&
      check(description) &&
      check(role) &&
      skills.length !== 0
    ) {
      const response = await AddProject(
        token,
        title,
        role,
        description,
        skills
      );
      console.log(response);
      console.log("complete");
      props.load();
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <Grid marginTop={2} marginBottom={3} container display='flex'>
        <Grid textAlign='left' item xs={12}>
          <Typography
            color='#00B4D8'
            fontSize={24}
            lineHeight={1.14}
            fontWeight='600'
          >
            Add Project
          </Typography>
        </Grid>
        <Grid marginTop={1} item xs={12}>
          <Grid container display='flex' spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin='dense'
                fullWidth
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                variant='outlined'
                label='title'
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
                  setRole(e.target.value);
                }}
                variant='outlined'
                label='role'
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
                  setDescription(e.target.value);
                }}
                variant='outlined'
                label='description'
                error={false}
                helperText=''
              ></TextField>
            </Grid>
            <Grid marginTop={1} item xs={12}>
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
            <Grid my={1.5} textAlign='right' item xs={12}>
              <Cbutton onClick={addProject}>Add</Cbutton>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity='error'
            sx={{ width: "100%" }}
          >
            Enter the required fields
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
};
export default AddProjectModal;
