import React,{useEffect, useState} from 'react'
import Comments from "./Comments";
import {useLocation} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux";
import { postComment } from '../../store/asyncMethods/PostMethods';

const PostComment = ({post}) => {
  const {user} = useSelector(state=>state.AuthReducer);
    const [commentVal,setCommentVal] = useState('');
  const [comments,setComments] = useState(post.comments);
  const dispatch = useDispatch();
   const handleComment=e=>{
    setCommentVal(e.target.value);
  }
  const handleCommentClick=e=>{
    e.preventDefault();   
    const f={comment: commentVal,
name: user.username,
user: user._id,
_id: post._id
}
  let data=comments;
  data.unshift(f);
    dispatch(postComment(commentVal,post));
    setCommentVal("");
  }
  return (
    <div>
    <div className="writeComment">
            <input type="text" value={commentVal} onChange={handleComment} placeholder="Write Your Comment" />
            <button disabled={commentVal.length<=0} onClick={handleCommentClick}>Post Comment</button>
    </div>
      {post.comments.length===0?"": 
           <Comments post={comments} /> 
      }    
    </div>
  )
}
export default PostComment;