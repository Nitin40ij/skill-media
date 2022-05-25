import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import classes from './Comments.module.css'
import { postComment,getComments } from '../../store/asyncMethods/PostMethods';

const Comments = ({post}) => {
  const dispatch = useDispatch();
  const [comments,setComments] = useState(post);
  const {postComment} = useSelector(state=>state.PostReducer);
    const {message} = useSelector(state=>state.PostReducer);
  return ( 
        <>
        {
          comments.length>2?
          <>
                <div className={classes.dummy} style={{marginTop:"2px", marginBottom:"2px"}}>
                 <h5 style={{margin:"auto", marginLeft:"0", marginRight:"10px" }}>{comments[0].name}</h5>
                  <p>{comments[0].comment}</p>
                  </div> 
                <div className={classes.dummy} style={{marginTop:"2px", marginBottom:"2px"}}>
                 <h5 style={{margin:"auto", marginLeft:"0", marginRight:"10px" }}>{comments[1].name}</h5>
                  <p>{comments[1].comment}</p>
                  </div> 
          </>            
          :comments.length>0?
              <div className={classes.dummy} style={{marginTop:"2px", marginBottom:"2px"}}>
                 <h5 style={{margin:"auto", marginLeft:"0", marginRight:"10px" }}>{comments[0].name}</h5>
                  <p>{comments[0].comment}</p>
                  </div> 
          :""
        }
        {/* {comments.map(comment=>( 
                     <div className={classes.dummy} style={{marginTop:"2px", marginBottom:"2px"}}>
                 <h5 style={{margin:"auto", marginLeft:"0", marginRight:"10px" }}>{comment.name}</h5>
                <p>{comment.comment}</p> 
           </div> 
         ))} */}
        </> 
  )
}

export default Comments