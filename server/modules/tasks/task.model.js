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
    isPerformed: {
        type: Boolean,
        default: false
    },
    performedAt: {
        type: Date
    }
    
}, {
    timestamps: true
});

TaskSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TaskSchema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Task', TaskSchema);