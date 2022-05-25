import React,{useState,useEffect} from 'react'
import {SKILLS_NAME} from '../../skills';
import {useSelector} from "react-redux"; 
import { Avatar } from "@mui/material";
const RestSkills = ({handleSkillClick}) => {
    const {user} = useSelector(state=>state.AuthReducer);
    const [unactiveSkills,setUnactiveSkills] =useState([]);
    useEffect(()=>{
            let arr=[]
            SKILLS_NAME.forEach(skill=>{
            let c=0;
            if(!user.skills.includes(skill)){
                arr.push(skill);
            }
        });
        setUnactiveSkills(arr);
    },[])
    
  return (
      <>
    {
        unactiveSkills.map(skill=>(
            <li onClick={()=>handleSkillClick(skill)} className="sidebarListItem">
                 <Avatar src="assets/Coding.jpg"
                sx={{ width: 34, height: 34, marginRight:2}}/>
            <span  className="sidebarListItemText">{skill}</span>
            </li>
        ))
    }
      </>
  )
}

export default RestSkills;