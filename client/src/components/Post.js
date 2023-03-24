import React,{useState,useContext} from 'react'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'
import {UserContext} from '../ContextData/Context'



const Post = ({_id:id,title,summary,body,cover,createdAt,author}) => {
  
  const {setUserInfo,userInfo} = useContext(UserContext) 
 
  console.log(userInfo)
  console.log(cover.url)
  
  return (
   
    <div className="post">
    <div className="image">
      <Link to={`/post/${id}`} >
      <img src={`${cover.url}`} />
      </Link>
    
    </div>
    
    <div className="text">
      <Link to={`/post/${id}`}>
      <h2>{title}</h2>
      </Link>
    
    <p className="info">
      <a href="" className="author">{author.username}</a>
      <time>{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</time>
    </p>
  <p className="summary">{summary}</p>
    </div>

    {/* <div className='likes'>
      <span></span><span>{likes}</span>
    </div> */}
  
 
  </div>
  

  
  )
}

export default Post