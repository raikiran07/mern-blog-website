import React from 'react'
import Post from "../components/Post"
import {useEffect,useState} from 'react'
import axios from 'axios'
import customFetch from '../utils/customAPI'


const Home = () => {
 
  const [posts,setPost] = useState([])
  const [fetchErr,setFetchErr] = useState(false)
  const [isLoading,setLoading] = useState(true)

  useEffect( ()=>{
     
       (async () => {
        try {
          console.log("hello from home")
          
         const res = await axios.get('/api/v1/blog')
          console.log(res.data)
          setPost(res.data.reverse());
         
            setLoading(false)
        
          
        } catch (error) {
          console.log(error.message)
          setLoading(false)
          setFetchErr(true)
        }
       
      })();
       
  },[])

if(isLoading)return(
  <div className="error-container">
    <h1>Loading...</h1>
  </div>
)
if(fetchErr)return(
  <div className="error-container">
    <h2>Network Error</h2>
  </div>
)
if(posts.length < 1)return (
  <div className="noPost">
    <h3>No Post To Show</h3>
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

export default Home