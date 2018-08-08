let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    article_url:{
        type: String,
        required: true,
        trim:true
    },
    comments:{
        type: Array,
        default: []
    },
    posted_At:{
        type: String,
        default: Date.now();
    },
    uid:{
        type: String,
        required: true,
        trim: true
    },
    up_votes: {
        type: Number,
        default: 0
    },
    down_votes:{
        type: Number,
        default: 0
    }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;