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
app.use(bodyParser.json({ type: 'application/*+json', limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(cors()); // Add CORS middleware

app.use(cors({
    origin: '*'
}));


// Routes
const registerRoute = require('./src/api/register');
const loginRoute = require('./src/api/login');
const logoutRoute = require('./src/api/logout');
const formRoute = require('./src/api/form');
const doctorsDetails = require('./src/api/doctos');
const uploadImage = require('./src/api/uploadImage');
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/forms', formRoute);
app.use('/doctors', doctorsDetails);
app.use('/upload', uploadImage);
app.listen(3000, () => console.log('Server running on port 3000'));