import React, { useState,useEffect } from 'react'
import { getOtp,ForgetPassword } from '../../store/asyncMethods/AuthMethods';
import { useDispatch,useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
const ForgotPassword = () => {
    const history = useHistory();
    const dispatch=useDispatch();
    const [loginCredential,setLoginCredential] = useState("");
    const [type,setType]=useState("");
    const {otpRecieved} = useSelector(state=>state.AuthReducer);
    const handleChange=e=>{
        setLoginCredential(e.target.value);
    }
    const handleForget = (e) => {
        e.preventDefault();
        if(type==='email'){
            dispatch(ForgetPassword("email",loginCredential));
            dispatch({type:"SET_EMAIL",payload:loginCredential});
        }else{
            dispatch(ForgetPassword("phone",loginCredential));
            dispatch({type:"SET_PHONE",payload:loginCredential});
        }
    };
    const handleRadio=e=>{
        setType(e.target.value)
    }
      useEffect(()=>{
        if(otpRecieved){
            dispatch({type:"UNSET_OTP"})
            history.push("/verifyOtp");
        }
    },[otpRecieved]);
  return (
    <div>
        <form onSubmit={handleForget}>
            <div className="group__form">
                <label htmlFor="">Login Credential</label>
            <input required type="text" name='email' placeholder='Email or Phone'  value={loginCredential} onChange={handleChange} />

            </div>
            <label htmlFor="type">Type</label>
            <label htmlFor="email">
            <input type="radio" onChange={handleRadio} name='type' id='email' value="email"  />
                Email
            </label>
            <label htmlFor="phone">
            <input type="radio" onChange={handleRadio} id='phone' name='type' value="phone"  />
                Phone
            </label>
           
            <input type="submit" value="Send Otp" />
        </form>
    </div>
  )
}

export default ForgotPassword;