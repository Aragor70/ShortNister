const express = require('express');
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../tools/ErrorResponse');
const router = express.Router();
const validUrl = require('valid-url');
const { customAlphabet } = require('nanoid');
const Url = require('../../models/Url');




//route GET    api/urls/
//description  get top 3 list of urls
//access       public
router.get('/', asyncHandler( async(req, res, next) => {

    
    const urlAddresses = await Url.find().sort({ date: -1 }).limit(3);
    
    return res.json(urlAddresses)
    
}));

//route GET    api/urls
//description  get single url statisctics
//access       public
router.get('/:code', asyncHandler( async(req, res, next) => {
    
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
//access       public
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
        
        if (!customCode.match(/^[0-9a-zA-Z]+$/)) {
            return next(new ErrorResponse('Please enter alphanumeric value.', 422))
        }

    } else {
        const nanoid = await customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIKLMNOPQRSTVXYZ", 6)
        
        shortCode = await nanoid()
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