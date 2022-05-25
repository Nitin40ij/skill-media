import React, { useEffect, useState } from 'react';
import classes from './Rightbar.module.css';
import "./rightbar.css";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
function Rightbar({ users }) {
  const history = useHistory();
  const handleClick = async (user) => {
    const response = await axios.post(`/specificUser/${user.username}`);
    if (response) {
      history.push({
        pathname: '/specificUser',
        state: response.data.user
      })
    }
  }
  return (
    <div className='rightbar' style={{ color: "#fff" }} >
      <h1>Users having similar skill set</h1>
      {
        users.map(user => (
          
         user? <div className='infoBox'>
            <img className='sidebar-user'
              src={
                user.profilePicture
                  ? `${user.profilePicture}`
                  : `../assets/person/1.jpeg`
              }
              alt="" />
            <h6 onClick={handleClick.bind(this, user)} >{user.username}</h6>
            <p>{user.email ? user.email : user.phone}</p>
          </div>:""
        ))
      }
    </div>
  );
}

export default Rightbar;
