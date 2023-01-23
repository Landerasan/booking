const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    isActive: {
        required: true,
        type: Boolean
    }
});

module.exports = mongoose.model('User' , userSchema)