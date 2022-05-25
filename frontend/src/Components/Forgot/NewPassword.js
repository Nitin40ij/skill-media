import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewPassword } from '../../store/asyncMethods/AuthMethods';
const NewPassword = () => {
    const {otpHash,otpVerified,email,registerErrors,type,phone,passwordChanged} = useSelector(state=>state.AuthReducer);
    const dispatch = useDispatch();
    const {push} =useHistory();
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const handleSubmit=e=>{
        e.preventDefault();
        if(type==='email'){
        dispatch(createNewPassword(type,email,password));
        }else{
            dispatch(createNewPassword(type,phone,password));
        }
    }
    useEffect(()=>{
        if(passwordChanged){
            dispatch({type:"UNSET_PASSWORD_CHANGED"});
            push("/")
        }
    },[passwordChanged]);
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input required type="text" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
            <input type="submit" value="Change Password"/>
        </form>

    </div>
  )
}

export default NewPassword