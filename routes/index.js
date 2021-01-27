const express = require('express');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../tools/errorResponse');
const router = express.Router();
const Url = require('../models/Url');

//route GET    api/url
//description  redirect from short URL to original URL
//access       private
router.get('/:code', asyncHandler( async(req, res, next) => {
    
    const { code } = req.params;

    const urlAddress = await Url.findOne({ urlCode: code });

    if (!urlAddress) {
        return next(new ErrorResponse('Address not found', 404))
    }

    urlAddress.views += 1

    await urlAddress.save()


    return res.redirect(urlAddress.longUrl)
    
}));

//route GET    api/url/stats
//description  get url statisctics 
//access       private
router.get('/:code/stats', asyncHandler( async(req, res, next) => {
    
    const { code } = req.params;

    const urlAddress = await Url.findOne({ urlCode: code });

    if (!urlAddress) {
        return next(new ErrorResponse('Address not found', 404))
    }
    
    return res.json(urlAddress)
    
}));

module.exports = router;