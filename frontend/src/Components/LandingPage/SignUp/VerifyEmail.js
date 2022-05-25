import { Box, Typography, Input, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Redirect ,Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector}  from "react-redux";
import {verifyOtp} from "../../../store/asyncMethods/AuthMethods"
import toast,{Toaster} from "react-hot-toast";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
};

export default function VerifyEmail(props) {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const {otpHash,otpVerified,email,registerErrors,type,phone} = useSelector(state=>state.AuthReducer);
    const otpOnChangeHandler = (event) => {
        setOtp(event.target.value);
    };
    const handleOtp=e=>{
        e.preventDefault();
        console.log(otpHash);
        type==='email'?dispatch(verifyOtp(otp,otpHash,email,type)):dispatch(verifyOtp(otp,otpHash,phone,type))
    }
    useEffect(()=>{
        if(otpVerified){
            dispatch({type:"RESET_OTP_VERIFIED"})
            history.push("/signup");
        }
    },[otpVerified])
      useEffect(()=>{
        if(registerErrors.length!==0){
            console.log(registerErrors);
            registerErrors.map(error=>(
                toast.error(error.msg)
            ))
        }
    },[registerErrors])
    return (
        <Box
            sx={{
                background:
                    'linear-gradient( 90deg, #424242 32.2%, rgba(255, 255, 255, 0.74) 100% )',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
            }}
        >
            <Box
                sx={style}
                component="form"
                onSubmit={handleOtp}
                textAlign="center"
            >
                <Toaster  position='top-right' reverseOrder={false} toastOptions={{ style:{marginTop:'50px'  }}} />
                <Typography component="h1" variant="h6">
                    Enter the 5-digit OTP you received in your email address
                </Typography>
                <Input
                    autoFocus={true}
                    value={otp}
                    onChange={otpOnChangeHandler}
                />
                <Typography component="h1" variant="subtitle1">
                    00:00
                </Typography>
                <Button>Resend OTP</Button>
                <Box textAlign="center">
                    {/* <Link style={{textDecoration:'none'}} to="/signup"> */}
                        <Button type="submit" variant="contained">
                            Confirm
                        </Button>
                    {/* </Link> */}
                </Box>
            </Box>
        </Box>
    );
}
