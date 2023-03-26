require("dotenv").config();
require("./config/database").connect();
const express = require("express");
var bcrypt = require('bcryptjs');
const auth = require("./middleware/auth");
const jwt = require('jsonwebtoken');
const cors = require("cors") //Newly added


const app = express();
app.use(cors()) // Newly added

app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
    //allow access to current url. work for https as well
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.removeHeader('x-powered-by');
    //allow access to current method
    res.setHeader('Access-Control-Allow-Methods', req.method);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // for some legacy browsers
}

app.get('/welcome', cors(corsOptions), auth, (req, res) => {
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
        const { username, email, region, hq, fsoname, password } = req.body;

        const user = await User({
            username: username,
            email: email,
            region: region,
            hq: hq,
            fsoname: fsoname,
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