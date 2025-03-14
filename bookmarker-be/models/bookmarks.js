const mongoose = require('mongoose');
const user = require('./users');

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
    }
}, { timestamps: true});

const Bookmarks = mongoose.model('bookmarks', bookmarkSchema);

module.exports = Bookmarks;