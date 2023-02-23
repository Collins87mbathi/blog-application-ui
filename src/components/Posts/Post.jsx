import React,{useState,useEffect} from 'react'
import {FcLike,FcLikePlaceholder} from "react-icons/fc";
import {BiCommentDetail} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {createImageFromInitials} from "../../utils/getInitials"
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {getRandomColor} from "../../utils/getRandomColor"
import { axiosInstance } from '../../config/config';
import { savedSuccess} from '../../Redux/Slices/savedSlice';
// import axios from 'axios';
// import {BASE_URL} from "../../config/config";
const IM = "https://colloblog.azurewebsites.net/images/"
const formatter = buildFormatter(frenchStrings)
const Post = ({post, socket}) => {
 const user  = useSelector((state)=> state.user.user);
let imgSrc = post.userimg;
let name = post.username;
const [click, setClick] = useState(false);
const [like, setLike] = useState(post.likes.length);
const [savedClick, setSavedClick] = useState(false);
const [singlePost, setSinglePost] = useState([]);
const dispatch  = useDispatch();
//useEffect
useEffect(()=> {
// eslint-disable-next-line array-callback-return
post.likes.map((like) => {
 if (like.userId === user?.id && like.postId === post.id) {
  return setClick(true);
 }
})
},[post.likes,user?.id,post.id]);

useEffect(() => {
  const fetchSinglePost = async () => {
    const res = await axiosInstance.get('post/' + post.id);
    setSinglePost(res.data.singlepost);
  };
  fetchSinglePost();
}, [post.id]);
//like function
const LikeAPost = async () => {
  socket.emit('LikePost', {
    username:user.name,
    userimg:user.img,
    desc:post.title,
    type:2
  });
   try {
    await axiosInstance.post('likes', {
     userId : user?.id,postId:post.id 
   }, {
    headers: { token: `Bearer ${user?.token}` }
  });
  setLike(click ? like - 1 : like + 1);
   setClick(!click);

   } catch (error) {
    console.log(error);
   }
   
}
const savedPost = () => {
  dispatch(savedSuccess(singlePost));
 setSavedClick(!savedClick);
 }
  return (
    <>
     <div className="post-container">
    <div className="post-user">
          <img src={
              imgSrc !== null ?  IM + imgSrc : createImageFromInitials(500, name, getRandomColor())
          } className="user-post" alt='user pic'/>
          <div className="user-name">
            <h5>{post.username}</h5>
            <p>{<TimeAgo date={post.createdAt} formatter={formatter} />}</p>
          </div>
        </div>
        <div className="post-title">
          <Link to={`/post/${post.id}`}>
          <h3>{post.title}</h3>
          </Link>
        </div>
        <div className="post-emoji">
        <span className='like-emoji' onClick={LikeAPost}>{click ?  <FcLike/> : <FcLikePlaceholder/> } {like}</span>
        <span><BiCommentDetail/>{post.comments?.length}</span>
        <span  className='save-emoji' onClick={savedPost}>{savedClick ? <i className="fa-solid fa-bookmark save"></i> : <i className="fa-regular fa-bookmark save"></i> }</span>
      </div>
      </div>
        </>
  )
}

export default Post