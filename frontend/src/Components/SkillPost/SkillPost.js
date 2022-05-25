import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import classes from "./SkillPost.module.css"
import { fetchSkillWise } from '../../store/asyncMethods/PostMethods';
import Post from '../Post/Post';
import PostPhoto from '../Post/PostPhoto';
import PostVideo from '../Post/PostVideo';
import { Helmet } from 'react-helmet';
import Rightbar from "../Rightbar/Rightbar"
import Header from '../Header/Header';
import { getSkillUsers } from '../../store/asyncMethods/AuthMethods';
import axios from 'axios';
const SkillPost = () => {
  const [users, setUsers] = useState();
  const dispatch = useDispatch();
  const { skill } = useParams();
  const { skillPosts, loading, skillUsers } = useSelector(state => state.PostReducer)
  useEffect(
    async () => {
      // dispatch(getSkillUsers(skill));
      dispatch(fetchSkillWise(skill));
    }, []
  );
  console.log(skillUsers)
  return (
    <>
      <Helmet>
        <title>Content Page</title>
        <meta name="description" content='View Content of skill set' />
      </Helmet>
      <div className={classes.skillPost} >
        <div className={classes.right}>
          <Sidebar />
        </div>
        <div className={classes.center}>
          {!loading ? skillPosts ? skillPosts.map(post => {
            if (post) {
              if (post.type === 'video') {
                return <PostVideo post={post} />
              } else if (post.type === 'photo') {
                return <PostPhoto post={post} />
              } else {
                return <Post postD={post} />
              }
            }
          }) : "No Posts Found for this Category" : "Loading.........."}
        </div>
        <div className={classes.left}>
          <Rightbar users={skillUsers} />
        </div>
      </div>
    </>
  );
};

export default SkillPost;
