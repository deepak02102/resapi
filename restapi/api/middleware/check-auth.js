const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
   try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verfy = jwt.verify(token, 'this is dummey data')
    next();
   }
   catch(err){
    return res.status(401).json({
        msg:"invlide token"
    })
   }
}