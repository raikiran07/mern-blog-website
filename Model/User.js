const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    "username":{
        type:String,
        required:[true,'enter valid user name'],
        minLength:3
    },
    "useremail":{
        type:String,
        required:[true,'enter valid user email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:5

    }
    
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, username: this.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }

  UserSchema.methods.comparePassword = async function(rawpassword){
    const isCorrect = await bcrypt.compare(rawpassword,this.password)
    return isCorrect
    
    
  }
  
module.exports = mongoose.model('Blog-User',UserSchema)