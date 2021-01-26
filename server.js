require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const colors = require('colors')
const errorHandler = require('./middlewares/error')

const app = express()

app.use(express.json())


app.use('/api/url', require('./routes/api/url'));

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`.green));

process.on('unhandledRejection', (err, _promise) => {
    console.log(`Error message: ${err.message}`.red)
    server.close(() => process.exit(1))
})