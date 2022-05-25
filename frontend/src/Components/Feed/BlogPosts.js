import React, { useEffect } from "react";
import { FetchPosts } from "../../store/asyncMethods/PostMethods";
import { useDispatch, useSelector } from "react-redux";
import Share from "../Share/Share";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "./PhotoPosts.module.css"
import {
  REDIRECT_FALSE,
  REDIRECT_TRUE,
  REMOVE_MESSAGE,
} from "../../store/types/postTypes";
import Post from "../Post/Post";


const BlogPosts = () => {
  const dispatch = useDispatch();
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );
  const { user } = useSelector((state) => state.AuthReducer);
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
  return (
    <>
      <div className={classes.photoPosts}>
        <div className={classes.right}>
          <Sidebar />
        </div>
        <div className={classes.center}>
          <Share />
          {!loading
            ? data
              ? data.map((post) => {
                if (post.type === "blog") {
                  return <Post postD={post} />;
                }
              })
              : "You dont have any blog Posts"
            : "Loading......"}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
