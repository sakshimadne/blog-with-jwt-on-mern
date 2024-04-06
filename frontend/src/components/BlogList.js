import React, { useEffect, useState } from 'react'
import { getAllBlogs, deleteBlog } from '../api/blogApi'

const BlogList = ({ token }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog._id !== blogId))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Author: {blog.author?.username || 'Unknown'}</p>
            {token && (
              <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
