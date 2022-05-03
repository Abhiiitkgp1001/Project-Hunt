import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import GetProfile from "../api/get/get_profile";
import Profile from "./profile";
import ProfileComplete from "./profileComplete";
const ProfileSectionSelection = () => {
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.profileCompleted);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();

  const load = async () => {
    setLoading(true);
    const response = await GetProfile(token);
    console.log(response);
    if (response["error"]) {
      console.log("error");
      dispatch({ type: "CompleteProfile", profileCompleted: false });
    } else {
      setUserProfile(response);
      dispatch({ type: "CompleteProfile", profileCompleted: true });
    }
    setLoading(false);
  }

  useEffect(() => {
    async function getProfile() {
      const response = await GetProfile(token);
      console.log(response);
      if (response["error"]) {
        console.log("error");
        dispatch({ type: "CompleteProfile", profileCompleted: false });
      } else {
        setUserProfile(response);
        dispatch({ type: "CompleteProfile", profileCompleted: true });
      }
      setLoading(false);
    }
    getProfile();
  }, [dispatch, token]);

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
      ) : profile ? (
        <Profile load={load} userProfile={userProfile} />
      ) : (
        <ProfileComplete load={load} />
      )}
    </div>
  );
};
export default ProfileSectionSelection;
