import React,{useEffect, useState} from 'react';
import "./uploadBlog.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Helmet } from 'react-helmet';
import { Box, Typography, Button } from '@mui/material';
import {useHistory,Link, Redirect} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux";
import toast,{Toaster} from "react-hot-toast";
import { createAction } from '../../store/asyncMethods/PostMethods';
import { REDIRECT_FALSE } from '../../store/types/postTypes';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 6,
};
const date = new Date();
let time = date.getTime();
const UploadBlog = () => {
    const history =useHistory();
    const {postErrors,redirect} = useSelector(state=>state.PostReducer);
    const [currentImage,setCurrentImage] = useState("Choose Image");
    const [value,setValue] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const dispatch = useDispatch();
    const {user,skills} = useSelector(state=>state.AuthReducer);
    const {_id,firstName}=user;
    const [imagePreview,setImagePreview] = useState(''); 
    const [slug,setSlug] = useState('');
    const [slugButton,setSlugButton] = useState(false);
    const [category,setCategory] =useState("")
    const [state,setState] = useState({
        title:'',description:'',image:'',category:user.skills?user.skills[0]:'',description:''
    }); 
    const [unselectedSkills, setUnselectedSkills] = useState(user.skills); 
	const handleInput = (e) =>{
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		const createSlug = e.target.value.trim().split(' ').join('-');
		setSlug(createSlug);
	};
    const createPost=e=>{
        e.preventDefault();
        const formData = new FormData();
        const {title,category,description} = state;
        formData.append('title',title);
        formData.append('body',description);
        formData.append('slug',title.split(' ').join('-')+time);
        formData.append('name',firstName);
        formData.append('category',category);
        formData.append('id',_id);
        formData.append('profilePicture',user.profilePicture);
        dispatch(createAction(formData));
        if(redirect){
         history.push("/home");
        }
    }
    useEffect(()=>{
        if(redirect){
                history.push("/home");
                dispatch({type:REDIRECT_FALSE})
        }
        if(postErrors.length!==0){
            postErrors.map(err=>toast.error(err.msg));
        }
    },[postErrors,redirect])
    
  return(
      <>
      <div className='create mt-15' >
        <Toaster position='top-right' reverseOrder={false}  />
            <div className="container">
            <form onSubmit={createPost}>
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-6 p-15">
                        <div className="card">
                            <h3 className='card__h3' >Create a new Post</h3>
                                <div className="group">
                                    <label htmlFor="title">Blog Title</label>
                                    <input type="text" value={state.title} onChange={handleInput} name='title' id="title" className='group__control'  placeholder='Post Title'/>
                                </div>
                                
                                <div className="group">
                                    <label htmlFor="body">Post body </label>
                                    <textarea name="description" value={state.description} id="body" placeholder='Post Body.....' onChange={handleInput} cols="30" rows="10"></textarea>
                                    {/* <ReactQuill theme="snow" value={value} id='body' placeholder='Post body...' onChange={setValue}/> */}
                                </div>

                                <div className="group">
                                    <label htmlFor="setCategory"  >Select Category</label>
                                        <select name="category" className='group__control' value={state.category} onChange={handleInput} id="setCategory">
                                            {
                                                user.skills.map(skill=>(
                                                    <option value={skill}>{skill}</option>
                                                ))
                                            }
                                        </select>

                                    
                                </div>
                                <div className='group'>
										<input
											type='submit'
											value='Create post'
											className='btn btn-default btn-block'
										/>
									</div>
                        </div>
                    </div>
                   
                </div>
            </form>
            </div>
  </div>
        </>

  )
};

export default UploadBlog;
