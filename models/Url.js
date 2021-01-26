const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        minLength: [4, 'Please enter URL at least 4 characters long']
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Url = mongoose.model('Url', UrlSchema);