import axios from 'axios';
import {
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,
	SET_MESSAGE,
} from '../types/postTypes';
import {
	RESET_PROFILE_ERRORS,
	SET_PROFILE_ERRORS,
} from '../types/ProfileTypes';
import { SET_TOKEN } from '../types/AuthTypes';
// updating name of user
export const UpdateNameAction=(user)=>{
    return async (dispatch,getState)=>{
			// validating a user using token
        const {
            AuthReducer:{token},
        }=getState();
        const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
        try {
			const {data} = await axios.post('/updateName', user, config);
			dispatch({ type: CLOSE_LOADER });
            console.log(data);
			localStorage.setItem('myToken', data.token);
			dispatch({ type: SET_TOKEN, payload: data.token});
			dispatch({ type: SET_MESSAGE, payload: data.msg });
			dispatch({ type: REDIRECT_TRUE });
        } catch (error) {
           dispatch({ type: CLOSE_LOADER });
			console.log(error.response.data.errors);
			dispatch({
				type: SET_PROFILE_ERRORS,
				payload: error.response.data.errors,
			});
        }
    }

}
// Uploading a Profile Picture 
export const uploadDp=(formData)=>{
    return async (dispatch,getState)=>{
        const {
            AuthReducer:{token},
        }=getState();
        const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
        try {
			const {data} = await axios.post('/updatePicture', formData, config);
			dispatch({ type: CLOSE_LOADER });
            console.log(data);
			localStorage.setItem('myToken', data.token);
			dispatch({ type: SET_TOKEN, payload: data.token});
			dispatch({ type: SET_MESSAGE, payload: data.msg });
			dispatch({ type:REDIRECT_TRUE });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
			dispatch({
				type: SET_PROFILE_ERRORS,
				payload: error.response.data.errors,
			});
        }
    }
}