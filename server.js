const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const cors = require('cors')
// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})



