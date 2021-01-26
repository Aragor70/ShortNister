const express = require('express');
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();


//route GET    api/url
//description  test route
//access       private
router.get('/', asyncHandler( async(req, res, next) => {
    
    const error = true

    if (error) {
        return next(new ErrorResponse('error message', 422))
    }

    res.json('success')
}));

module.exports = router;