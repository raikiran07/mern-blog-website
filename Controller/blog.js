const Blog = require('../Model/Blog')
const fs = require('fs')
const {StatusCodes} = require('http-status-codes')
const cloudinary = require('../cloudinary/connect')




const getAll = async (req,res) => {
    // console.log("hello from get all")
    try {

        res.json(await Blog.find({}).populate('author',['username']))
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
   
  
    
   
}

const createBlog = async (req,res) => {
   
    
    try {
        const {title,summary,body,file:image} = req.body
        const result = await cloudinary.uploader.upload(image,{
            folder:"Blog"
        })

        const blog = await Blog.create({
            ...req.body,
            
            cover: {
                public_id: result.public_id,
                url: result.secure_url
            },
            author:req.user.userId
            
        });

        res.status(201).json(blog)

    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
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
       
        const {title,summary,body,file} = req.body;
        const blog = await Blog.findById(id)
        
        
       let result

        if (file !== '') {
          
                result = await cloudinary.uploader.upload(file, {
                public_id: blog.cover.public_id,
                overwrite: true,
                invalidate:true
              });
 
        }

        const upBlog = await Blog.findOneAndUpdate({_id:id},{title,summary,body,cover:result ? { 
                        public_id: result.public_id,
                        url: result.secure_url
                    } : blog.cover},{new:true})

        res.status(StatusCodes.OK).json({msg:"success",blog:upBlog})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

const deleteBlog = async (req,res) => {
    try {
        const {id} = req.params
        const blog = await Blog.findOneAndDelete({_id:id})
        await cloudinary.uploader.destroy({public_id:blog.cover.public_id,overwrite: true,
            invalidate:true})
        res.status(StatusCodes.OK).json({blog})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error.message})
    }
}

module.exports = {getAll,getSingleBlog,createBlog,updateBlog,deleteBlog,myPost}
