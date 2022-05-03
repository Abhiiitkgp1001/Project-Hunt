import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import GetUserAuthentication from "../api/get/get_user_authentication";
const middleware = (token) => {
  return async function (dispatch) {
    console.log("dispatching action pre");
    const response = await GetUserAuthentication(token);
    console.log("dispatching action post");
    if (response["error"]) {
        console.log("dispatching logout");
      dispatch({ type: "Logout" });
    }
  };
};
const ProtectedRoute = (props) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(middleware(token));
  },[])
  return token ? <div>{props.PHComponent}</div> : <Navigate to='/' />;
};

export default ProtectedRoute;
