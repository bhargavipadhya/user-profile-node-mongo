var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
    section: {type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel'},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    grade: {type: String, default:'A'}
}, {collection: 'enrollment'});

module.exports = enrollmentSchema;