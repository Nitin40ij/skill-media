import {
    Modal,
    Box,
    Typography,
    Button,
    Divider,
    TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOtp } from '../../../store/asyncMethods/AuthMethods';
import "./signUp.css";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fffcfc',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SignUp = (props) => {
    const { otpRecieved } = useSelector(state => state.AuthReducer);
    let { registerErrors } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const [type, setType] = useState('email');
    const history = useHistory();
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const handleChange = (e) => {
        if (type === 'email') {
            setUserEmail(e.target.value);
        } else {
            setUserPhone(e.target.value);
        }
    }
    const handleSendOTP = (e) => {
        e.preventDefault();
        if (type === 'email') {
            dispatch(getOtp("email", userEmail));
            dispatch({ type: "SET_EMAIL", payload: userEmail });
        } else {
            console.log(userPhone);
            dispatch(getOtp("phone", userPhone));
            dispatch({ type: "SET_PHONE", payload: userPhone });
        }
    };
    useEffect(() => {
        if (otpRecieved) {
            dispatch({ type: "UNSET_OTP" })
            history.push("/verifyEmail");
        }
    }, [otpRecieved])

    return (
        <Modal open={props.open} onClose={props.onClose} sx={{
            background: 'linear-gradient(90deg,#424242 32.2%,rgba(255, 255, 255, 1) 100%)',
        }}>
            <Box component="form" onSubmit={handleSendOTP} textAlign="center" sx={style}>
                <div className="contianer">
                    <div>
                        <button className={`${type === 'email' ? 'active' : 'typeBtn'}`} onClick={() => setType('email')}>Email</button>
                        {/* <button className={type==='phone'?'active':'typeBtn'}  onClick={()=>setType('phone')} >Phone</button> */}
                    </div>
                </div>
                <Typography sx={{ my: 2.25 }} component="h1" variant="h4">
                    Sign Up
                </Typography>
                <Divider sx={{ my: 2.25 }} />
                <Typography sx={{ mt: 2.25 }} component="h2" variant="h6">
                    Enter your {type === 'email' ? 'Email' : "Phone Number"}
                </Typography>
                <Typography
                    sx={{ mb: 2.25 }}
                    variant="subtitle2"
                    color="grey.500"
                >
                    To which we will send you a OTP message
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        name={type === 'email' ? 'email' : "phone"}
                        value={type === 'email' ? userEmail : userPhone}
                        onChange={handleChange}
                        sx={{ mr: 1.75 }}
                        label={type === 'email' ? 'Email Required' : "Phone Number required"}
                        required
                    />
                    {/* <Link style={{textDecoration:'none'}} to="/verifyEmail"> */}
                    <Button
                        variant="contained"
                        color="info"
                        size="large"
                        type="submit"
                    >
                        Send OTP
                    </Button>
                    {/* </Link> */}

                </div>
            </Box>
        </Modal>
    );
};

export default SignUp;
