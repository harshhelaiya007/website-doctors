const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../model/user');

const router = express.Router();

router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('token', 'Please provide a valid token').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, token } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', (err, decoded) => {
            if (err) {
                return res.status(400).json({ msg: 'Invalid token' });
            }
            if (decoded.user.id !== user.id) {
                return res.status(400).json({ msg: 'Token does not belong to user' });
            }
            // revoke or delete token here
            res.json({ msg: 'User logged out',logout:true });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
