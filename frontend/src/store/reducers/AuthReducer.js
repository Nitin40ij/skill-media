import jwt_decode from 'jwt-decode';
import { SET_EMAIL, SET_LOADER, SET_TOKEN, LOGIN_ERRORS, SET_MESSAGE, UNSET_MESSAGE, LOGOUT, CLOSE_LOADER, REGISTER_ERRORS, CLOSE_LOGIN_ERRORS, SET_SKILLS, UNSET_SKILLS, SET_USER } from "../types/AuthTypes"
// Initial State for auth reducers
const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    email: '',
    token: '',
    user: '',
    skills: [], otpRecieved: false,
    otpHash: '',
    otpVerified: false,
    phone: '',
    type: "",
    message: "",
    likeCount: 0,
    passwordChanged: false,
    searchUser: "",
    search: false
}
// verifying if the user is already there in system or not
const verifyToken = token => {
    const decodedToken = jwt_decode(token);
    const expiresIn = new Date(decodedToken.exp * 1000);
    // checking expiry
    if (new Date() > expiresIn) {
        localStorage.removeItem('myToken');
        return null;
    } else {
        return decodedToken;
    }
}
// getting token
const token = localStorage.getItem('myToken');
if (token) {
    const decoded = verifyToken(token);
    initState.token = token;
    const { user } = decoded;
    initState.user = user;
}
// Auth Reducer
const AuthReducer = (state = initState, action) => {
    // setting loading true for async requests
    if (action.type === SET_LOADER) {
        return { ...state, loading: true }
    } else if (action.type === "OTP_RECIEVED") {
        //    otp Recieved
        return { ...state, otpRecieved: true };
    } else if (action.type === 'SET_PHONE') {
        //    setting phone number to sent otp
        return { ...state, phone: action.payload }
    } else if (action.type === 'UNSET_PHONE') {
        //    unset otp
        return { ...state, phone: '' }
    } else if (action.type === 'SET_TYPE') {
        //    setting type for phone or email differentiation
        return { ...state, type: action.payload }
    } else if (action.type === 'UNSET_TYPE') {
        //    unsetting type email or phone
        return { ...state, type: '' }
    } else if (action.type === "UNSET_OTP") {
        //    unsetting otp(not in use now)
        return { ...state, otpRecieved: false }
    } else if (action.type === 'SET_OTPHASH') {
        //    otp hash
        return { ...state, otpHash: action.payload }
    } else if (action.type === 'OTP_VERIFIED') {
        //    checing otp verification
        return { ...state, otpVerified: true }
    } else if (action.type === 'RESET_OTP_VERIFIED') {
        //    resetting otp verification
        return { ...state, otpVerified: false, otpHash: '' }
    }
    else if (action.type === CLOSE_LOADER) {
        //   closing loader after the reponse recieved
        return { ...state, loading: false }
    } else if (action.type == REGISTER_ERRORS) {
        //    checing register errors
        return { ...state, registerErrors: action.payload }
    } else if (action.type === SET_EMAIL) {
        //    setting email
        return { ...state, email: action.payload }
    } else if (action.type === SET_TOKEN) {
        //    setting token for future use and validating
        const decoded = verifyToken(action.payload);
        const { user } = decoded;
        return { ...state, user: user, token: action.payload, loginErrors: [], registerErrors: [] };
    } else if (action.type === SET_MESSAGE) {
        // message for notification
        return { ...state, message: action.payload }
    } else if (action.type === UNSET_MESSAGE) {
        // useting message after dispalying it
        return { ...state, message: '' }
    }
    else if (action.type === LOGIN_ERRORS) {
        // login errors
        return {
            ...state, loginErrors: action.payload
        }
    }
    else if (action.type === CLOSE_LOGIN_ERRORS) {
        // Closeing login errors
        return {
            ...state, loginErrors: []
        }
    }
    else if (action.type === SET_SKILLS) {
        // setting skills 
        state.skills.push(action.payload);
        return { ...state }
    } else if (action.type === SET_USER) {
        return { ...state, token: action.token, user: action.user, skills: action.skillsArr }
    } else if (action.type === LOGOUT) {
        // clearing local storage after logout
        localStorage.clear();
        return { ...state, token: '', user: '', skills: '', email: '', loginErrors: [], registerErrors: [] }
    } else if (action.type === 'SET_LIKE_COUNT') {
        return { ...state, likeCount: action.payload }
    } else if (action.type === 'PASSWORD_CHANGED') {
        return { ...state, passwordChanged: action.payload }
    }
    else if (action.payload === 'UNSET_PASSWORD_CHANGED') {
        return { ...state, passwordChanged: false }
    }
    else if (action.payload === 'SET_SEARCH') {
        return { ...state, searchUser: action.payload }
    }
    else if (action.payload === 'UNSET_SEARCH') {
        return { ...state, searchUser: "" }
    }
    else if (action.payload === 'SET_SEARCH_LOADER') {
        return { ...state, search: true }
    }
    else if (action.payload === 'CLOSE_SEARCH_LOADER') {
        return { ...state, search: false }
    }
    else {
        return state;
    }
}

export default AuthReducer;