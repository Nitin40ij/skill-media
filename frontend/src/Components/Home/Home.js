import React, { useEffect, useState } from "react";
import Feed from "../Feed/Feed";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import toast, { Toaster } from "react-hot-toast";
import {
  REDIRECT_FALSE,
  REDIRECT_TRUE,
  REMOVE_MESSAGE,
} from "../../store/types/postTypes";
import classes from "./Home.module.css";
import Rightbar from "../Rightbar/Rightbar";
import { FetchPosts, getPostData } from "../../store/asyncMethods/PostMethods";
// import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux"
import { CLOSE_LOADER } from "../../store/types/AuthTypes";
import HomePage from "../../pages/HomePage/HomePage";
import axios from "axios";
function Home() {
  const { redirect, message } = useSelector(state => state.PostReducer);
  const { loading } = useSelector(state => state.UpdateImage);
  const { user } = useSelector(state => state.AuthReducer);
  const _id = user._id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof localStorage.getItem("currPost") !== "undefined") {
      localStorage.removeItem("currPost");
    }
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message, redirect, loading])
  return (
    <>
      <div className={classes.home}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        <div className={classes.feed}>
          <Feed />
        </div>
        <div className={classes.rightbar}>
          {/* <Rightbar /> */}
        </div>
      </div>
    </>
  );
}
export default Home;
