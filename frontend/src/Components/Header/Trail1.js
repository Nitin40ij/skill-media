import React from "react";
import classes from "./Trail.module.css";
import "./Trail.css";
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

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "RESET_POSTS" });
    setAnchorEl(null);
  };
  const { push } = useHistory();
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <Avatar
          src="https://cdn4.vectorstock.com/i/1000x1000/07/48/wild-head-wolf-fierce-face-logo-design-inspiration-vector-31320748.jpg"
          alt=""
          sx={{ paddingTop: "3px" }}
        />

        <div className={classes.header__input}>
          <SearchIcon />
          <input type="text" placeholder="Search Skill-Media" />
        </div>
      </div>
      <div className={classes.header__center}>
        <div className="menu">
          <ol>
            <li className="menu-item">
              <div className={classes.header__option}>
                <Link to="/home" style={{padding:"4px"}}>
                  <HomeIcon fontSize="large" style={{ color: "white" }} />
                </Link>
              </div>
            </li>
            <li className="menu-item">
              <div className={classes.header__option}>
                <Link to="/videoPosts" style={{padding:"4px"}}>
                  <VideoCameraFrontIcon
                    className="icon"
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </Link>
              </div>
            </li>
            <li className="menu-item">
              <div className={classes.header__option}>
                <Link to="/imagePosts" style={{padding:"4px"}}>
                  <PhotoCameraIcon
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </Link>
              </div>
            </li>
            <li className="menu-item">
              <div className={classes.header__option}>
                <Link to="/blogPosts" style={{padding:"4px"}}>
                  <FeedIcon fontSize="large" style={{ color: "white" }} />
                </Link>
              </div>
            </li>
          </ol>
        </div>
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
                      ? `images/${user.profilePicture}`
                      : `/assets/person/1.jpeg`
                  }
                />
                <h4 style={{ margin: "auto", marginLeft: "10px" }}>
                  {user.firstName}
                </h4>
              </Link>
            </>
          ) : (
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
          )}
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
        </div>
      </div>
    </div>
  );
}

export default Header;
