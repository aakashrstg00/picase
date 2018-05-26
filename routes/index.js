const express = require('express');
let router = express.Router();
const path = require('path');

// home page
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});
// export
module.exports = router;