const mongoose = require('mongoose');


const UrlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        minLength: 4
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Url = mongoose.model('Url', UrlSchema);