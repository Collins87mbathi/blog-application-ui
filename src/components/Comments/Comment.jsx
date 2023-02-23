import React,{useState} from 'react'
import TimeAgo from 'react-timeago'
import {BiEdit,BiSend} from 'react-icons/bi'
import {MdDelete,MdReply} from 'react-icons/md';
import {useSelector} from 'react-redux'
import englishStrings from 'react-timeago/lib/language-strings/en';
import { createImageFromInitials } from '../../utils/getInitials';
import {getRandomColor} from '../../utils/getRandomColor'
// import axios from 'axios';
import './Comments.scss';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { axiosInstance } from '../../config/config';
// import { BASE_URL } from '../../config/config';
const IM = "https://colloblog.azurewebsites.net/images/"
const formatter = buildFormatter(englishStrings);

const Comment = (comment) => {
    const user = useSelector((state) => state.user.user);
   const  [commentdesc, setCommentdesc] = useState("");
   const [updateMode, setUpdateMode] = useState(false);
    const deleteComments = async () => {
        try {
        await axiosInstance.delete(`comment/${comment.comment.id}`,
        {header: { token: `Bearer ${user.token}` }}
        );
        window.location.reload("/")
        } catch (error) {
            
        }
        
    }

    const updateComments = async () => {
        try {
            await axiosInstance.put(`comment/${comment.comment.id}`, {
              desc: commentdesc,
            },
            {headers: { token: `Bearer ${user.token}` }}
            );

            setUpdateMode(false);
            window.location.reload("/")
        } catch (error) {
            
        }
    }

  return (
    <>
    <div className='comment-container'>
        <img src={   (comment.comment.userimg !== null ) ? IM + comment.comment.userimg : createImageFromInitials(500, comment.comment.username, getRandomColor()) } alt="avatar"/>
        <div className="comment-details">
            <span className='comment-name'>{comment.comment.username}<span className='comment-date'>. {<TimeAgo date={comment.comment.createdAt} formatter={formatter} />}</span></span>
            {updateMode ? (
                <div className="onediting">
               <input
               type="text"
               placeholder={comment.comment.desc}
               value={commentdesc}
               className="commentInput"
               autoFocus={true}
               onChange={(e) => setCommentdesc(e.target.value)}
             />
            <BiSend onClick={updateComments} className="updateButton"/>
            </div>
            ):(
                <p className='coment-text'>{comment.comment.desc}</p>
            )}
            <div className="comment-icon">
             <button className='comment-reply'><MdReply/></button>
             {user?.name === comment.comment.username &&  (
                <>
             <button className='comment-edit'onClick={() => setUpdateMode(true)}><BiEdit/></button>
             <button className='comment-delete' onClick={deleteComments}><MdDelete/></button>
             </>
             )}
            </div>
        </div>
    </div>
 </>
  )
}

export default Comment