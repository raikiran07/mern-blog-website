
import React from 'react'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Post from '../components/Post'

const MyPost = () => {
  const [posts,setPost] = useState([])
  useEffect(()=>{
    (async function(){
        const res = await fetch('/api/v1/blog/mypost',{
          credentials:'include',
          
        })
        const data = await res.json()
        console.log(data)
        setPost(data)
    })();
  },[])

  if(posts.length < 1)return (
    <div className="">
      <p>No Post To Display</p>
      <Link to='/create'>Create Post</Link>
    </div>
  
  )
  return (
    <div className="posts">
    {
      posts.length > 0 &&
      posts.map(post=>{
       
        return(
          <Post key={post._id} {...post}  />
        )
      })
    }

    </div>
  )
}

export default MyPost