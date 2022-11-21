const express = require('express');
const cors = require('cors');
const register_login = require('./routes/jwtAuth');
const books = require('./routes/books');
const dashboard = require('./routes/dashBoard');
const results = require('./routes/results')
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());;

// Register and Login routes
app.use('/auth', register_login);

// Book Data Route
app.use('/books', books);

// Dashboard Route
app.use('/dashboard', dashboard);

app.use('/results', results);

const PORT = process.env.PORT || 8000;



app.listen(PORT, ()=> console.log(`Server running on port ${PORT}...`));