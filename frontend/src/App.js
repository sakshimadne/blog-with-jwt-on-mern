import React, { useState ,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

const App = () => {
  const [token, setToken] = useState('')
useEffect(() => {
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    setToken(storedToken)
  }
}, [])
  const handleLogin = (token) => {
    setToken(token)
  }

  return (
    <Router>
      <div>
        <h1>Blog Platform</h1>
        {!token ? (
          <>
            <RegisterForm />
            <LoginForm onLogin={handleLogin} />
          </>
        ) : (
          <>
            <BlogList token={token} />
            <BlogForm token={token} />
          </>
        )}
      </div>
    </Router>
  )
}

export default App
