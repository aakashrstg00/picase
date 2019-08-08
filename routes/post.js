const express = require('express');
let router = express.Router();
const path = require('path');
let jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
// const middleware = require('./middleware');

// register
router.post('/register', (req, res) => {
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
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password);

    if (username && password) {
        User.getUserByUsername(username, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.json({
                    success: false,
                    msg: "User not found"
                });
            }
            if (user) {
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        let token = jwt.sign({
                                username: username
                            },
                            config.secret, {
                                expiresIn: '2000h' // expires in 2000 hours
                            }
                        );
                        // return the JWT token for the future API calls
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });
                    } else {
                        res.status(403).json({
                            success: false,
                            message: 'Incorrect username or password'
                        });
                    }
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
});
router.get('/profile/:id', (req, res) => {
    res.json({
        success: true,
        msg: 'Area under Work!'
    });
});
// export
module.exports = router;