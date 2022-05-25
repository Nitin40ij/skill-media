import React from 'react';
import {useSelector } from "react-redux";
import {Route,Redirect} from 'react-router-dom';

const SetSkillRoute = (props) => {
   const {user:{skills}} = useSelector(state=>state.AuthReducer);
    return skills.length===0?<Route path={props.path} exact={props.exact} component={props.component} />:
    <Redirect to="/" from='/skills' /> ;
}

export default SetSkillRoute