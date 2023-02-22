import React,{useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [body,setBody] = useState('')
  const [files,setFiles] = useState('')
  const [redirect,setRedirect] = useState(false)

  const createBlog = async (e) => {
      e.preventDefault()
      const data = new FormData()
      data.set('title',title)
      data.set('summary',summary)
      data.set('body',body)
      data.set('file',files[0])
      const res = await axios.post('/api/v1/blog',data,{withCredentials:true},{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(res)
      //we cannot console log formdata with usual method , this is the way to do so
      // for (var key of data.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }

   
      setRedirect(true)
    

    
      
  }
  if(redirect){
    return navigate('/')
   }


  return (
    <form onSubmit={createBlog} encType="multipart/form-data">
      <input type="file"  onChange={e=>setFiles(e.target.files)} name="uploaded_file"/>
      <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
      <input type="text" placeholder="Summary" value={summary} onChange={(e)=>setSummary(e.target.value)} required />
      <ReactQuill  value={body} onChange={(newValue)=>setBody(newValue)}/>
      <button className="btn add">Post</button>
    </form>
  )
}

export default CreatePost