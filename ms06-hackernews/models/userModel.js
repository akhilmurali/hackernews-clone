let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = new Schema({
    username:{
        trim: true,
        required: true,
        unique: true
    },
    password:{
        required: true,
        trim:true
    },
    firstname:{
        required: true,
        trim: true
    },
    lastname:{
        required: true,
        trim: true
    }
});

module.exports = User;