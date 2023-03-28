const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../model/User');

const router = express.Router();

const adminUsername = 'admin@gmail.com';
const adminPassword = 'Admin@123';

router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const hashedPassword = user.password;

        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch)
        console.log(password)
        console.log(hashedPassword)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '1h' });

        if (email === adminUsername && password === adminPassword) {
            res.set('Authorization', 'Bearer ' + token);
            return res.status(200).json({ message: 'Login successful', admin:true });
        }
        res.json({ token, user: { user }, loggedIn: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
