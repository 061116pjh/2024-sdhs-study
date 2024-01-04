const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('Post', postSchema);