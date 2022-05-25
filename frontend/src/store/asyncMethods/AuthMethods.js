import axios from "axios";
import { dispatch } from "react-redux";
import { SET_EMAIL, SET_LOADER, LOGIN_ERRORS, LOGOUT, SET_TOKEN, CLOSE_LOADER, SET_MESSAGE, REGISTER_ERRORS, SET_USER, SET_SKILLS } from "../types/AuthTypes"
import { REDIRECT_TRUE } from "../types/postTypes";
import { getPostData } from "./PostMethods";
// Method for sending OTP to email ot phone
export const getOtp = (type, email) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            let response;
            if (type === 'email') {
                response = await axios.post("/sendOtp", { type, email }, config);
            } else {
                response = await axios.post("/sendOtp", { type, phone: email }, config);
            }
            dispatch({ type: 'OTP_RECIEVED', payload: response.data.otp });
            dispatch({ type: 'SET_TYPE', payload: type });
            dispatch({ type: 'SET_OTPHASH', payload: response.data.hash });
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
        }
    }
}
// verifying the OTP 
export const verifyOtp = (otp, otpHash, email, type) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = type === 'email' ? await axios.post("/verifyOtp", { otp, otpHash, email, type }, config) : await axios.post("/verifyOtp", { otp, otpHash, phone: email, type }, config)
            if (!data.isValid) {
                const arr = [];
                arr.push({ msg: data.msg });
                dispatch({ type: REGISTER_ERRORS, payload: arr })
            } else {
                dispatch({ type: 'OTP_VERIFIED', payload: true });
            }
            dispatch({ type: CLOSE_LOADER })

        } catch (error) {
            console.log(error);
        }
    }
}

// verifying the OTP 
export const verifyPasswordOtp = (otp, otpHash, email, type) => {
    console.log(otp, otpHash, email, type);
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = type === 'email' ? await axios.post("/verifyPasswordOtp", { otp, otpHash, email, type }, config) :
                await axios.post("/verifyPasswordOtp", { otp, otpHash, phone: email, type }, config)
            if (!data.isValid) {
                const arr = [];
                arr.push({ msg: data.msg });
                dispatch({ type: REGISTER_ERRORS, payload: arr })
            } else {
                dispatch({ type: 'OTP_VERIFIED', payload: true });
            }
            dispatch({ type: CLOSE_LOADER })

        } catch (error) {
            console.log(error);
        }
    }
}
// registering the User
export const postRegister = (firstName, lastName, gender, birthdate, confirmPassword, password, username, email, type) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            let response;
            // if (type === 'email') {
            console.log(password, confirmPassword);
            response = await axios.post("/register", { username, firstName, lastName, gender, birthdate, confirmPassword, password, email, type }, config);
            // } else {
            //     response = await axios.post("/registerPhone", { username, firstName, lastName, gender, birthdate, password, phone: email, type }, config);
            // }
            if ((Object.keys(response.data).length == 1)) {
                dispatch({ type: REGISTER_ERRORS, payload: response.data.errors })
            } else {
                localStorage.setItem("myToken", response.data.token);
                dispatch({ type: SET_USER, token: response.data.token, user: response.data.user });
                dispatch(getPostData());
            }
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }
    }
}
// user Login
export const postLogin = (email, password) => {
    console.log(email, password);
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            dispatch({ type: SET_LOADER });
            const response = await axios.post("/login", { email, password }, config);
            if ((Object.keys(response.data).length == 1)) {
                dispatch({ type: LOGIN_ERRORS, payload: response.data.errors })
            } else {
                localStorage.setItem("myToken", response.data.token);
                dispatch({ type: SET_USER, token: response.data.token, user: response.data.user })
            }
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }
    }
}
// setting up the skills
export const setSkills = (unprofessionalSkills, skills, id) => {
    let skillsArr = []
    skills.forEach(skill => {
        skillsArr.push(skill.name);
    });
    let UnPrskillsArr = []
    unprofessionalSkills.forEach(skill => {
        UnPrskillsArr.push(skill.name);
    });
    return async (dispatch, getState) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            dispatch({ type: SET_LOADER });
            const response = await axios.post("/setSkills", { id, skillsArr, UnPrskillsArr }, config);
            dispatch({ type: SET_USER, user: response.data.user, token: response.data.token });
            localStorage.setItem("myToken", response.data.token);

            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors })
            dispatch({ type: CLOSE_LOADER });
        }
    }
}
// Edit Skills  both professional and unprofessional
export const editSkills = (skills, id, type) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            dispatch({ type: SET_LOADER });
            const response = await axios.post("/editSkills", { id, skills, type }, config);
            console.log(response);
            dispatch({ type: SET_USER, user: response.data.user, token: response.data.token });
            dispatch({ type: SET_MESSAGE, payload: response.data.msg })
            localStorage.setItem("myToken", response.data.token);
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error);
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors })
            dispatch({ type: CLOSE_LOADER });
        }
    }
}
export const reportPost = (state, id) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { user },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const response = await axios.post("/reportPost", { user, state, id }, config);
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    }
}
export const getSkillUsers = (skill) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { user },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const response = await axios.get(`/skillUsers/${skill}`);
            console.log(response);
        } catch (error) {

        }
    }
}
export const ForgetPassword = (type, email) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            let response;
            if (type === 'email') {
                response = await axios.post("/sendForgetPassword", { type, email }, config);
            } else {
                response = await axios.post("/sendForgetPassword", { type, phone: email }, config);
            }
            dispatch({ type: 'OTP_RECIEVED', payload: response.data.otp });
            dispatch({ type: 'SET_TYPE', payload: type });
            dispatch({ type: 'SET_OTPHASH', payload: response.data.hash });
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {

        }
    }
}
export const createNewPassword = (type, email, password) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            let response;
            if (type === 'email') {
                response = await axios.post("/createNewPassword", { type, email, password }, config);
            } else {
                response = await axios.post("/createNewPassword", { type, phone: email, password }, config);
            }
            dispatch({ type: 'PASSWORD_CHANGED', payload: response.data.changed });
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {

        }
    }
}
export const searchUser = (userName) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: "SET_SEARCH_LOADER" });
        try {
            const response = await axios.post(`/specificUser/${userName}`, config);
            const { data } = response;
            if ('user' in data) {
                dispatch({ type: "SET_SEARCH", payload: data.user });
                dispatch({ type: "CLOSE_SEARCH_LOADER" });
            } else {
                dispatch({ type: SET_MESSAGE, payload: data.msg })
                dispatch({ type: "CLOSE_SEARCH_LOADER" });

            }
        } catch (error) {
            dispatch({ type: "CLOSE_SEARCH_LOADER" });
            console.log(error);
        }
    }
}