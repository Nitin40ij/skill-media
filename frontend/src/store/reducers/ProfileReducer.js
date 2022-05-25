import {
	RESET_PROFILE_ERRORS,
	SET_PROFILE_ERRORS,
} from '../types/ProfileTypes';
// Profile Reducer
const initState = {
	updateErrors: [],
};
// Update NAme Reducer
export const updateName = (state = initState, action) => {
	const { type, payload } = action;
	// Checking erros
	if (type === SET_PROFILE_ERRORS) {
		return {
			...state,
			updateErrors: payload,
		};
		// Restting erros
	} else if (type === RESET_PROFILE_ERRORS) {
		return {
			...state,
			updateErrors: [],
		};
	} else {
		return state;
	}
};
