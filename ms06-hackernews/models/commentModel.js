let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    username:{
        type: String,
        trim: true,
        required: true
    },
    comment:{
        type: String,
        required: true,
        trim:true
    },
    posted_At:{
        type: String,
        default: Date.now()
    },
    postid:{
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

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;