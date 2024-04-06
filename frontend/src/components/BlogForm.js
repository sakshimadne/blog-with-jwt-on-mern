import React, { useState } from 'react'
import { createBlog } from '../api/blogApi'

const BlogForm = ({ token }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createBlog({ title, content }, token)
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='content'>Content:</label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
