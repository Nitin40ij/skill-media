import React,{useState} from 'react';
import "./uploadImage.css";
import { Helmet } from 'react-helmet';
import {useSelector,useDispatch} from "react-redux";
import { createActionVideo } from '../../store/asyncMethods/PostMethods';
const UploadVideos = () => {
    const {user} = useSelector(state=>state.AuthReducer);
  const [state,setState] = useState({
    image:'',
    caption:'',
    category:user.skills?user.skills[0]:''
  });
  const dispatch=useDispatch();
  const {firstName,_id}=user;
  const [slugButton,setSlugButton] = useState(false);
  const [imagePreview,setImagePreview] = useState(''); 
  const [currentImage,setCurrentImage] = useState("Choose Video");
  const [slug,setSlug] = useState('');
  const slugHandle=(e)=>{
    setSlugButton(true);
		setSlug(e.target.value);
  }
  const handleURL = e=>{
    e.preventDefault();
		setSlug(slug.trim().split(' ').join('-'));
  }
  const handleInput = e=>{
	setState({
			...state,
			[e.target.name]: e.target.value,
		});
		
  }
  const fileHandle=e=>{
    console.log(e.target.files);
    if(e.target.files.length!==0){
      setCurrentImage(e.target.files[0].name);
    const createSlug = e.target.files[0].name.split('.').join('_');
		setSlug(createSlug);
    setState({
      ...state,
      [e.target.name]:e.target.files[0]
    });
    const reader = new FileReader();
    reader.onloadend=()=>{
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  }
  const createPost=e=>{
    e.preventDefault();
    
    const formData = new FormData();
    const {image,caption,category} = state;
    formData.append('image',image);
    formData.append('caption',caption);
    formData.append('category',category);
    formData.append('slug',slug);
    formData.append('name',firstName);
    formData.append('id',_id);
    console.log(formData,"FormData");
    dispatch(createActionVideo(formData));
  }
  return <>
    <div className="create mt-15">
         <Helmet>
          <title>Upload New Video</title>
          <meta name="description" content='Upload New Video' />
        </Helmet>
        <div className="container">
          <form onSubmit={createPost} >
            <div className='row ml-minus-15 mr-minus-15'>
              <div className="col-6 p-15">
                <div className="card">
                   <h3 className='card__h3' >
                     Upload New Video
                   </h3> 
                   <div className="group">
                    <label className='image__label' htmlFor="video">{currentImage}</label>
                    <input type="file" onChange={fileHandle} name='image' id='video' />
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
                   <div className="group">
                     <label htmlFor="caption">Image Caption</label>
                     <input type="text" name='caption' placeholder='Image caption' className='group__control' onChange={handleInput} value={state.caption} />
                   </div>
                </div>
              </div>
              <div className="col-6 p-15">
                  <div className="card">
                    <div className="group">
                               <label htmlFor="slug">Post URL</label>
                               <input type="text" value={slug} onChange={slugHandle} name='slug' id='slug' className='group__control' placeholder='Post URL.....' />
                    </div> 
                   <div className="group">
                        {slugButton ? <button onClick={handleURL} className='btn btn-default' >Update Slug</button>:""}
                    </div>
                      <div className="group">
                                <div className="imagePreview">
                                    {imagePreview?<video controlsList="nodownload" src={imagePreview} controls autoPlay ></video>:'' }
                                </div>
                      </div>
                             <div className='group' >
                                    <input type="submit" value='Create Post' className='btn btn-default btn-block' />
                             </div>
                  </div>                      
              </div>
            </div>
          </form>
        </div>
      </div>
  </>;
};

export default UploadVideos;
