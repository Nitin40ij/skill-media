import "./Post.css";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { MoreVert } from "@material-ui/icons";
import { Avatar } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unLikePost } from '../../store/asyncMethods/PostMethods';
import moment from "moment";
import {
  REDIRECT_FALSE,
  REMOVE_MESSAGE,
  SET_LOADER,
  CLOSE_LOADER,
  SET_MESSAGE,
  REDIRECT_TRUE,
} from "../../store/types/postTypes";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { postComment, getComments } from "../../store/asyncMethods/PostMethods";
import Comments from "../Comments/Comments";
import PostComment from "../Comments/PostComment";
import Appriciate from "../Appriciate/Appriciate";
export default function Post({ postD }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { push } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { redirect, message, loading } = useSelector((state) => state.PostReducer);
  const { posts } = useSelector((state) => state.FetchPosts);
  const {
    user,
    token
  } = useSelector((state) => state.AuthReducer);
  const { _id } = user;
  const editClick = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    const checkPost = JSON.parse(localStorage.getItem("currPost"));
    if (!checkPost) {
      localStorage.setItem("currPost", JSON.stringify(postD));
      push(`/editPost/${postD._id}`)
    } else {
      push(`/editPost/${postD._id}`)
    }
  }
  const deleteClick = async (e) => {
    e.preventDefault();
    const confirm = window.confirm('Do you really want to delete this post?');
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data: { msg } } = await axios.delete(`/deletePost/${postD._id}`, config);
        dispatch({ type: SET_MESSAGE, payload: msg });
        window.location.reload();
      } catch (error) {
        console.log(error.message);
        dispatch({ type: CLOSE_LOADER });
      }
    }
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
    push("/postComments", postD);
  }
  const reportClick = e => {
    e.preventDefault();
    push("/reportPost", postD._id);
  }
  return (
    <>
      {
        postD &&
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  className="postProfileImg"
                src={ postD.profilePicture==="null"? "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png": postD.profilePicture?`${postD.profilePicture}`:`https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png`}

                  alt=""
                />
                <span className="postUsername">
                  {postD.userName}
                </span>
                <span className="postDate">
                  {moment(postD.updatedAt).fromNow()}
                </span>
                <span style={{marginLeft:"100px"}} className="postCategory">
                  {postD.category}
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
                    postD.userId === user._id ? <>
                      <MenuItem onClick={editClick}>Edit</MenuItem>
                      <MenuItem onClick={deleteClick}>Delete</MenuItem>
                    </> : <MenuItem onClick={reportClick}>Report</MenuItem>
                  }

                </Menu>
              </div>
            </div>
            <div className="postCenter">
              <div className="postTitle">
                <h3>{postD.title}</h3>
              </div>
              <span className="postText">
                <h6>{postD.blog}</h6>
              </span>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <Appriciate post={postD} />
                {/* <Avatar src="assets/Clapping.png" sx={{width:'24px', height:'24px', marginRight:'5px'}} />
            <button onClick={handleLike} >{liked?"unLike":"Like"}</button>
            <span className="postLikeCounter">  appreciated by {postD.likes.length} others </span> */}
              </div>
              <div className="postBottomRight">
                {
                  postD.comments ?
                    <>
                      <span className="postCommentText">Debates {postD.comments.length}</span>
                      <PostComment post={postD} />
                    </>
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}