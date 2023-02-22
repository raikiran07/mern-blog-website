import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register  = () => {
    const navigate = useNavigate()
    const URL = process.env.BASE_URL
    const [username,setUserName] = useState('');
    const [useremail,setUserEmail] = useState('');
    const [password,setUserPassword] = useState('');
    const [err,setErr] = useState(null)
const register = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register',{username,useremail,password})
      if(res.status===200){
        toast.success('Successfully Register', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setTimeout(()=>{
            navigate('/login')
          },3000)
      }
     
    
     
    } catch (error) {
      alert("something went wrong")
      const {data} = error.response
      setErr(data.msg)
    }
    
    
}
    

  return (
    <form className="form register" onSubmit={register}>
        <h1>Register</h1>
    <input type="text" name="username" placeholder="username" value={username} onChange={e=>setUserName(e.target.value)} required/>
    <input type="text" name="useremail" placeholder="useremail" value={useremail} onChange={e=>setUserEmail(e.target.value)} required/>
    <input type="password" name="password" placeholder="password" value={password} onChange={e=>setUserPassword(e.target.value)} required />
    <span style={{color:"red"}}>{err}</span>
    <button type="submit" className="btn register">Register</button>

   
</form>
  )
}

export default Register