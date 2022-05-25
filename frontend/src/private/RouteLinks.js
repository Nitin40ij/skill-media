import React from 'react';
import {Route,Redirect} from "react-router-dom"
import { useSelector } from 'react-redux';
const RouteLinks = (props) => {
    const {user} = useSelector(state=>state.AuthReducer)
  return  user? <Redirect to="/skills"  /> :<Route path={props.path} exact={props.exact} component={props.component} />

};

export default RouteLinks;
