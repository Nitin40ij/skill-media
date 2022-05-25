import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { FetchPosts } from '../../store/asyncMethods/PostMethods';
import Post from '../Post/Post';
import "./specificUser.css"
import PostPhoto from '../Post/PostPhoto';
import PostVideo from '../Post/PostVideo';
const SpecificUser = (props) => {
  const user=props.location.state;
  const dispatch=useDispatch();
  const [userPosts,setUserPosts]=useState([]);
  const {posts} = useSelector(state=>state.FetchPosts);
  useEffect(()=>{
    dispatch(FetchPosts(user._id));
  },[])
  useEffect(()=>{
      if(posts){
          console.log(posts.data);
          setUserPosts(posts.data);
        console.log(userPosts);
        }
  },[posts])
    return (
        <div className='info'>
        <div className='userInfo'>
            <div className="left_userInfo">
                    <div className="user_picture">
                        <img src={user.profilePicture} alt="Profile Picture" />
                    </div>
                    <div className='user_username'>
                           <h6>{user.username}</h6>
                    </div>
            </div>
            <div className="right_userInfo">
                <div className="user_name">
                    <h5>{user.firstName+" "+user.lastName}</h5>
                </div>
                <div className="professional_skills">
                    <h1>Professional Skills</h1>
                    {
                        user.professionalSkills.map(skill=>(
                            <h6>{skill}</h6>
                        ))
                    }
                </div>
                <div className="unprofessional_skills">
                     <h1>UnProfessional Skills</h1>
                    {
                        user.unprofessionalSkills.map(skill=>(
                            <h6>{skill}</h6>
                        ))
                    }
                </div>
            </div>
            </div>
            <div className="user_posts">
                {
                   posts.data ?posts.data.map(data=>{
                            if(data){
                if(data.type==='video'){
                    return <PostVideo post={data}/>
                }else if(data.type==='photo'){
                    return <PostPhoto post={data} />
                }else{
                    return <Post postD={data} />
                }
            }
                   }):<>
                    <h6>No Posts Found</h6>
                    </>
                }
            </div>
            </div>
  )
}

export default SpecificUser;