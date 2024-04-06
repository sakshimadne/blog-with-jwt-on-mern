const Blog = require('../models/blogModel')

// create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body
    const blog = new Blog({
      title,
      content,
      author: req.user._id,
    })
    await blog.save()
    res.status(201).json(blog)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username')
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single blog post
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      'author',
      'username'
    )
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    blog.title = req.body.title || blog.title
    blog.content = req.body.content || blog.content
    await blog.save()
    res.json(blog)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    await blog.remove()
    res.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog }
