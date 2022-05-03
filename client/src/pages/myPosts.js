import React, { useState, useEffect } from "react";
import PostNavbar from '../Components/Post_Navbar';
import AddPost from "../Components/addPost";
import { Toolbar, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import PostStructure from "../Components/postStructure";
import GetAllUserPost from "../api/get/get_all_user_post";
import { Spin } from "antd";
import getMonth from "../Components/month";
import getDate from "../Components/date";
const MyPosts = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    async function getAllPost(){
      const response = await GetAllUserPost(token);
      setPost(response);
      setLoading(false);
      console.log(response);
    }
    getAllPost();
  }, [token]);

  const load = async () => {
    setLoading(true);
    handleClose();
    const response = await GetAllUserPost(token);
    console.log(response);
    setPost(response);
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "white",
          }}
        >
          <Spin size='large' />
        </div>
      ) : (
        <div
          style={{
            padding: "30px",
            height: "100vh",
            width: "100%",
            backgroundColor: "white",
            fontfamily: "Poppins",
          }}
        >
          <PostNavbar
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
          />
          <Toolbar />
          {open && <AddPost load={load} />}
          <Grid container display='flex'>
            {
            post.map((item)=>{
              return (
                <Grid my={4} item xs={12}>
                  <PostStructure
                    day={getDate(item.date)}
                    month={getMonth(item.date)}
                    title={item.title}
                    description={item.description}
                    needed={item.needed}
                    technology={item.technologyToUse}
                  />
                </Grid>
              );
            })
            
            }
            
          </Grid>
        </div>
      )}
    </div>
  );
};
export default MyPosts;
