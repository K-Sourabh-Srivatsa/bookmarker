const mongoose = require('mongoose');
const user = require('./users');

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
    },
});

const Tags = mongoose.model('tags', tagSchema);

module.exports = Tags;