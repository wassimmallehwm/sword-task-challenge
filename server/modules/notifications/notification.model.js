const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);