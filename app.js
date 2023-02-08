
const express = require("express");
const mongooes = require("mongoose");
const studentRouet = require('./api/routes/student');
const facultyRouet = require('./api/routes/faculty');
const userroute = require('./api/routes/user');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');

mongooes.connect('mongodb+srv://scram:scram@sbs.uq9pdq5.mongodb.net/?retryWrites=true&w=majority');

mongooes.connection.on('error', err =>{
    console.log('Connection Failed');
});

mongooes.connection.on('connected', connected =>{
    console.log('Connected With Database');
});

app.use(fileUpload({
    useTempFiles:true
}))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student', studentRouet);
app.use('/faculty', facultyRouet);
app.use('/user', userroute)

// app.use((req,res,next) => {
//     res.status(200).json({
//         message : "App is Runing"
//     });
// });

app.use((req,res,next) => {
    res.status(404).json({
        error : "Page Not Found"
    })
})

module.exports = app;