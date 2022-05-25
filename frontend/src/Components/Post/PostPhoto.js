import React, { useState, useEffect } from 'react';
import { MoreVert } from "@material-ui/icons";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, FetchPosts } from '../../store/asyncMethods/PostMethods';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import PostComment from '../Comments/PostComment';

import {
  REDIRECT_FALSE,
  REMOVE_MESSAGE,
  SET_LOADER,
  CLOSE_LOADER,
  SET_MESSAGE,
} from "../../store/types/postTypes";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Appriciate from '../Appriciate/Appriciate';
const PostPhoto = ({ post }) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const {
    user,
    token,
  } = useSelector((state) => state.AuthReducer);
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );
  // const path=await axios.get();
  // console.log(post);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editClick = (e) => {
    e.preventDefault();
    localStorage.setItem("currPost", JSON.stringify(post));
    setAnchorEl(null);
    const checkPost = JSON.parse(localStorage.getItem("currPost"));
    if (!checkPost) {
      localStorage.setItem("currPost", JSON.stringify(post));
      push(`/editImage/${post._id}`)
    } else {

      push(`/editImage/${post._id}`)
    }
  }
  const deleteClick = async (e) => {
    e.preventDefault()
    const confirm = window.confirm('Do you really want to delete this post?');
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("Fine till now");
        const { data: { msg } } = await axios.delete(`/delete/${post._id}`, config);
        dispatch({ type: SET_MESSAGE, payload: msg });
        window.location.reload();

      } catch (error) {
        dispatch({ type: CLOSE_LOADER });
        console.log(error.message);
      }
    }
  }
  const reportClick = e => {
    e.preventDefault();
    push("/reportPost", post._id);
  }
  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message, redirect]);
  const debateClick = e => {
    e.preventDefault();
    push("/postComments", post);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            { !console.log(post.profilePicture==="null")}
          <img
                className="postProfileImg"
                src={ post.profilePicture==="null"? "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png": post.profilePicture?`${post.profilePicture}`:`https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png`}
                alt=""
              />
            <span className="postUsername">
              {post.userName}
            </span>
            <span className="postDate">{moment(post.updatedAt).fromNow()}</span>


          </div>
          <div className="postTopCenter"><span className="postCategory"><h3>
            {post.category}</h3>
          </span>
          </div>
          <div className="postTopRight">

            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon sx={{
                color: "white"
              }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {
                post.userId === user._id ? <>
                  <MenuItem onClick={editClick}>Edit</MenuItem>
                  <MenuItem onClick={deleteClick}>Delete</MenuItem>
                </> : <MenuItem onClick={reportClick}>Report</MenuItem>
              }


            </Menu>
          </div>

        </div>
        <div className="postCenter">
          <div className="postTitle">
            <h3>{post.imageCaption}</h3>
          </div>
          <span className="postText">
            <img src={!post.product_id ? `images/${post.image}` : post.image} alt="" style={{ width: "100%", height: "300px" }} />
          </span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <Avatar src="assets/Clapping.png" sx={{width:'24px', height:'24px', marginRight:'5px'}} />
            <span className="postLikeCounter">12 people appreciated it</span> */}
            <Appriciate post={post} />
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Debates {post.comments.length}</span>
            <PostComment post={post} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default PostPhoto;
