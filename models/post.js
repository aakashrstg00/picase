const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema
const PostSchema = mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    image:{
        type: String
    },
    likes:{
        type: Array
    },
    comments:{
        type: Array
    },
    timestamp: {
        required: true
    },
    location:{
        type: String
    }
});

var Post = module.exports = PostSchema;