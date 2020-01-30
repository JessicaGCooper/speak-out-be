const db = require('../../database/db-config');

const returning = [
	'course.id as course_id',
	'term.name as term',
	'course.section',
	'course.subsection',
	'course.hourly_rate',
	'course.start_time',
	'course.end_time',
	'course.notes',
	'course.status',
	'course_type.description as course_type',
	'group_type.long_description as group_type',
	'school_grade.name as school_grade',
	'level.description as level',
	'course_schedule.long_description as course_schedule',
	'room.chairs as room',
	'user.name as teacher'
];

const find = () => {
	return db('course')
		.select(returning)
		.join('term', 'term.id', 'course.term_id')
		.join('course_type', 'course_type.id', 'course.course_type_id')
		.join('group_type', 'group_type.id', 'course.group_type_id')
		.join('school_grade', 'school_grade.id', 'course.school_grade_id')
		.join('level', 'level.id', 'course.level_id')
		.join('course_schedule', 'course_schedule.id', 'course.course_schedule_id')
		.join('room', 'room.id', 'course.room_id')
		.join('staff', 'staff.id', 'course.teacher_id')
		.join('user', 'user.user_id', 'staff.user_id')
		.orderBy('course.id', 'desc');
};

const findByID = id => {
	return db('course')
		.select(returning)
		.where('course.id', '=', id)
		.first()
		.join('term', 'term.id', 'course.term_id')
		.join('course_type', 'course_type.id', 'course.course_type_id')
		.join('group_type', 'group_type.id', 'course.group_type_id')
		.join('school_grade', 'school_grade.id', 'course.school_grade_id')
		.join('level', 'level.id', 'course.level_id')
		.join('course_schedule', 'course_schedule.id', 'course.course_schedule_id')
		.join('room', 'room.id', 'course.room_id')
		.join('staff', 'staff.id', 'course.teacher_id')
		.join('user', 'user.user_id', 'staff.user_id');
};

// const findByTermID = termId => {
// 	return db('term')
// 		.select('*')
// 		.where('id', '=', termId)
// 		.first();
// };
// const findByCourseTypeID = courseTypeId => {
// 	return db('course_type')
// 		.select('*')
// 		.where('id', '=', courseTypeId)
// 		.first();
// };
// const findByGroupTypeID = groupTypeId => {
// 	return db('group_type')
// 		.select('*')
// 		.where('id', '=', groupTypeId)
// 		.first();
// };
// const findBySchoolGradeID = schoolGradeId => {
// 	return db('school_grade')
// 		.select('*')
// 		.where('id', '=', schoolGradeId)
// 		.first();
// };
// const findByLevelID = levelId => {
// 	return db('level')
// 		.select('*')
// 		.where('id', '=', levelId)
// 		.first();
// };
// const findByCourseScheduleID = courseScheduleId => {
// 	return db('course_schedule')
// 		.select('*')
// 		.where('id', '=', courseScheduleId)
// 		.first();
// };
// const findByRoomID = roomId => {
// 	return db('room')
// 		.select('*')
// 		.where('id', '=', roomId)
// 		.first();
// };
// const findByTeacherID = teacherId => {
// 	return db('teacher')
// 		.select('*')
// 		.where('id', '=', teacherId)
// 		.first();
// };

const create = async () => {};

const edit = async () => {};

const remove = id => {
	return db('course')
		.where({ id })
		.del();
};

module.exports = {
	findByID,
	// findByTermID,
	// findByCourseTypeID,
	// findByGroupTypeID,
	// findBySchoolGradeID,
	// findByLevelID,
	// findByCourseScheduleID,
	// findByRoomID,
	// findByTeacherID,
	create,
	find,
	edit,
	remove
};
