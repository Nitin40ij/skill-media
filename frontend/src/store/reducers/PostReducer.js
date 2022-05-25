import {CREATE_ERRORS,UPDATE_IMAGE_ERRORS,SET_LOADER,CLOSE_LOADER,REDIRECT_FALSE,REDIRECT_TRUE,SET_MESSAGE,REMOVE_MESSAGE, REMOVE_ERRORS, SET_POSTS,POST_REQUEST,SET_POST,POST_RESET,SET_UPDATE_ERRORS,RESET_UPDATE_ERRORS,RESET_UPDATE_IMAGE_ERRORS} from "../types/postTypes"
// local state for posts
const initState={
    loading:false,
    postErrors:[],
    redirect:false,
    message:'',
    posts:[],
    post: {},
    editErrors: [],
    postStatus:false,
    updateImageErrors:[],
    skill:'',
    skillPosts:'',
    likeCount:0,
    homePageData:[],
    postComment:'',
    skillUsers:[],
    newPost:{}
}
export const PostReducer=(state=initState,action)=>{
    
    if(action.type===SET_LOADER){
        // loader for async calls
        return {...state,loading:true}
    }else if(action.type==='SET_POST_SKILL'){
        // setting post skill
        return {...state,skill:action.payload}
    }else if(action.type==='SET_POST_DATA'){
        // post data setting
        return {...state,skillPosts:action.payload.posts,skillUsers:action.payload.users}
    }else if(action.type===CLOSE_LOADER){
        // close loader after response
        return {...state,loading:false}
    }else if(action.type===CREATE_ERRORS){
        // checking post errors
        return {...state,postErrors:action.payload}
    }else if(action.type===REDIRECT_TRUE){
        // redirecting the page after post creation
        return {...state,redirect:true}
    }else if(action.type===REDIRECT_FALSE){
        // setting redirection false
        return {...state,redirect:false}
    }else if(action.type===SET_MESSAGE){
        // setting msg for notification
        return {...state,message:action.payload}
    }else if(action.type===REMOVE_ERRORS){
        // removing errors
        return {...state,postErrors:[]}
    }else if(action.type===REDIRECT_FALSE){
        return {...state,redirect:false}
    }else if(action.type===REMOVE_MESSAGE){
        return {...state,message:''}
    }else if(action.typr==='SET_LIKE_COUNT'){
        // like counts not in use now
        return {...state,likeCount:action.payload}
    }
    else if(action.type===POST_REQUEST ){
        // requesting for post not in use now
        return {...state,postStatus:false}
    }
    else if(action.type==='SET_POST_COMMENT' ){
        // Post comment not in use  now
        return {...state,postComment:action.payload}
    }
    else if(action.type==='CLOSE_COMMENT' ){
        // closing post comment
        return {...state,comment:''}
    }else if(action.type==="NEW_POST"){
        return {...state,newPost:action.payload}
    }else if(action.type==="UNSET_NEW_POST"){
        return {...state,newPost:""}
    }
    else{
        return state;   
    }
}
// Fetching Post reducer
export const FetchPosts = (state=initState,action)=>{

    const {type,payload} = action;
    // setting post for temprary use
    if(type==SET_POSTS){
        return {...state,posts:action.payload}
    }else if(action.type==='RESET_POSTS'){
        // resetting post
            return {...state.loading,postErrors:[],posts:[],message:''}
    }else if(action.type===SET_LOADER){
        // loader for async use
        return {...state,loading:true}
    }
    else if(action.type===CLOSE_LOADER){
        // closing loader
        return {...state,loading:false}
    }else if(action.type===POST_REQUEST){
        // requeting Post
        return {...state,}
    }else if(action.typr==='SET_LIKE_COUNT'){
        // Like count not in use now
        return {...state,likeCount:action.payload}
    }else if(type==='SET_HOME_PAGE_DATA'){
        // setting data for home page
        return {...state,homePageData:action.payload}
    }
    else if(action.type===SET_MESSAGE){
        // notification message
        return {...state,message:payload}
    }
    else{
        return state;
    }
}
export const FetchPost = (state=initState,action)=>{
    const {type,payload} = action;
    if(type==SET_POST){
        // setting Post
        return {...state,post:payload}
    }else if(type===SET_LOADER){
        // setting Loader
            return {...state,loading:true}
    }else if(action.typr==='SET_LIKE_COUNT'){
        // like count
        return {...state,likeCount:action.payload}
    }
    else if (type===POST_REQUEST) {
        //doing Post Request
        return { ...state,postStatus:true };
	}else if (type===POST_RESET) {
        // resetting Post
		return { ...state,postStatus:false };
	}
	else if (type===SET_MESSAGE) {
        // notification
		return { ...state,message:payload};
	}
    else{
        return state;
    }
}
export const updatePost = (state=initState,action)=>{
    const {type,payload} = action;
    if(type===SET_UPDATE_ERRORS){
        // update errors notification array
        return {...state,editErrors:payload}
    }else if(type===RESET_UPDATE_ERRORS){
        // restting erros
        return {...state,editErrors:[]}
    }else if(action.type===SET_MESSAGE){
        // notification message
        return {...state,message:action.payload}
    }else if(action.type===CLOSE_LOADER){
        // closing loader after response
        return {...state,loading:false}
    }else if(action.type===REDIRECT_FALSE){
        // redirecting false
        return {...state,redirect:false}
    }else if(type===SET_LOADER){
        // setting loader for async calls
        return {...state,loader:true}
    }else if(action.typr==='SET_LIKE_COUNT'){
        // likes count no more in use
        return {...state,likeCount:action.payload}
    }
    else{
        return state;
    }
}
// Update Image validations
export const UpdateImage=(state=initState,action)=>{
    const {type,payload} = action;
    if(type===UPDATE_IMAGE_ERRORS){
        return {...state,updateImageErrors:payload}
    }else if(type===RESET_UPDATE_IMAGE_ERRORS){
        return{...state,updateImageErrors:[]}
    }else if(type===SET_LOADER){
        return {...state,loading:true}
    }else if(action.typr==='SET_LIKE_COUNT'){
        return {...state,likeCount:action.payload}
    }
    else if(type===SET_MESSAGE){
        return {...state,message:payload}
    }
    else{
        return state;
    }
}