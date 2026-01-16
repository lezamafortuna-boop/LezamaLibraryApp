const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },
    publisher: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    unitsSold: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };