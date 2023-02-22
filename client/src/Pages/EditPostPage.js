import React from 'react'
import {useState,useEffect} from 'react'
import {useNavigate,Link,useParams} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

const EditPostPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [body,setBody] = useState('')
  const [files,setFiles] = useState('')
  const [redirect,setRedirect] = useState(false)


     

  useEffect(()=>{
    (async function(){
            const res = await axios.get(`/api/v1/blog/${id}`,{withCredentials:true})
            console.log(res.data)
            setTitle(res.data.title)
            setSummary(res.data.summary)
            setBody(res.data.body)

    })();
  },[])

  

  const updateBlog = async (e) => {
    e.preventDefault()
        const data = new FormData()
       
       
        data.set('title',title)
        data.set('summary',summary)
        data.set('body',body)
        data.set('file',files[0])

        // we cannot console log formdata with usual method , this is the way to do so
      for (var key of data.entries()) {
        console.log(key[0] + ', ' + key[1])
      }

         const res = await axios.put(`/api/v1/blog/${id}`,data,{withCredentials:true},{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if(res.status === 200){
          navigate('/post/mypost')
        }
       
       
        
         
   
        
  }



  return (
    <form onSubmit={updateBlog} encType="multipart/form-data">
      <input type="file"   onChange={e=>setFiles(e.target.files)} name="uploaded_file"/>
      <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
      <input type="text" placeholder="Summary" value={summary} onChange={(e)=>setSummary(e.target.value)} required />
      <ReactQuill  value={body} onChange={(newValue)=>setBody(newValue)}/>
      <button className="btn add">Update Post</button>
    </form>
  )
  
}

export default EditPostPage