const express = require('express');
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require('../../models/Url');




//route GET    api/urls/
//description  get top 3 list of urls
//access       private
router.get('/', asyncHandler( async(req, res, next) => {

    
    const urlAddresses = await Url.find().sort({ date: -1 }).limit(3);
    
    return res.json(urlAddresses)
    
}));

//route GET    api/urls/stats
//description  get url statisctics 
//access       private
router.get('/:code/stats', asyncHandler( async(req, res, next) => {
    
    const { code } = req.params;

    const urlAddress = await Url.findOne({ urlCode: code });
    console.log(urlAddress)
    if (!urlAddress) {
        return next(new ErrorResponse('Address not found', 404))
    }
    
    return res.json(urlAddress)
    
}));

//route POST   api/urls
//description  post new URL address
//access       private
router.post('/', asyncHandler( async(req, res, next) => {
   
    const { longUrl, customCode } = req.body;

    let shortCode;

    if (!validUrl.isUri(longUrl)){
        return next(new ErrorResponse('Please enter valid URL address.', 422))
    }
    if (customCode && customCode.length < 4){

        return next(new ErrorResponse('Please enter short URL at least 4 characters long.', 422))
    }

    if (customCode) {
        shortCode = customCode
    } else {
        shortCode = nanoid(6)
    }

    let isMatch = await Url.findOne({ urlCode: shortCode })
    if (isMatch) {
        return next(new ErrorResponse('Your code already exists. Please enter the new one.', 422))
    }

    const newAddress = process.env.Base_Url + '/' + shortCode

    const urlAddress = new Url({
        urlCode: shortCode,
        longUrl,
        shortUrl: newAddress
    });

    await urlAddress.save()
    

    return res.json({success: true, urlAddress})
}));


module.exports = router;