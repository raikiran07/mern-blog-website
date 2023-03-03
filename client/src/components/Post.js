import React from 'react'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'



const Post = ({_id:id,title,summary,body,cover,createdAt,author}) => {
  
  
  
  return (
   
    <div className="post">
    <div className="image">
      <Link to={`/post/${id}`} >
      <img src={`{http://' + window.location.hostname + '/' + ${cover}}`} />
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
  
 
  </div>
  

  
  )
}

export default Post