import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { verifyPasswordOtp } from '../../store/asyncMethods/AuthMethods';
import toast,{Toaster} from "react-hot-toast";
import { useHistory } from 'react-router-dom';

const VerifyOtp = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [otp,setOtp] =useState('');
    const {otpHash,otpVerified,email,registerErrors,type,phone} = useSelector(state=>state.AuthReducer);
    const handleOtp=e=>{
        setOtp(e.target.value);
    }
    const handleSubmit=e=>{
        e.preventDefault();
        type==='email'?dispatch(verifyPasswordOtp(otp,otpHash,email,type)):dispatch(verifyPasswordOtp(otp,otpHash,phone,type))
    }
     useEffect(()=>{
        if(otpVerified){
            dispatch({type:"RESET_OTP_VERIFIED"})
            history.push("/changePassword");
        }
    },[otpVerified])
     useEffect(()=>{
        if(registerErrors.length!==0){
            console.log(registerErrors);
            registerErrors.map(error=>(
                toast.error(error.msg)
            ))
        }
    },[registerErrors]);
  return (
    <div>
        <Toaster  position='top-right' reverseOrder={false} toastOptions={{ style:{marginTop:'50px'  }}} />
        <form onSubmit={handleSubmit}>
            <input type="text" value={otp} onChange={handleOtp}  placeholder="Enter Otp" />
            <input type="submit" value="Confirm"/>
        </form>
    </div>
  )
}
export default VerifyOtp