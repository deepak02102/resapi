const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) =>{
    res.status(200).json({
        msg : "This is Faculty Get Response 200"
    })
})

router.post('/', (req,res,next) =>{
    res.status(200).json({
        msg : "This is Faculty Post Response 200"
    })
})


    

module.exports = router;