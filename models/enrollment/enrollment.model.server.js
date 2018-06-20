var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
    return enrollmentModel.find({student: studentId}).populate('section').exec();
}

function deleteEnrollment(sectionId,studentId){
    return enrollmentModel.remove({section: sectionId, student:studentId})
}

function findEnrollmentsForSection(sectionId) {
    return enrollmentModel.find({sectionId: sectionId})
}

var api = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    deleteEnrollment: deleteEnrollment,
    findEnrollmentsForSection: findEnrollmentsForSection
}

module.exports = api;