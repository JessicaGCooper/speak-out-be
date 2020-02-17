const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const CourseEnrollment = require('../models/course_enrollment.model');

const validateCourseEnrollmentBody = (req, res, next) => {
  const { first_day, last_day, result_type_code, notes } = req.body;

  if (!result_type_code || !notes) {
    next(new AppError('Wrong body', 400));
    return;
  }

  req.courseEnrollment = {
    first_day: first_day || req.course.start_date,
    last_day: last_day || req.course.end_date,
    result_type_code,
    notes,
    course_id: req.courseID,
    student_id: req.studentID
  };
  next();
};

const validateIfStudentIsEnrolled = catchAsync(async (req, res, next) => {
  const enrolledStudent = await CourseEnrollment.find(
    req.studentID,
    req.courseID
  );
  req.enrolledStudent = enrolledStudent;
  next();
});

module.exports = {
  validateCourseEnrollmentBody,
  validateIfStudentIsEnrolled
};
