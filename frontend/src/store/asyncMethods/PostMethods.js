import axios from 'axios';
import { CREATE_ERRORS, SET_LOADER, CLOSE_LOADER, REDIRECT_FALSE, UPDATE_IMAGE_ERRORS, REDIRECT_TRUE, SET_MESSAGE, REMOVE_MESSAGE, REMOVE_ERRORS, SET_POSTS, POST_REQUEST, SET_POST, SET_UPDATE_ERRORS } from "../types/postTypes";
// function for creating BLOG
export const createAction = (postData) => {
    return async (dispatach, getState) => {
        const { AuthReducer: { token } } = getState();
        let response;
        try {
            // validating a user using token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            //  dispacth function check reducders
            dispatach({ type: SET_LOADER });
            response = await axios.post("/create_post", postData, config);
            console.log(response);
            const { data } = response;
            if ('errors' in data) {
                const { errors } = data;
                dispatach({ type: CLOSE_LOADER });
                dispatach({ type: CREATE_ERRORS, payload: errors });
            } else {
                console.log("Inside create");
                dispatach({ type: REDIRECT_TRUE });
                dispatach({ type: REMOVE_ERRORS });
                dispatach({ type: SET_MESSAGE, payload: data.msg })
                dispatach({ type: CLOSE_LOADER });
            }
        } catch (error) {
            dispatach({ type: CLOSE_LOADER });

        }
    }
}
// Function for Creating Image Blog
export const createActionImage = (postData) => {
    console.log("hereee");
    return async (dispatach, getState) => {

        const { AuthReducer: { token } } = getState();
        dispatach({ type: SET_LOADER });
        let response;
        try {
            // validating a user using token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            response = await axios.post("/create_post_image", postData, config);
            const { data } = response;

            //  Handling erros
            if ('errors' in data) {
                const { errors } = data;
                dispatach({ type: CLOSE_LOADER });
                dispatach({ type: CREATE_ERRORS, payload: errors });
            } else {
                dispatach({ type: REDIRECT_TRUE });
                dispatach({ type: "NEW_POST", payload: data.newPost });
                dispatach({ type: REMOVE_ERRORS });
                dispatach({ type: SET_MESSAGE, payload: data.msg })
                dispatach({ type: CLOSE_LOADER });
            }
        } catch (error) {
            dispatach({ type: CLOSE_LOADER });

        }
    }
}
// function for creating Video Post
export const createActionVideo = (postData) => {
    return async (dispatach, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatach({ type: SET_LOADER });
        let response;
        try {
            // validating a user using token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            response = await axios.post("/create_post_video", postData, config);
            const { data } = response;
            console.log(data);
            //  hanling errors
            if ('errors' in data) {
                console.log(data);
                const { errors } = data;
                dispatach({ type: CLOSE_LOADER });
                dispatach({ type: CREATE_ERRORS, payload: errors });
            } else {
                dispatach({ type: REDIRECT_TRUE });
                console.log(response);
                dispatach({ type: REMOVE_ERRORS });
                dispatach({ type: SET_MESSAGE, payload: data.msg })
                dispatach({ type: CLOSE_LOADER });
            }
        } catch (error) {
            dispatach({ type: CLOSE_LOADER });
        }
    }
}
// Fetch all the posts created by a user using his ID.
export const FetchPosts = (id) => {
    return async (dispatach, getState) => {
        const { AuthReducer: { token, user } } = getState();
        // validating a user using token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }, token
        }
        dispatach({ type: SET_LOADER })
        try {
            const response = await axios.get(`/posts/${id}`, config);
            const { data } = response;
            console.log(data);
            dispatach({ type: CLOSE_LOADER });
            dispatach({ type: SET_POSTS, payload: data })
            dispatach({ type: POST_REQUEST });

        } catch (error) {
            dispatach({ type: CLOSE_LOADER });
        }
    }
}
// Fetching the Post(particular Post) using Post ID.
export const fetchPost = (id) => {
    return async (dispatach, getState) => {
        const { AuthReducer: { token, user } } = getState();
        const { FetchPost } = getState();
        // validating a user using token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }, token
        }
        dispatach({ type: SET_LOADER })
        try {
            const response = await axios.get(`/post/${id}`, config);
            const { data: { post } } = response;
            dispatach({ type: SET_POST, payload: post })
            localStorage.setItem('currPost', JSON.stringify(post));
            console.log(id);
            dispatach({ type: CLOSE_LOADER });
        } catch (error) {
            dispatach({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
}
// Fetching Post using a particular Skill
export const fetchSkillWise = (skill) => {
    return async (dispatach, getState) => {
        const { AuthReducer: { token, user } } = getState();
        // validating a user using token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }, token
        }
        dispatach({ type: SET_LOADER })
        try {
            const response = await axios.get(`/skillFetch/${skill}`, config);
            const { data } = response;
            console.log(data);
            dispatach({ type: 'SET_POST_SKILL', payload: skill });
            dispatach({ type: 'SET_POST_DATA', payload: data });
            dispatach({ type: CLOSE_LOADER });
        } catch (error) {
            dispatach({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
}
// Update Blog
export const updateAction = (editData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();
        // validating a user using token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            dispatch({ type: SET_LOADER });
            const response = await axios.post('/updatePost', editData, config);
            dispatch({ type: SET_MESSAGE, payload: response.data.msg });
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });

        } catch (error) {
            const {
                response: {
                    data: { errors },
                },
            } = error;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_UPDATE_ERRORS, payload: errors });
            console.log(error.response, "ASassa");
        }
    };
};
// Update Image Post
export const updateImageAction = (updateData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();
        // validating a user using token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        dispatch({ type: SET_LOADER });
        try {
            const response = await axios.post('/updateImage', updateData, config);

            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: response.data.msg })
        } catch (error) {
            const {
                response: {
                    data: { errors },
                },
            } = error;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: UPDATE_IMAGE_ERRORS, payload: errors });
            console.log(error.response, "UPDATE_IMAGE_ERROS");

        }
    }
}
// Update Video Post
export const updateVideoAction = (updateData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();
        // validating a user using token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        dispatch({ type: SET_LOADER });
        try {
            const response = await axios.post('/updateVideo', updateData, config);

            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: response.data.msg })
        } catch (error) {
            const {
                response: {
                    data: { errors },
                },
            } = error;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: UPDATE_IMAGE_ERRORS, payload: errors });
            console.log(error.response, "UPDATE_IMAGE_ERROS");

        }
    }
}
// Delete Post
export const deletePost = (id) => {
    return async (dispatch, getState) => {
        console.log("Over here");
        // confirming a user to delete
        const confirm = window.confirm('Do you really want to delete this post?');
        if (confirm) {
            dispatch({ type: SET_LOADER });
            try {
                const {
                    AuthReducer: { token },
                } = getState();
                // validating a user using token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: { msg } } = await axios.get(`/delete/${id}`, config);
                dispatch({ type: REDIRECT_TRUE });
                dispatch({ type: SET_MESSAGE, payload: msg });
            } catch (error) {
                console.log(error.meaasage);
                dispatch({ type: CLOSE_LOADER });
                console.log(error);
            }
        }
    }
}
// UnAppricate a pOST 
export const unLikePost = (id) => {
    return async (dispatch, getState) => {
        //   dispatch({type:SET_LOADER});
        try {
            const {
                AuthReducer: { token, user }, FetchPosts: { posts }
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(`/postunAppriciate/${id}`, user, config);
            const newData = posts.data.map(item => {
                if (item._id == response.data._id) {
                    // console.log(response.data,"RESULT");
                    return response.data;
                } else {
                    // console.log(item,"ITEM");
                    return item;
                }
            });
            // console.log(newData);
        } catch (error) {
            console.log(error.message);
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    }
}
// Appriciate a Post
export const likePost = (id) => {
    return async (dispatch, getState) => {
        //   dispatch({type:SET_LOADER});
        try {
            const {
                AuthReducer: { token, user }, FetchPosts: { posts }
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(`/postAppriciate/${id}`, user, config);
            const newData = posts.data.map(item => {
                if (item._id == response.data._id) {
                    return response.data;
                } else {
                    return item;
                }
            });
        } catch (error) {
            console.log(error.message);
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    }
}
// Getting All the Post Data randomly
export const getPostData = () => {
    return async (dispatch, getState) => {
        dispatch({ type: SET_LOADER });
        try {
            const {
                AuthReducer: { token, user },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post('/homePostData', user, config);
            console.log(response);
            dispatch({ type: "SET_HOME_PAGE_DATA", payload: response.data.data })
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error);
        }
    }
}
// Commenting on  a Post
export const postComment = (comment, post) => {
    return async (dispatch, getState) => {
        dispatch({ type: SET_LOADER });
        try {
            const {
                AuthReducer: { token, user },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post('/postComment', { comment, user, post }, config);
            const { data } = response;
            if ('errors' in data) {
                console.log(data);
                const { errors } = data;
                dispatch({ type: CLOSE_LOADER });
                dispatch({ type: CREATE_ERRORS, payload: errors });
            } else {
                dispatch({ type: SET_MESSAGE, payload: data.msg });
                dispatch({ type: CLOSE_LOADER });
            }
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error);
        }

    }
}
// getting a comment on the Post
export const getComments = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: SET_LOADER });
        try {
            const {
                AuthReducer: { token },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`/getComments/${id}`, config);
            dispatch({ type: "SET_POST_COMMENT", payload: response.data.comment });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error);
        }
    }
}