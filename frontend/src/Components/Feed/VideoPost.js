import React, { useEffect } from 'react';
import { FetchPosts } from "../../store/asyncMethods/PostMethods";
import { useDispatch, useSelector } from "react-redux"
import PostVideo from '../Post/PostVideo';
import Share from '../Share/Share';
import classes from "./PhotoPosts.module.css"
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import InfoBar from '../InfoBar/InfoBar';
import { REDIRECT_FALSE, REDIRECT_TRUE, REMOVE_MESSAGE } from '../../store/types/postTypes';

const VideoPost = () => {
  const { redirect, message, loading } = useSelector(state => state.PostReducer);
  const { user } = useSelector(state => state.AuthReducer);
  const { posts: { data } } = useSelector(state => state.FetchPosts);
  const _id = user._id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE })
    }

    dispatch(FetchPosts(_id));
  }, [])
  return (
    <>
      <div className={classes.photoPosts} style={{ background: "rgba(18,18,18)" }}>
        <div className={classes.left}>
          <Sidebar />
        </div>
        <div className={classes.center}>
          <Share />

          {!loading
            ? data
              ? data.map((post) => {
                if (post.type === "video") {
                  return <PostVideo post={post} />;
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
  )
};

export default VideoPost;
