import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostData } from '../../store/asyncMethods/PostMethods';
import Post from '../../Components/Post/Post';
import PostPhoto from '../../Components/Post/PostPhoto';
import PostVideo from '../../Components/Post/PostVideo';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import classes from './HomePage.module.css'
import Share from '../../Components/Share/Share'
import axios from 'axios';
import {
  REDIRECT_FALSE,
  REDIRECT_TRUE,
  REMOVE_MESSAGE,
} from "../../store/types/postTypes";
import toast, { Toaster } from "react-hot-toast";
import Loading from '../../Components/Loading/Loading';
const HomePage = () => {
  const [users, setUsers] = useState([]);
  const { redirect, message, newPost } = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  const { homePageData } = useSelector(state => state.FetchPosts);
  const [data, setData] = useState(homePageData);
  const { loading } = useSelector(state => state.PostReducer);

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
    if (newPost) {
      homePageData.unshift(newPost);
      dispatch({ type: "UNSET_NEW_POST" });
    }
  }, [message, redirect, loading, newPost]);
  useEffect(async () => {
    dispatch(getPostData());
  }, []);
  return (
    <>
      <div className={classes.home}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        <div className={classes.feed}>
          {/*<Feed />*/}
          <Share />
          {!loading ? homePageData &&
            homePageData.map(data => {
              if (data) {
                if (data.type === 'video') {
                  return <PostVideo post={data} />
                } else if (data.type === 'photo') {
                  return <PostPhoto post={data} />
                } else {
                  return <Post postD={data} />
                }
              }
            }
            ) :
            <><Loading /></>
          }
        </div>
        <div className={classes.rightbar}>
          {/* <Rightbar users={users} /> */}
        </div>
      </div>

    </>
  )
}
export default HomePage