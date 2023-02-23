import React from 'react'
import {AiFillDelete} from "react-icons/ai";
import {useDispatch} from 'react-redux';
import { removesave } from '../../Redux/Slices/savedSlice';
const IM = "https://colloblog.azurewebsites.net/images/"
const Save = ({post}) => {
const dispatch = useDispatch();

const Onclick = (post) => {
 dispatch(removesave(post));
}


  return (
    <div className='save'>
     <div className="save-user">
        <div className="save-details">
            <h3>{post.title}</h3>
            <h5>{post.username}</h5>
            <p>{post.comments.length} comments</p>
            <AiFillDelete className='delete-save' onClick={()=> Onclick(post)}/>
            <hr/>
        </div>
        <img src={IM + post.postimg} className="save-img" alt="post"/>
     </div>
    </div>
  )
}

export default Save