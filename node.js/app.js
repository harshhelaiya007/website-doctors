const express = require('express');
const app = express();
const signUpRoute = require('./api/routes/signUp');
const loginRoute = require('./api/routes/login');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect
mongoose.connect('mongodb+srv://harshhelaiya5:Justin%40007@cluster0.eyqbbzz.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',error => {
    console.log('Connection Faild')
});

mongoose.connection.on('connected', connected => {
    console.log('connection successful')
});

app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json())

// sign up
app.use('/signUp', signUpRoute);

// login
app.use('/login', loginRoute);

app.use((req,res,next)=>{
    res.status(404).json({
        error:'Bad Request'
    })
})

module.exports = app;