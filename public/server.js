const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Connect to database
mongoose.connect('mongodb+srv://harshhelaiya5:Justin%40007@cluster0.eyqbbzz.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error', error => {
    console.log('Connection Faild')
});

mongoose.connection.on('connected', connected => {
    console.log('connection successful')
});

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors()); // Add CORS middleware

app.use(cors({
    origin: '*'
}));

// Routes
const registerRoute = require('./api/register');
const loginRoute = require('./api/login');
const logoutRoute = require('./api/logout');
const formRoute = require('./api/form');
const doctorsDetails = require('./api/doctos');
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/forms', formRoute);
app.use('/doctorGet', doctorsDetails);
app.listen(4001, () => console.log('Server running on port 3000'));
