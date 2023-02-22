import React from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {format} from 'date-fns'
import {UserContext} from '../ContextData/Context'

const PostPage = () => {
  const navigate = useNavigate()
  const {userInfo} = useContext(UserContext) 
  const [userId,setUserId] = useState(null)
  const [authorId,setAuthorId] = useState(null)
  const [isLoading,setLoading] = useState(true)
 
    const [postInfo,setPostInfo] = useState(null)
    const {id} = useParams()
    console.log(id)
 
    useEffect(()=>{
        (async function (){
            const res = await axios.get(`/api/v1/blog/${id}`)
            console.log(res.data)
            if(userInfo){
              // console.log(userInfo)
              setUserId(userInfo.userId)
            }
            // const {_id:authorId} = res.data.author
            // console.log("authorId:"+authorId)
            if(res.status===200){
              const {author} = res.data
              setAuthorId(author._id)
              setLoading(false)
              console.log(res)
            }
           
           
          
            
          
            setPostInfo(res.data)
            
        })();
    },[])

    const deletePost = async ()=>{
        try {
          const res = await axios.delete(`/api/v1/blog/${id}`,{
            withCredentials:true
          })

          if(res.status===200){
            navigate('/post/mypost')
          }
        } catch (error) {
          console.log(error)
        }
    }
    if(isLoading)return <div className="">Loading...</div>
    if(!postInfo)return <h>No post to display</h>
  return (
    
    <div className="singlePost">
      {
        userInfo && userId===authorId && <div className='edit-btn'>
          <Link to={`/post/edit/${id}`}>
          <button className="btn edit">Edit Post</button>
          </Link>
          
          
        </div>
      }
       
       
        <h2 className="post-title">{postInfo.title}</h2>
        <div className="author-info">
        <a href="" className="author">@{postInfo.author.username}</a>
      <time>{format(new Date(postInfo.createdAt),'MMM d, yyyy HH:mm')}</time>
        </div>
        <div className="coverImage-wrapper">
        <img src={`/${postInfo.cover}`} />
        </div>
        
        <div className="body" dangerouslySetInnerHTML={{__html:postInfo.body}} />

        {
        userInfo && userId===authorId && <div className='delete-btn'>
          
          <button className="btn edit delete" onClick={deletePost}>Delete Post</button>
          
          
        </div>
      }
    </div>
  )
}

export default PostPage