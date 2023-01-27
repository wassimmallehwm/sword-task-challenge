const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    performed: {
        type: Boolean,
        default: false
    },
    performedAt: {
        type: Date
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);