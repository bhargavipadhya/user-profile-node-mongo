module.exports = function (app){
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment' , enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete("/api/student/section/:sectionId",disenrollStudent);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForStudent(req,res) {
        var studentId = req.session.currentUser._id;
        enrollmentModel.findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function enrollStudentInSection(req, res){
        var sectionId = req.params['sectionId'];
        var studentId = req.session.currentUser._id;
        var enrollment = {
            section: sectionId,
            student: studentId
        };

        sectionModel.decrementSectionSeats(sectionId)
            .then(function() {
               return enrollmentModel.enrollStudentInSection(enrollment)
            })
            .then(function(enrollment){
                res.json(enrollment);
            })
    }

    function disenrollStudent(req,res){
        var sectionId = req.params['sectionId'];
        var student = req.session['currentUser'];

        sectionModel.incrementSectionSeats(sectionId)
            .then(() => enrollmentModel.deleteEnrollment(sectionId,student._id))
            .then(enrollment => res.send(enrollment));
    }

    function createSection(req,res){
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
    function findSectionsForCourse(req,res){
        let courseId = req.params['courseId'];
        sectionModel.findSectionsForCourse(courseId)
            .then(function(sections) {
                res.json(sections);
            })
    }
};