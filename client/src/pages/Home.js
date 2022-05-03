import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Profile from "./profile";
import ProfileSectionSelection from "./profile_section_selection";
import Myposts from "./myPosts";
import Feed from "./feed";
import Loading from "./profile_section_selection";
import { Paper, Grid, Typography, CssBaseline } from "@mui/material";
import { MdFeed } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiApostrophe } from "react-icons/si";
import ProtectedRoute from "../Components/protectedRoutes";
const menuItem = ["feed", "posts", "profile"];
const menuIcons = [
  <MdFeed color='#D8E3E7' size={32} />,
  <SiApostrophe color='#D8E3E7' size={32} />,
  <FaUser color='#D8E3E7' size={32} />,
];
export default function Home() {
  var page = [
    <ProtectedRoute PHComponent={<Feed />} />,
    <ProtectedRoute PHComponent={<Myposts />} />,
    <ProtectedRoute PHComponent={<ProfileSectionSelection />} />,
  ];
  const [index, setIndex] = React.useState(0);
  const [value, setValue] = React.useState("feed");

  const handleChange = (event, newValue) => {
    if (newValue === "feed") setIndex(0);
    else if (newValue === "posts") setIndex(1);
    else setIndex(2);
    setValue(newValue);
  };

  return (
    <div style={{ fontfamily: "Poppins" }}>
      <CssBaseline />
      {page.at(index)}
      <Grid container justifyContent='center'>
        <Paper
          sx={{
            margin: "10px",
            position: "fixed",
            width: 345,
            height: 60,
            bottom: 0,
            display: "flex",
            backgroundColor: "#2C2E43",
            justifyContent: "center",
            boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
          }}
          elevation={10}
        >
          <BottomNavigation
            sx={{ backgroundColor: "#2C2E43" }}
            value={value}
            onChange={handleChange}
          >
            {menuItem.map((item) => {
              return (
                <BottomNavigationAction
                  sx={{ width: 90, height: 58, fontSize: "20px" }}
                  label={
                    <Typography
                      color='#D8E3E7'
                      fontSize={index === menuItem.indexOf(item) ? 13 : 2}
                      fontWeight='600'
                    >
                      {item}
                    </Typography>
                  }
                  value={item}
                  icon={menuIcons.at(menuItem.indexOf(item))}
                  size={35}
                  color={"#D8E3E7"}
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      </Grid>
    </div>
  );
}
