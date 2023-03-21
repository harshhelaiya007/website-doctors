const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        msg:'login working get'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        msg:'login working post'
    })
})

module.exports = router;