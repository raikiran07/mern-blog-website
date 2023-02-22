import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../ContextData/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {
  const navigate = useNavigate()
  const {setUserInfo,userInfo} = useContext(UserContext) 
  useEffect( ()=>{
    axios.get('/profile',{
      withCredentials:true
    }).then(res=>{
      const {username:name,userId} = res.data
      setUserInfo(userInfo)
    }) 
  },[])

  const logout = async () => {
    try {
      // const res = await axios.post('http://localhost:4000/api/v1/auth/logout',{
      //   withCredentials:true,
        
      // })
      const res = await fetch('/api/v1/auth/logout',{
        credentials:'include',
        method:'POST'
      })
     
      if(res.status === 200){
        const data = await res.json()
        toast.success('Successfully Logout', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      
      setUserInfo(null);
      setTimeout(()=>{
        navigate('/')
      },3000)
     
      }
      else{
        toast.error('Something went wrong', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      
      }

      

      
      
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const username = userInfo?.username

  return (
    <header>
    <Link className="logo" to="/">IWrite</Link>
    <nav>
      {
        username && (
          <>
         
          <Link to='/create'>Create Blog</Link>
          <Link to='/post/mypost'>MyPost</Link>
          <a onClick={logout}>LogOut</a>
          <h3 className="user-info-heading">Hi,{username}</h3>
          </>
        )
      }
      {
        !username && (<>
              
     <Link to="/login">Login</Link>
     <Link to="/register">Register</Link>
        </>)
        
      }

      <ToastContainer/>
   
    </nav>
  </header>
  )
}

export default Header