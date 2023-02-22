import React from 'react'
import {useState,useContext} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../ContextData/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LoginPage = () => {
  const navigate = useNavigate()
   const {setUserInfo} = useContext(UserContext)
    
    const [useremail,setUserEmail] = useState("")
    const [password,setUserPassword] = useState("")
    const [redirect,setRedirect] = useState(false)
    const [err,setErr] = useState(null)
    const login = async (e) => {
        e.preventDefault();
        console.log("login successfull")
        
        try {
          const res = await axios.post('/api/v1/auth/login',{useremail,password},{
            withCredentials:true
          })
          console.log(res)
          if(res.status === 200){
            toast.success('Successfully Login', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              console.log(res.data)
             
              setUserInfo(res.data)
              setRedirect(true)
             
             
            
              }
         

          } catch (error) {
          
          const {data} = error.response
          setErr(data.msg)
          
        }

        
    }
    if(redirect){
      setTimeout(()=>{
        return navigate('/')
      },3000)
    }

  return (
    
    <form className="form login" onSubmit={login}>
        <h1>Login</h1>
        <input type="text" name="useremail" placeholder="useremail" value={useremail} onChange={e=>setUserEmail(e.target.value)} required/>
        <input type="password" name="password" placeholder="password" value={password} onChange={e=>setUserPassword(e.target.value)} required/>
        <span style={{color:"red"}}>{err}</span>
        <button type="submit" className="btn login">Login</button>
        <ToastContainer />

       
    </form>
  )
}

export default LoginPage