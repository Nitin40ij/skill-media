import "./Share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import {Link, Redirect,useHistory} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createActionImage,createActionVideo } from '../../store/asyncMethods/PostMethods';
import { CLOSE_LOADER } from "../../store/types/postTypes";
let ext;
export default function Share() {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [imagePreview,setImagePreview] = useState(''); 
  const [currentImage,setCurrentImage] = useState("Choose Image");
  const dispatch = useDispatch();
  const {user,loading} = useSelector(state=>state.AuthReducer);
  const {redirect} = useSelector(state=>state.PostReducer);
  const {firstName,_id}=user;
    const [state,setState] = useState({
    image:'',
    caption:'',
    category:user.skills?user.skills[0]:'',
  });

 
  const handleInput = e=>{
	setState({
			...state,
			[e.target.name]: e.target.value,
		});
  }
  const fileHandle=e=>{
    const d = new Date();
    let time = d.getTime();
    if(e.target.files.length!==0){
      const x= e.target.files[0].name.split('.');
       ext = x[x.length-1].toLowerCase();
      
      setCurrentImage(e.target.files[0].name);
    const createSlug = e.target.files[0].name.split('.').join('_')+time;
    setState({...state,slug:createSlug})
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
    const d = new Date();
    let time = d.getTime();
    const formData = new FormData();
    const {image,caption,category,slug} = state; 
    formData.append('image',image);
    console.log(image);
    formData.append('caption',caption);
    formData.append('category',category);
    formData.append('slug',image.name.split('.').join('_')+time);
    formData.append('name',firstName);
    formData.append('id',_id);
    formData.append('profilePicture',user.profilePicture);
    if(ext=='mp4'){
      dispatch(createActionVideo(formData));
    }else{
      dispatch(createActionImage(formData));
    }
  }
  useEffect(()=>{
    if(redirect){
      setState({
    image:'',
    caption:'',
    category:user.skills?user.skills[0]:'',
  });
  setImagePreview("");
  dispatch({type:CLOSE_LOADER});
    }
  },[redirect]);
  return (
        <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture?`${user.profilePicture}`:`/assets/person/1.jpeg`} alt="" />
          <input
            placeholder={`Tell us your Caption!! ${user.firstName}`}
            className="shareInput"
            name="caption" onChange={handleInput} 
          />
          <select name='category' value={state.category} onChange={handleInput} >
           {
              user.skills.map(skill=>(
               <option value={skill}>{skill}</option>
              ))
           }
          </select>
        </div>
        <hr className="shareHr" />
          <div className="shareImgContainer">
               {imagePreview?ext=='mp4'? <video controlsList="nodownload" src={imagePreview} controls autoPlay ></video> :<img src={imagePreview} style={{width:"100%", height:"350px"}} />:''}
               {
                 imagePreview? <Cancel className="shareCancelImg" onClick={() => setImagePreview('')} />:''
               }
          </div>
        <form className="shareBottom" onSubmit={createPost}>
          <div className="shareOptions">
            <label htmlFor="image" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
               <input type="file" onChange={fileHandle} name='image' id='image' />
            </label>
            <div className="shareOption">
              <label htmlFor="video">
                <Label htmlColor="blue" className="shareOption"/>
                <span className="shareOptionText">Video</span>
                <input style={{display:'none'}} type="file" onChange={fileHandle} name='image' id='video'/>
              </label>
            </div>
            <div className="shareOption">
              <Link to="/uploadBlog" style={{textDecoration:"none", color:"#fff"}} >
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Blog</span>
              </Link>
            </div>
          </div>
          <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  );
}