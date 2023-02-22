const multer  = require('multer')
const uploadMiddleware = multer({ dest: './uploads' })
const authMiddleware = require('../Middleware/auth')

const {getAll,getSingleBlog,createBlog,updateBlog,deleteBlog,myPost} = require('../Controller')

const router = require('express').Router()

router.route('/').get(getAll).post(authMiddleware,uploadMiddleware.single('file'),createBlog)
router.route('/mypost').get(authMiddleware,myPost)
router.route('/:id').get(getSingleBlog).put(uploadMiddleware.single('file'),authMiddleware,updateBlog).delete(authMiddleware,deleteBlog)

module.exports = router