// Import required modules
require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
// Import user model
const User = require('../model/user');

// Create router instance
const router = express.Router();

// Define user registration endpoint
router.post('/', [
  // Validate user input
  check('username', 'Please enter a valid username').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  console.log(req.body)
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user input from request body
  const { username, email, password, region, hq, fsoname } = req.body;

  try {
    // Check if user with given email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user object with hashed password
    user = new User({
      username,
      email,
      region,
      hq,
      fsoname,
      password: await bcrypt.hash(password, 10)
    });

    // Save new user object to database
    await user.save();

    // Generate JSON Web Token
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '1h' });

    // Return success response with JWT and user information
    res.json({ token, user: { user }, registerd: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Export router
module.exports = router;
