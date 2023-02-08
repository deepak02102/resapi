const express = require("express");
const router = express.Router();
const Student = require('../model/student');
const mongooes = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary');

// router.get('/', (req,res,next) => {

//     Student.find().then(result =>{
//         res.status(200).json({
//             studentData: result
//         }).catch(err=>{
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         })
// })
// })

// Configuration 
cloudinary.config({
    cloud_name: "djve87nim",
    api_key: "718452538422862",
    api_secret: "f7omH9VV-He5BhTd2eTu3j4NiQ8"
  });

router.get('/', checkAuth, (req,res,next)=>{
    Student.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            Student:result
        })
    })
})

router.get('/:id', (req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id).then(result =>{
        res.status(200).json({
            student:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

router.delete('/:id', (req,res,next)=>{
    Student.remove({_id:req.params.id}).then(result=>{
        res.status(200).json({
            meassage:"Student Id Remove",
            result:result
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    })
});

router.put('/:id', (req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id}, {
        $set:{
            name:req.body.name,
            email:req.body.email,
            mobile_number:req.body.mobile_number,
            gender:req.body.gender,
            age:req.body.age  
        }
    }).then(result=>{
        res.status(200).json({
            student_update:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.post('/', (req,res,next) => {
    const student = new Student({
        _id:new mongooes.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        mobile_number:req.body.mobile_number,
        gender:req.body.gender,
        age:req.body.age
    });

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;