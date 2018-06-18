var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    sectionName: String,
    seats: Number,
    courseId: Number
}, {collection: 'section'});

module.exports = sectionSchema;