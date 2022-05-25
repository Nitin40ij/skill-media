import React, { useEffect, useState } from 'react'
import { Avatar } from "@mui/material";
import { likePost, unLikePost } from '../../store/asyncMethods/PostMethods';
import { useDispatch, useSelector } from 'react-redux';
import "./appriciate.css"
const Appriciate = ({ post }) => {
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if ( post.likes && post.likes.includes(user._id)) {
      setLiked(true);
    }
  }, []);
  const handleLike = e => {
    e.preventDefault();
    if (liked) {
      setLiked(false);
      dispatch(unLikePost(post._id));
    } else {
      setLiked(true);
      dispatch(likePost(post._id));
    }
  }
  return (
    <>
      <Avatar onClick={handleLike} className={liked ? "unLike" : "Like"} src="assets/Clapping.png" sx={{ width: '24px', height: '24px', marginRight: '5px' }} />
      {/* <button onClick={handleLike}>{liked?"unLike":"Like"}</button> */}
      <span className="postLikeCounter">  appreciated by {post.likes ? post.likes.length : "0"} others </span>
    </>
  )
}

export default Appriciate