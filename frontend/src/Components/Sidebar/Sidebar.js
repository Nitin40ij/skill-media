import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Avatar } from "@mui/material";
import { fetchSkillWise } from "../../store/asyncMethods/PostMethods";
import { useSelector,useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import RestSkills from "../SelectSkills/RestSkills";
export default function Sidebar() {
  const dispatch = useDispatch();
  const {push} = useHistory();
  const [showRest,setShowRest] = useState(false);
  const {user} = useSelector(state=>state.AuthReducer);
  const {skills} = user;
  const handleSkillClick=skill=>{
    console.log(skill);
    dispatch(fetchSkillWise(skill));
    push(`/skillPost/${skill}`)
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {
            skills.length!==0? skills.map(skill=>(
            <li className="sidebarListItem" onClick={handleSkillClick.bind(this,skill)}>
                <Avatar src="assets/Coding.jpg"
                sx={{ width: 34, height: 34, marginRight:2}}/>
                <span  className="sidebarListItemText">{skill}</span>
            </li>
            )) :
        <button className="sidebarButton">Choose Skill</button>
          }
        </ul>
        {!showRest?
        <button className="sidebarButton" onClick={()=>setShowRest(true)}>Show More</button>:
        <>
          <RestSkills handleSkillClick={handleSkillClick} />
          <button className="sidebarButton" onClick={()=>setShowRest(false)}>Show Less</button>
        </>
        }
      </div>
    </div>
  );
}