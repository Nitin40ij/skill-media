import { useEffect,useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams,useHistory } from 'react-router-dom';

import {
	REDIRECT_FALSE,
	REMOVE_MESSAGE,
	SET_LOADER,
	CLOSE_LOADER,
	SET_MESSAGE,
	POST_RESET,
	RESET_UPDATE_ERRORS
} from '../../store/types/postTypes';
import ReactQuill from 'react-quill';

import { fetchPosts,fetchPost,updateAction,updatePost } from '../../store/asyncMethods/PostMethods';
import { BsPencil, BsArchive, BsImage } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';


const Edit = () => {
	const post =JSON.parse(localStorage.getItem("currPost"));
	if(!post){
		window.location.reload();
	}
	const { user } = useSelector((state) => state.AuthReducer);
    const { push } = useHistory();
	const {editErrors} = useSelector(state=>state.updatePost);
	const [state, setState] = useState({
		title: post.title,
		body:post.blog,
		category:post.category
	});
	const dispatch = useDispatch();
	const { loading, redirect } = useSelector((state) => state.PostReducer);
	useEffect(()=>{
		if(editErrors.length!==0){
			editErrors.map(error=>(
				toast.error(error.msg)
			))
			dispatch({type:RESET_UPDATE_ERRORS})
			}
			
	},[editErrors])
	useEffect(() => {
		if (redirect) {
			push('/home');
			dispatch({type:REDIRECT_FALSE})
			localStorage.removeItem("currPost")
		}
	}, [redirect]);

	const handleChange=e=>{
		
			setState({
				...state,
				[e.target.name]: e.target.value,
			});
	}
	const updatePost =e=>{
		e.preventDefault();
		dispatch(updateAction({
			title:state.title,
			body:state.body,
			category:state.category,
			id:post._id
		}))
	}
	const changeQuill =(v)=>{
		setState({...state,body:v})
	}
  return (
    <>
		 <div className='create mt-15' >
       <Helmet>
        <title>Create New Blog</title>
        <meta name="description" content='Create a new Blog' />
    </Helmet>
        <Toaster position='top-right' reverseOrder={false}  />
            <div className="container">
            <form onSubmit={updatePost} >
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-6 p-15">
                        <div className="card">
                            <h3 className='card__h3' >Create a new Post</h3>
                                <div className="group">
                                    <label htmlFor="title">Blog Title</label>
                                    <input type="text" value={state.title} onChange={handleChange} name='title' id="title" className='group__control'  placeholder='Post Title'/>
                                </div>
            						<Toaster  position='top-right' reverseOrder={false} toastOptions={{ style:{marginTop:'50px'  }}} />
                                <div className="group">
                                    <label htmlFor="body">Post body </label>
                                    <ReactQuill theme="snow" value={state.body} id='body' placeholder='Post body...' onChange={changeQuill}/>
                                </div>

                                <div className="group">
                                    <label htmlFor="setCategory"  >Select Category</label>
                                        <select name="category" className='group__control' value={state.category} onChange={handleChange} id="setCategory">
											<option value={state.category}>{post.category}</option>
                                            {
                                                user.skills.map(skill=>(
                                                   skill!==post.category?<option value={skill}>{skill}</option>:''
                                                ))
                                            }
                                        </select>
                                </div>
                                <div className='group'>
										<input
										type='submit'
										value='Edit Post'
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
}

export default Edit;