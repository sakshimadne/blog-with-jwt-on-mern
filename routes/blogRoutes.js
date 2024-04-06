const express = require('express')
const router = express.Router()
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController')
const { protect } = require('../middlewares/authMiddleware')

// router.post('/', authMiddleware.protect, blogController.createBlog)
// router.get('/', blogController.getAllBlogs)
// router.get('/:id', blogController.getBlog)
// router.put('/:id', authMiddleware.protect, blogController.updateBlog)
// router.delete('/:id', authMiddleware.protect, blogController.deleteBlog)

router.post('/', protect, createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.put('/:id', protect, updateBlog)
router.delete('/:id', protect, deleteBlog)

module.exports = router
