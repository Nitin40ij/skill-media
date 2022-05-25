import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import classes from "./Feed.module.css"
import toast, { Toaster } from "react-hot-toast";
import Share from '../Share/Share';
import axios from 'axios';
// import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { REDIRECT_FALSE, REDIRECT_TRUE, REMOVE_MESSAGE } from '../../store/types/postTypes';
import { useSelector, useDispatch } from "react-redux"
import { FetchPosts } from "../../store/asyncMethods/PostMethods";
import PostVideo from '../Post/PostVideo';
import PostPhoto from '../Post/PostPhoto';
import { CLOSE_LOADER } from '../../store/types/AuthTypes';
function Feed() {
      let response;
      const { message, loading } = useSelector(state => state.PostReducer);
      const { user, token } = useSelector(state => state.AuthReducer);
      const [postState, setPostState] = useState([]);
      const dispatch = useDispatch();
      const { posts: { data } } = useSelector(state => state.FetchPosts);
      useEffect(async () => {
            dispatch(FetchPosts(user._id));
      }, []);
      return (
            <div className={classes.feed}>
                  {/* Adding React-Helmet for meta description on every Page See the title of each page */}
                  {/* <Helmet>
                        <title>Content Page</title>
                        <meta name="description" content='View Content of skill set' />
                  </Helmet> */}
                  <Toaster position='top-center' reverseOrder={false} />
                  <div className={classes.feedWrapper}>
                        <Share />
                        {/* {loading?"Loading":"Not Loading"} */}
                        {!loading ? data ? data.map(post => {
                              if (post) {
                                    if (post.type === 'video') {
                                          return <PostVideo post={post} />
                                    } else if (post.type === 'photo') {
                                          return <PostPhoto post={post} />
                                    } else {
                                          return <Post postD={post} />
                                    }
                              }
                        }) : "You dont have any post" : "Loading...."}
                  </div>
            </div>
      );
}

export default Feed;
