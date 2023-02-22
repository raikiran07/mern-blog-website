import React from 'react'
import {useState} from 'react'

const Footer = () => {
    const [email,setEmail] = useState(null)
    const [msg,setMsg] = useState('')
    const connectForm = (e) =>{
        e.preventDefault();
        console.log("form submitted")
        setMsg('')
    }
  return (
    <footer className="footer">
        <div className="socials">
            <div className="social-icons">
            <a href="#">
                <img src="" className="social-icon" alt="linkedIn"/>
            </a>
            <a href="#">
            <img src="" className="social-icon" alt="Github"/>
            </a>
            <a href="#">
            <img src="" className="social-icon" alt="twitter"/>
            </a>
            </div>
            <p className="copyright">&#169; raikiran</p>
            

        </div>
        <div className="contact">
            <form onSubmit={connectForm}>
            <input type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="text" className="textarea" placeholder="enter message" value={msg} onChange={e=>setMsg(e.target.value)} required />
            <button className="btn submit">Connect</button>
            </form>
            
        </div>
    </footer>
  )
}

export default Footer