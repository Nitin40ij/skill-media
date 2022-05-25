import React, { useEffect } from "react";
import { FetchPosts } from "../../store/asyncMethods/PostMethods";
import { useDispatch, useSelector } from "react-redux";
import PostPhoto from "../Post/PostPhoto";
import Share from "../Share/Share";
import classes from "./PhotoPosts.module.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";
import InfoBar from "../InfoBar/InfoBar";
import {
  REDIRECT_FALSE,
  REDIRECT_TRUE,
  REMOVE_MESSAGE,
} from "../../store/types/postTypes";

const PhotoPosts = () => {
  const { redirect, message, loading, newPost } = useSelector(
    (state) => state.PostReducer
  );
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const {
    posts: { data },
  } = useSelector((state) => state.FetchPosts);
  const _id = user._id;
  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }

    dispatch(FetchPosts(_id));
  }, []);
  useEffect(() => {
    if (newPost) {
      if (data) {
        data.unshift(newPost);
      }
      dispatch({ type: "UNSET_NEW_POST" });
    }
  }, [newPost])
  return (
    <>
      <div className={classes.photoPosts}>
        <div className={classes.left}>
          <Sidebar />
        </div>
        <div className={classes.center}>
          <Share />

          {!loading
            ? data
              ? data.map((post) => {
                if (post.type === "photo") {
                  return <PostPhoto post={post} />;
                }
              })
              : "You dont have any Photo Posts"
            : "Loading......"}
        </div>
        <div className={classes.right}>
          <InfoBar />
        </div>
      </div>
    </>
  );
};

export default PhotoPosts;
