const Blog = require('../Model/Blog')
const fs = require('fs')
const {StatusCodes} = require('http-status-codes')




const getAll = async (req,res) => {
    console.log("hello from get all")
    try {

        res.json(await Blog.find({}).populate('author',['username']))
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
   
  
    
   
}

const createBlog = async (req,res) => {
   
    const name = req.file.originalname
    const parts = name.split('.')
    const ext = parts[parts.length-1]
    const path = req.file.path
    const newPath = path+'.'+ext
    fs.renameSync(path,newPath)
    // console.log(req.body)
    const blog = await Blog.create({...req.body,cover:newPath,author:req.user.userId})
    res.json(blog)
}

const getSingleBlog = async (req,res) => {
    
    try {
        // console.log("get single blog route")
        const {id} = req.params 
        const blog = await Blog.findById(id).populate('author',['username'])
        if(!blog){
           return res.status(StatusCodes.BAD_REQUEST).json({msg:`No blog post with id ${id}`})
        }

        res.status(StatusCodes.OK).json(blog)
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:`Something went wrong, try again`})
    }
}

const myPost = async (req,res) => {
    try {

        const {userId} = req.user
        const blogs = await Blog.find({author:userId})
       return res.status(StatusCodes.OK).json(blogs)
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:`something went wrong`})
    }
  
}

const updateBlog = async (req,res) => {
    try {
        // console.log("update blog route")
        const {id} = req.params
        let newPath = null;
        if (req.file) {
          const {originalname,path} = req.file;
          const parts = originalname.split('.');
          const ext = parts[parts.length - 1];
          newPath = path+'.'+ext;
          fs.renameSync(path, newPath);
        }

        const {title,summary,body} = req.body;
        const blog = await Blog.findById(id)

        await blog.update({
            title,
            summary,
            body,
            cover:newPath ? newPath : blog.cover
        })
      
       
        
        res.status(StatusCodes.OK).json(`msg:successfully updated`)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:`something went wrong`})
    }
}

const deleteBlog = async (req,res) => {
    try {
        const {id} = req.params
        const blog = await Blog.findOneAndDelete({_id:id})
        res.status(StatusCodes.OK).json({blog})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:`something went wrong`})
    }
}

module.exports = {getAll,getSingleBlog,createBlog,updateBlog,deleteBlog,myPost}
