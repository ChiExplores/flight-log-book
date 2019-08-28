const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: String,
    email: String,
    googleId: String
    },{
    timestamps: true
    });

 

module.exports = mongoose.model('Student', studentSchema);