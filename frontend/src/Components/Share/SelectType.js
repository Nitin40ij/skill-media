import React from 'react';
import "./SelectType.css";
import {Link} from "react-router-dom";
const SelectType = () => {
  return <>
    <div className="content-type">
        <div className="content-type__heading">
            <h1>Choose Content-Type to Upload...</h1>
        </div>
        <div className="content-type__video">
           <Link to="/uploadVideo" style={{textDecoration:"none",color:"#fff"}} >
            <button>Video</button>
           </Link> 
        </div>
        <div className="content-type__blog">
           <Link to="/uploadBlog" style={{textDecoration:"none",color:"#fff"}} >
            <button>Blog</button>
            </Link>
        </div>
        <div className="content-type__image">
           <Link to="/uploadImage" style={{textDecoration:"none",color:"#fff"}} >
            <button>Image</button>
            </Link>
        </div>
    </div>
  </>;
};

export default SelectType;
