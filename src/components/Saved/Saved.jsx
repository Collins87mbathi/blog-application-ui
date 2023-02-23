import React from 'react'
import './Saved.scss'
import {useSelector} from 'react-redux';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {Link} from "react-router-dom";
import Save from './Save';

const Saved = () => {
  const saved = useSelector((state)=> state.saved.saved);
  // const Onclick = async (id) => {
  //   saved.filter((pos)=>{
  //   return pos.id !== id;
  //   })
  // }


 console.log(saved);
  return (
    <div className='saved'>
      <div className="saved-nav">
        <Link to='/'><AiOutlineArrowLeft className='arrow'/></Link>
        <h2>Bookmarked</h2>
      </div>
      {saved.map((post)=>{
     return <Save key={post.id}  post = {post}/>
      })}
    </div>
  )
}

export default Saved