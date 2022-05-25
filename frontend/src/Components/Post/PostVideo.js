import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { MoreVert } from "@material-ui/icons";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast, { Toaster } from 'react-hot-toast';
import { fetchPost,FetchPosts } from '../../store/asyncMethods/PostMethods';
import Appriciate from '../Appriciate/Appriciate';
import moment from 'moment';
import axios from 'axios';
import { REDIRECT_FALSE,
	REMOVE_MESSAGE,
	SET_LOADER,
	CLOSE_LOADER,
	SET_MESSAGE, } from "../../store/types/postTypes";
import PostComment from '../Comments/PostComment';  
import { useHistory } from 'react-router-dom';
const PostVideo = ({post}) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  // const path="/images/"+post.video;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    user,
    token,
  } = useSelector((state) => state.AuthReducer);
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const editClick = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    const checkPost = JSON.parse(localStorage.getItem("currPost"));
    if (!checkPost) {
      localStorage.setItem("currPost", JSON.stringify(post));
      push(`/editVidoePost/${post._id}`);
    } else {
      push(`/editVideoPost/${post._id}`);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const reportClick=e=>{
    e.preventDefault();
    push("/reportPost",post._id);
  }
  const deleteClick = async (e) => {
    const confirm = window.confirm("Do you really want to delete this post?");
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const {
          data: { msg },
        } = await axios.delete(`/delete/${post._id}`, config);
        dispatch({ type: SET_MESSAGE, payload: msg });
        window.location.reload();
      } catch (error) {
        console.log(error.meaasage);
        dispatch({ type: CLOSE_LOADER });
      }
    }
  };
  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message, redirect]);
  const debateClick = (e) => {
    e.preventDefault();
    push("/postComments", post);
  };
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={ post.profilePicture==="null"? "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png": post.profilePicture?`${post.profilePicture}`:`https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png`}

                alt=""
              />
              <span className="postUsername">{post.userName}</span>
              <span className="postDate">
                {moment(post.updatedAt).fromNow()}
              </span>
            </div>
            <div className="postTopCenter">
              <span className="postCategory"><h3>{post.category}</h3></span>
            </div>
            <div className="postTopRight">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon
                  sx={{
                    color: "white",
                  }}
                />
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

                }
                  {
            post.userId===user._id?<div>
              <MenuItem onClick={editClick}>Edit</MenuItem>
          <MenuItem onClick={deleteClick}>Delete</MenuItem>
            </div>: <MenuItem onClick={reportClick}>Report</MenuItem>
          }
              </Menu>
            </div>
          </div>
          <div className="postCenter">
            <div className="postTitle">
              <h3>{post.videoCaption}</h3>
            </div>
            <span className="postText">
              <video
                src={post.video}
                controlsList="nodownload"
                controls
                style={{ width: "100%" }}
              />
            </span>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <Appriciate post={post} />
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">
                Debates {post.comments.length}
              </span>
              <PostComment post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostVideo;
