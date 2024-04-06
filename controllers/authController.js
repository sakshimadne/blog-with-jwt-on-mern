const User = require('../models/userModel')
const jwt = require('jsonwebtoken') 


// register user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = new User({ username, password })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = { registerUser, loginUser }
