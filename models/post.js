const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema
const PostSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array
    },
    timestamp: {
        required: true
    },
    location: {
        type: String
    }
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostById = (id, callback) => {
    Post.findById(id, callback);
}

module.exports.createPost = (post, callback) => {
    post.save(callback);
}

module.exports.deletePost = (postid, callback) => {
    Post.findByIdAndDelete(postid,callback);
}

module.exports.updatePostContent = (postid, updatedText, callback) => {
    Post.findOneAndUpdate(postid,{
        $set: {
            text: updatedText
        }
    },callback);
}

module.exports.likePost = (postid, uname, callback) => {
    Post.findOneAndUpdate(postid, {
        $push: {
            likes: {
                username: uname
            }
        }
    }, callback);
}

module.exports.unlikePost = (postid, uname, callback) => {
    Post.findOneAndUpdate(postid, {
        $pull: {
            likes: {
                username: uname
            }
        }
    }, callback);
}

module.exports.addCommentToPost = (postid, comm, callback) => {
    Post.findOneAndUpdate(postid, {
        $push: {
            comments: comm          //comm={username, comment}
        }
    }, callback);
}

module.exports.removeCommentFromPost = (postid, comm, callback) => {
    Post.findOneAndUpdate(postid, {
        $pull: {
            comments: comm          //comm={username, comment}
        }
    }, callback);
}