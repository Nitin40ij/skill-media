import React, { useState, useEffect } from "react";
import classes from "./ProfileDetails.module.css";
import Button from "@mui/material/Button";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { RESET_PROFILE_ERRORS } from '../../store/types/ProfileTypes';
import { UpdateNameAction, uploadDp } from '../../store/asyncMethods/ProfileMethods';
import { useHistory } from "react-router-dom";
import { REDIRECT_FALSE } from "../../store/types/postTypes";
import { PermMedia } from "@material-ui/icons";
let ext;
function ProfileDetails() {
  const [editName, setEditName] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const { user } = useSelector(state => state.AuthReducer);
  const { loading, redirect, message } = useSelector((state) => state.PostReducer);
  const [userName, setUserName] = useState({ firstName: user.firstName, lastName: user.lastName })
  const { updateErrors } = useSelector((state) => state.updateName);
  const [imagePreview, setImagePreview] = useState(user.profilePicture ? user.profilePicture : "assets/profile/1.jpeg");
  const { push } = useHistory();
  console.log(user.profilePicture);
  const [state, setState] = useState({
    image: '',
  });
  const dispatch = useDispatch();
  const handleEditName = () => {
    setEditName(true)
  }
  const handleEditNameChange = (e) => {
    setUserName({ ...userName, [e.target.name]: e.target.value })
  }
  const handleEditNameClick = e => {
    e.preventDefault();
    dispatch(UpdateNameAction({ firstName: userName.firstName, lastName: userName.lastName, id: user._id }));
  }
  useEffect(() => {
    if (updateErrors.length !== 0) {
      updateErrors.map((error) => toast.error(error.msg));
      dispatch({ type: RESET_PROFILE_ERRORS });
    }
  }, [updateErrors]);
  useEffect(() => {
    if (message.length !== 0) {
      toast.success(message);
      dispatch({ type: 'REMOVE_MESSAGE' });
    }
  }, [message]);
  useEffect(() => {
    if (redirect) {
      push('/profile');
      setEditName(false);
      setEditPicture(false);
      dispatch({ type: REDIRECT_FALSE });
    }
  }, [redirect]);
  const changePSkills = e => {
    e.preventDefault();
    push("/editPSkills");
  }
  const changeUSkills = e => {
    e.preventDefault();
    push("/editUSkills");
  }
  const handleEditPicture = () => {
    setEditPicture(true);
  }
  const fileHandle = e => {
    if (e.target.files.length !== 0) {
      const x = e.target.files[0].name.split('.');
      ext = x[x.length - 1].toLowerCase();
      setCurrentImage(e.target.files[0].name);
      setState({
        ...state, [e.target.name]: e.target.files[0]
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const uploadPicture = e => {
    e.preventDefault();
    const formData = new FormData();
    const { image } = state;
    formData.append('image', image);
    formData.append('id', user._id);
    dispatch(uploadDp(formData));
  }
  return (
    <>
      <div className={classes.profileDetails}>
        <div className={classes.left}>
          <img
            src={imagePreview}
            alt=""
            className={classes.profileImg}
            style={{
              borderRadius: "400%",
              width: "70%",
              height: "60%",
              margin: "0 auto",
            }}
          />
          <Toaster
            position='top-right'
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: '14px',
              },
            }}
          />
          <div
            style={{
              width: "100%",
              margin: "0 auto",
              alignContent: "center",
              fontWeight: "normal",
              textAlign: "center",
              paddingTop: "15px",
              paddingBottom: "15px",
              fontSize: "25px"
            }}
          >
            {user.username}
          </div>
          <div className="editProfilePicture">
            <button className="btn btn-default" onClick={handleEditPicture} >{editPicture ?
              <form onSubmit={uploadPicture} >
                <label htmlFor="image">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  Upload Image
                </label>
                <input type="file" id="image" onChange={fileHandle} name='image' />
                <button type="submit" >Upload</button>
              </form> :
              <>
                Change Profile Picture
              </>
            }
            </button>
          </div>
        </div>
        <div className={classes.right} style={{ paddingRight: "15px" }}>
          <div className={classes.rightTop}>
            <h1 style={{ fontWeight: "light", fontSize: "40px" }}>
              {editName ? <>
                <label htmlFor="editName">Edit Name</label>
                <input type="text" onChange={handleEditNameChange} name="firstName" value={userName.firstName} />
                <input type="text" onChange={handleEditNameChange} name='lastName' value={userName.lastName} />
                <button onClick={handleEditNameClick} >change Name</button>
              </> : user.firstName + " " + user.lastName
              }</h1>
            <Button
              onClick={handleEditName}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#262626",
                "&:hover": {
                  backgroundColor: "#272727",
                  color: "white",
                  borderColor: "white",
                },
              }}
            >
              EDIT
            </Button>
          </div>

          <div className={classes.skillList} style={{ margin: "10px 0px 10px 35px" }}>
            <div classname={classes.headingProfessional} style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ padding: "5px 0 5px 0", fontWeight: "lighter", fontSize: "30px", fontFamily: "sans-serif", fontStyle: "oblique", background: "#BB86FC", color: "black" }}>Professional Skills</h4 >
              <Button
                onClick={changePSkills}
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  color: "#262626",
                  "&:hover": {
                    backgroundColor: "#272727",
                    color: "white",
                    borderColor: "white",
                  },
                }}
              >
                Edit
              </Button>
            </div>
            <ul type="none" style={{ display: "flex", width: "100%", padding: "0" }}>
              {
                user.professionalSkills.map(skill => (
                  <div style={{ display: "flex", backgroundColor: "#03DAC5", color: "BLACK", padding: "0 2px 0 2px", margin: "4px", borderRadius: "3px", height: "40px", textAlign: "center", justifyContent: "center", alignItems: "center" }}><li>{skill}</li></div>
                ))
              }
            </ul>
            <br />
            <div classname={classes.headingProfessional} style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ padding: "5px 0 5px 0", fontWeight: "lighter", fontSize: "30px", fontFamily: "sans-serif", fontStyle: "oblique", background: "#BB86FC", color: "black" }}>Unprofessional Skills</h4 >
              <Button
                onClick={changeUSkills}
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  color: "#262626",
                  "&:hover": {
                    backgroundColor: "#272727",
                    color: "white",
                    borderColor: "white",
                  },
                }}
              >
                Edit
              </Button>
            </div>
            <ul type="none" style={{ display: "flex", width: "100%", padding: "0" }}>
              {
                user.unprofessionalSkills.map(skill => (
                  <div style={{ display: "flex", backgroundColor: "#03DAC5", color: "BLACK", padding: "0 2px 0 2px", margin: "4px", borderRadius: "3px", height: "40px", textAlign: "center", justifyContent: "center", alignItems: "center" }}><li>{skill}</li></div>
                ))
              }
            </ul>
          </div>
          <div style={{ paddingBottom: "20px", paddingTop: "30px", fontFamily: "cursive" }}>Lorem ipsum dolor sit amet, consectetur </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
