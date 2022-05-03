import React, {useState, useEffect} from "react";
import { Typography, Grid,Paper, Avatar } from "@mui/material";
import DisplayBox from "../Components/displayBox";
import { styled } from "@mui/material/styles";
import { Spin } from "antd";
import {useSelector} from 'react-redux';
import { AiTwotonePhone } from "react-icons/ai";
import GetCurrentPost from "../api/get/get_current_post";
import { IoMail } from "react-icons/io5";
import { useParams } from "react-router-dom";
import getMonth from "../Components/month";
import getDate from "../Components/date";
import getYear from "../Components/year";
import getAvatarName from "../Components/avatar";
const Root = styled("div")(({ theme }) => ({
  padding: "40px 80px",
  backgroundColor: "#2C2E43",
  [theme.breakpoints.down("lg")]: {
    padding: "40px 70px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px 60px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 15px",
  },
}));
const ExpandedPost = () => {
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const { post_id } = useParams();
    useEffect(() => {
        async function getCurrentPost() {
            const response = await GetCurrentPost(token,post_id);
            setPost(response);
            setLoading(false);
            console.log(response);
        }
        getCurrentPost();
    }, [token,post_id]);

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
        <Root
          container
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "white",
            fontfamily: "Poppins",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              px: 4,
              paddingBottom: 4,
              flexDirection: "column",
              backgroundColor: "#fff",
              boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.25)",
              borderRadius: "20px",
            }}
            elevation={20}
          >
            <Grid container display='flex' flexDirection='column'>
              <Grid item>
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
              <Grid item marginTop={5} textAlign='left'>
                <Typography color='#000' fontSize={76} fontWeight='600'>
                  {post.title}
                </Typography>
              </Grid>
              <Grid item marginTop={2.5}>
                <Grid
                  container
                  display='flex'
                  flexGrow={1}
                  flexDirection='row'
                  spacing={4}
                >
                  <Grid item textAlign='left' xs={12} sm={6}>
                    <Grid>
                      <Grid item fontSize={16}>
                        {post.description}
                      </Grid>
                      <Grid item textAlign='right' marginTop={1} fontSize={16}>
                        - {getDate(post.date)} {getMonth(post.date)} {getYear(post.date)}
                      </Grid>
                      <Grid item marginTop={5}>
                        <Grid container display='flex' spacing={2}>
                          <Grid item>
                            <Avatar
                              sx={{
                                backgroundColor: "#233a54",
                                width: 52,
                                height: 52,
                              }}
                            >
                              <Typography
                                color='white'
                                fontSize={20}
                                fontWeight='600'
                                fontFamily='Poppins'
                              >
                                {getAvatarName(post.user.name)}
                              </Typography>
                            </Avatar>
                          </Grid>
                          <Grid item>
                            <Typography
                              color='#000'
                              fontSize={16}
                              fontFamily='Poppins'
                              fontWeight='600'
                            >
                              Posted By :
                            </Typography>
                            <Typography
                              color='#000'
                              fontSize={20}
                              fontFamily='Poppins'
                            >
                              {post.user.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item my={3.5}>
                        <Grid container display='flex' spacing={1}>
                          <Grid item>
                            <Typography
                              color='#000'
                              fontSize={17}
                              fontFamily='Poppins'
                              fontWeight='600'
                            >
                              Contact : +91 {post.mobileNo}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <AiTwotonePhone size={22} />
                          </Grid>
                          <Grid item>
                            <Typography
                              color='#000'
                              fontSize={16}
                              fontFamily='Poppins'
                              fontWeight='600'
                            >
                              {post.user.email}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IoMail size={22} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item textAlign='left' xs={12} sm={6}>
                <Grid>
                  <Grid item>
                    <Grid>
                      <Grid item>
                        <Typography color='#000' fontSize={24} fontWeight='600'>
                          Requirements
                        </Typography>
                      </Grid>
                      <Grid item marginTop={1.5}>
                        <Grid container display='flex'>
                          {post.needed.map((item) => {
                            if (post.needed.indexOf(item) === 0)
                              return (
                                <DisplayBox
                                  title={item}
                                  background={{ backgroundColor: "#233a54" }}
                                  color='#fff'
                                />
                              );
                            else
                              return (
                                <DisplayBox
                                  title={item}
                                  color='#000'
                                  background={{ backgroundColor: "#f7f7f7" }}
                                />
                              );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item marginTop={2}>
                    <Grid>
                      <Grid item>
                        <Typography color='#000' fontSize={24} fontWeight='600'>
                          Technology to be used
                        </Typography>
                      </Grid>
                      <Grid item marginTop={1.5}>
                        <Grid container display='flex'>
                          {post.technologyToUse.map((item) => {
                            if (post.technologyToUse.indexOf(item) === 0)
                              return (
                                <DisplayBox
                                key={item}
                                  title={item}
                                  background={{ backgroundColor: "#233a54" }}
                                  color='#fff'
                                />
                              );
                            else
                              return (
                                <DisplayBox
                                  key={item}
                                  title={item}
                                  color='#000'
                                  background={{ backgroundColor: "#f7f7f7" }}
                                />
                              );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Root>
      )}
    </div>
  );
};

export default ExpandedPost;
