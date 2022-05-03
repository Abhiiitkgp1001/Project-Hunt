import React, { useState, useEffect } from "react";
import PostStructure from "../Components/postStructure";
import { Typography, Grid, Avatar, Toolbar } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import GetAllPost from "../api/get/get_all_post";
import { Spin } from "antd";
import getMonth from "../Components/month";
import getDate from "../Components/date";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllPost() {
      const response = await GetAllPost(token);
      setPost(response);
      setLoading(false);
      console.log(response);
    }
    getAllPost();
  }, [token]);

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
          <Navbar />
          <Toolbar />
          <Grid container display='flex'>
            <Typography textAlign='left' fontFamily='Poppins' fontSize={25}>
              Latest Posts
            </Typography>
          </Grid>
          <Grid container display='flex'>
            {post.map((item) => {
              return (
                <Grid my={4} onClick={()=>{ navigate(`/post/${item._id}`); }} item xs={12}>
                  <PostStructure
                  key={item.title}
                    day={getDate(item.date)}
                    month={getMonth(item.date)}
                    title={item.title}
                    description={item.description}
                    needed={item.needed}
                    technology={item.technologyToUse}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
};
export default Feed;
