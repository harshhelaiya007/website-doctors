require("dotenv").config();
require("./config/database").connect();
const express = require("express");
var bcrypt = require('bcryptjs');
const auth = require("./middleware/auth");
const jwt = require('jsonwebtoken');
const cors = require("cors") //Newly added


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // Newly added

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());
app.use(express.json())

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // for some legacy browsers
}

app.get('/welcome', cors(corsOptions), auth, async(req, res) => {
    res.status(200).send({
        user: req.body,
        Message: 'LoginedIn',
    });
});

// Logic goes here

// importing user context
const User = require("./model/user");

app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { userName, email, hq, fsoName, region, password } = req.body;

        const user = await User.create({
            userName: userName,
            email: email,
            region: region, 
            hq: hq,
            fsoName: fsoName,
            password: password,
          });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        // save user token
        user.token = token;

        console.log(user);

        // return new user
        res.status(201).json({
            user,
            register: true
        });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


module.exports = app;