import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useHistory } from 'react-router-dom';
import { CLOSE_LOADER } from '../../store/types/postTypes';
import { RESET_UPDATE_IMAGE_ERRORS } from '../../store/types/postTypes';
import { updateImageAction, updateVideoAction } from '../../store/asyncMethods/PostMethods';
import toast,{Toaster} from "react-hot-toast";
const EditVideo = () => {
    const post =JSON.parse(localStorage.getItem("currPost"));
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {updateImageErrors,loading} = useSelector(state=>state.UpdateImage)
    console.log(post);
	const { user } = useSelector((state) => state.AuthReducer);
    const {redirect} = useSelector(state=>state.PostReducer)
    const [state,setState] = useState({
        title:post.videoCaption,
        video:post.video,
        category:post.category
    })
    useEffect(()=>{
        if(loading){
            dispatch({type:CLOSE_LOADER})
        }
        if(redirect){
                push("/home");
        }   
    },[redirect,loading])
   
    useEffect(()=>{
        if(updateImageErrors.length!==0){
            updateImageErrors.map(err=>(
                toast.error(err.msg)
            ))
            dispatch({type:RESET_UPDATE_IMAGE_ERRORS})
        }
    },[updateImageErrors])
    const updateImage=e=>{
        console.log(state.category);
        e.preventDefault();
        const formData = new FormData();
        formData.append("id",post._id);
        formData.append("title",state.title);
        formData.append("category",state.category);
        dispatch(updateVideoAction(formData));
    }
    const inputHandle=e=>{
        console.log(e.target.value);
        setState({...state,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-6">
                <div className="card">
                    <h3>
                        Update video 
                    </h3>
            		<Toaster  position='top-right' reverseOrder={false} toastOptions={{ style:{marginTop:'50px'  }}} />

                    <form onSubmit={updateImage}>
                        <div className="group">
                            <label htmlFor="caption" className='label' >
                                Video Caption
                            </label>
                            <input type="text" name='title' id='caption' className='group__control' onChange={inputHandle} value={state.title} />
                        </div>
                        <div className="group">
                            <label htmlFor="currentImage">Current Image</label>
                            <img src={state.image} alt="" id='currentImage' />
                        </div>
                        <div className="group">
                                    <label htmlFor="setCategory"  >Select Category</label>
                                        <select name="category" value={state.category} className='group__control' value={state.category} onChange={inputHandle} id="setCategory">
											<option >{post.category}</option>
                                            {
                                                user.skills.map(skill=>(
                                                   skill!==post.category?<option value={skill}>{skill}</option>:''
                                                ))
                                            }
                                        </select>
                                </div>
                        <div className="group">
                            <input type="submit" value="Update Post" className='btn btn-default btn-block' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditVideo