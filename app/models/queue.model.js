const mongoose = require('mongoose')

const requestQueueSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    operationType: {
        type: mongoose.Schema.Types.Mixed
    }
});

module.exports = mongoose.model('requestQueueSchema', requestQueueSchema)