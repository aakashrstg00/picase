const express = require('express');
let router = express.Router();
const path = require('path');
const User = require('../models/user');

// register
router.post('/register',(req,res)=>{
    console.log('[USER] Register User called!');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: "Failed to register user"
            });
        } else {
            res.json({
                success: true,
                message: "User Registered"
            });
        }
    });
});
router.post('/authenticate',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({
                success: false,
                msg: "User not found"
            });
        }
        if(user){
            User.comparePassword(password,user.password,(err,isMatch)=>{
                if(err){
                    throw err;
                }
                if(isMatch){
                    res.json({
                        success: true,
                        user:{
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            posts: user.posts
                        }
                    });
                }
                else{
                    res.json({
                        success: false,
                        msg: 'Wrong Password!'
                    });
                }
            });
        }
    });
});
router.get('/profile/:id',(req,res)=>{
    res.json({
        success:true,
        msg: 'Area under Work!'
    });
});
// export
module.exports = router;