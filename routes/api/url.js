const express = require('express');
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require('../../models/Url');


//route POST    api/url
//description  test route
//access       private
router.post('/', asyncHandler( async(req, res, next) => {
   
    const { longUrl, customUrl } = req.body;

    let shortCode;

    let urlAddress = await Url.findOne({ longUrl })

    if (urlAddress) {
        return res.json(urlAddress)
    }

    if (!validUrl.isUri(longUrl)){
        return next(new ErrorResponse('Please enter valid URL address', 422))
    }
    if (customUrl && customUrl.length < 4){
        return next(new ErrorResponse('Please enter short URL at least 4 characters long', 422))
    }

    if (customUrl) {
        shortCode = customUrl
    } else {
        shortCode = nanoid(6)
    }

    const newAddress = process.env.Base_Url + '/' + shortCode

    urlAddress = new Url({
        urlCode: shortCode,
        longUrl,
        shortUrl: newAddress
    })

    await urlAddress.save()
    

    return res.json(urlAddress)
}));


module.exports = router;