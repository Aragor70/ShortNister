require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const conn = require('./config/connect');
const app = express()

// static folder
app.use(express.static('client/build'))

// connect database
conn.connect()

// allow json format
app.use(express.json())

const index = app.use('/', require('./routes/index'));
const urls = app.use('/api/urls', require('./routes/api/urls'));

// handle errors
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {

    // get index directory
    app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
}


const PORT = process.env.PORT || 5000;

// listen the reqests at custom PORT or default 5000
const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`.green));

process.on('unhandledRejection', (err, _promise) => {
    console.log(`Error message: ${err.message}`.red)
    server.close(() => process.exit(1))
})

module.exports = { index, urls }