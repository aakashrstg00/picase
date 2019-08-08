const express = require('express');
let router = express.Router();
const path = require('path');
const middleware = require('../middleware');

// home page
router.get('/',middleware.checkToken,(req,res)=>{
    // res.sendFile(path.join(__dirname,'../public/index.html'));
    console.log(req.decoded);
    res.json({
        message: 'Valid Token, Welcome ' + req.decoded.username
    });
});
// export
module.exports = router;