'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    rating: { type: Number, required: true },
    content: { type: String, required: true, default: "" },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }
});

const PlaceSchema = Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    lon: { type: String, required: true },
    lat: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Place', PlaceSchema);