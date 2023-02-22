const {register,login,logout} = require('./auth')
const {getAll,getSingleBlog,createBlog,updateBlog,deleteBlog,myPost} = require('./blog')


module.exports = {getAll,getSingleBlog,createBlog,updateBlog,deleteBlog,login,register,logout,myPost}