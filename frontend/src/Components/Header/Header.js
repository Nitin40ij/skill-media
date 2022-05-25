import React, { useState } from "react";
import classes from "./Header.module.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import FeedIcon from "@mui/icons-material/Feed";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { color } from "@mui/system";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { searchUser } from "../../store/asyncMethods/AuthMethods";
import "./header.css"
function Header(props) {
  const dispatch = useDispatch();
  const { search } = useSelector(state => state.AuthReducer);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useSelector((state) => state.AuthReducer);
  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "RESET_POSTS" });
    setAnchorEl(null);
  };
  const { push } = useHistory();
  const searchSubmit = e => {
    e.preventDefault();
    if (text != "") {
      dispatch(searchUser(text));
    }
  }
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <Avatar
          src="https://cdn4.vectorstock.com/i/1000x1000/07/48/wild-head-wolf-fierce-face-logo-design-inspiration-vector-31320748.jpg"
          alt="Logo"
          sx={{ paddingTop: "3px" }}
        />
      </div>
      <div className={classes.header__center}>
        {user ?
          <>
            <Link to="/home">
              <div className={classes.header__option}>
                <HomeIcon fontSize="large" style={{ color: "white" }} />
              </div>
            </Link>
            <Link to="/videoPosts">
              <div className={classes.header__option}>
                <VideoCameraFrontIcon fontSize="large" style={{ color: "white" }} />
              </div>
            </Link>
            <Link to="/imagePosts">
              <div className={classes.header__option}>
                <PhotoCameraIcon fontSize="large" style={{ color: "white" }} />
              </div>
            </Link>
            <Link to="/blogPosts">
              <div className={classes.header__option}>
                <FeedIcon fontSize="large" style={{ color: "white" }} />
              </div>
            </Link>
          </> : ""
        }
      </div>
      <div className={classes.header__right}>
        <div className={classes.header__info}>
          {user ? (
            <>
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "flex",
                }}
              >
                <Avatar
                  src={
                    user.profilePicture
                      ? `${user.profilePicture}`
                      : `/assets/person/1.jpeg`
                  }
                />
                <h4 style={{ margin: "auto", marginLeft: "10px" }}>
                  {user.firstName}
                </h4>
              </Link>
            </>
          ) : (
            <>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  padding: "0 15px",
                }}
                to="/"
              >
                <h4>Login</h4>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  padding: "0 15px",
                }}
                to="/"
              >
                <h4>Register</h4>
              </Link>

            </>

          )}

          {user ?
            <>
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
                <MenuItem onClick={logout}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                <MenuItem onClick={handleClose}>About Us</MenuItem>
              </Menu>
            </>
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Header;
