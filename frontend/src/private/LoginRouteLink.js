import React from 'react'
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom";
const LoginRouteLink = (props) => {
    const { user, token } = useSelector(state => state.AuthReducer)
    return user ? <Redirect to="/home" /> : <Route path={props.path} exact={props.exact} component={props.component} />
}

export default LoginRouteLink