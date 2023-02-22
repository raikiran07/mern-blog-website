
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please enter title'],
        maxlength:50
    },
    summary:{
        type:String,
        require:[true,'Please enter summary']
    },
    body:{
        type:String,
        required:[true,'Please enter body'],
        
    },
    cover:{
        type:String,
        required:[true,'please add cover image']
    },
    author:{
    type:mongoose.Types.ObjectId,
    ref:'Blog-User',
    required:[true,'Please provide user']
}
 
   
},{timestamps:true})


module.exports = mongoose.model('Blogs',blogSchema)


