const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
require('express-async-errors')
const mongoose =  require('mongoose')
mongoose.set('strictQuery', false)   
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken')
const path = require('path')

// app.set('trust proxy', 1);
app.use(cors())
// app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));

//database connection
const connectDB = require('./db/connection')

//importing the router
const authRouter = require('./Route/auth')
const blogRouter = require('./Route/blog')

//importing middleware
// const authMiddleware = require('./Middleware/auth')

const PORT = process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.json("hello from root")
})

app.get('/test',(req,res)=>{
    res.json("hello from api")
})



app.get('/api/profile',(req,res)=>{
    const {token} = req.cookies
    const user = jwt.verify(token,process.env.JWT_SECRET)
    
    res.json(user)
})



app.use('/api/v1/auth',authRouter)
app.use('/api/v1/blog',blogRouter)


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });












const start = async () => {
   
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`app is running on port number ${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}


start()
