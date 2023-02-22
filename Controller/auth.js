const User = require('../Model/User')
const { UnauthenticatedError, NotFoundError, BadRequestError} = require('../Errors')
const {StatusCodes} = require('http-status-codes')

const register = async(req,res) => {
    try {

        const user = await User.create(req.body);
        if(!user){
            return res.status(StatusCodes.BadRequestError).json("bad request")
        }
        
        res.status(StatusCodes.OK).json({user})
        
    } catch (error) {
        if(error.code && error.code == 11000){
            return   res.status(StatusCodes.BAD_REQUEST).json({
                success:false,msg:'email already registered, login to your account'
            })
        }

        // if(error.name === 'ValidationError'){
        //    const msg =  Object.values(error.errors).map(item=>item.message).join(',')
        //     res.status(400).json({msg})
           
        //   }
        res.status(StatusCodes.BAD_REQUEST).json(error)

    }
   
}


const login = async (req,res) => {
    try {

    const {useremail,password} = req.body
    
    const user = await User.findOne({useremail})
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:`No user with email ${useremail}`})
    }
    const comparePassword = await user.comparePassword(password)
    if(!comparePassword){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:`incorrect password`})
    }
    const {_id:userId,username} = user
    const token = user.createJWT()
    
    res.cookie('token',token).status(StatusCodes.OK).json({userId,username,msg:`successfully login`})
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
    
}

const logout = (req,res) => {
    try {
        const {token} = req.cookies
        // console.log("token:"+token)
       res.clearCookie("token")
       return res.status(StatusCodes.OK).json({msg:`succefully logout`})
    } catch (error) {
        // console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'something went wrong'})
    }
}


module.exports = {login,register,logout}