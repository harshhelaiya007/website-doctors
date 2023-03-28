const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const path = require('path');



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
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ type: 'application/*+json', limit: '50mb' }));
app.use(cors()); // Add CORS middleware

app.use(cors({
    origin: '*'
}));



// app.get('/assets/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend','assets' ))
// })

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
app.listen(80, () => console.log('Server running on port 80'));



app.use(express.static('frontend/'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
})