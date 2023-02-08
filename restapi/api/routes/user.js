const express = require("express");
const router = express.Router();
const mongooes = require("mongoose");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// router.get('/', (req,res,next)=>{
//     res.status(200).json({
//         meassage:"User route working"
//     })
// })

router.post('/signup', (req,res,next) =>{
    bcrypt.hash(req.body.password,10,(err, hash) =>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }else{
            const user = new User({
                _id: new mongooes.Types.ObjectId,
                // username : String,
                // password : String,
                // phone:Number,
                // email:String,
                // userType:String,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.usertype
            })

            user.save().then(result=>{
                res.status(200).json({
                    new_user:result
                })
            }).catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
});


router.post('/login', (req,res,next)=>{
    User.find({username:req.body.username}).exec().then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                msg:"User Not found"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
               return res.status()
            }
            if(result){
                const tocken = jwt.sign({                    
                    username:user[0].username,
                    userType:user[0].userType,
                    phone:user[0].phone,
                    email:user[0].email
                },
                'this is dummey data',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    userType:user[0].userType,
                    phone:user[0].phone,
                    email:user[0].email,
                    tocken:tocken
                })
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            err:err
        })
    })
})


module.exports = router;
