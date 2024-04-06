import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/blogs'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}


export const getAllBlogs = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(BASE_URL, blogData, config)
  return response.data
}

export const updateBlog = async (blogId, blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${BASE_URL}/${blogId}`, blogData, config)
  return response.data
}

export const deleteBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  await axios.delete(`${BASE_URL}/${blogId}`, config)
}
