require("dotenv").config();
const express = require('express');
const app = express();
const signUpRoute = require('./api/routes/signUp');
const loginRoute = require('./api/routes/login');
const formsRoute = require('./api/routes/form');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors") //Newly added

// connect
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI);

mongoose.connection.on('error', error => {
    console.log('Connection Faild')
});

mongoose.connection.on('connected', connected => {
    console.log('connection successful')
});

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(cors()) // Newly added

// sign up
app.use('/signup', signUpRoute);

// login
app.use('/login', loginRoute);

// forms
app.use('/forms', formsRoute);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request'
    })
})


module.exports = app;