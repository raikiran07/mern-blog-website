const {UnauthenticatedError,
    NotFoundError,
    BadRequestError} = require('../Errors') 
const {StatusCodes} = require('http-status-codes')

const jwt = require('jsonwebtoken')


const authMiddleware = async (req,res,next) => {
  
    const {token} = req.cookies
    console.log("token:"+token)
   
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = {userId:payload.userId,username:payload.username}
       
        next()
        
    } catch (error) {
        res.status(400).json({msg:`Not authorized`})
    }
    

    
}

module.exports = authMiddleware