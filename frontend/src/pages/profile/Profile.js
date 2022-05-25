import React from "react";
import classes from "./Profile.module.css"
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";


function Profile() {
  return (
    <>
      <div className={classes.profile}>
        <div className={classes.leftContent}>
          <Sidebar /></div>
        <div className={classes.centerContent}>
          <div className={classes.centerTop}>
            <ProfileDetails />
          </div>
        </div>
        <div className={classes.rightContent}>hello left</div>
      </div>
    </>
  );
}

export default Profile;
