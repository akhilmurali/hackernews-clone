let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    username:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    firstname:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    salt:{
        type: String
    }
});


var User = mongoose.model('User', userSchema);
module.exports = User;