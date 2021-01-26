require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const connect = require('./config/connect');

const app = express()

// connect database
connect()

// allow json format
app.use(express.json())


app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/api/url'));

// handle errors
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

// listen the reqests at custom PORT or default 5000
const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`.green));

process.on('unhandledRejection', (err, _promise) => {
    console.log(`Error message: ${err.message}`.red)
    server.close(() => process.exit(1))
})