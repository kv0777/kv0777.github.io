"use strict";
// Type Definitions
// Data Arrays
const professors = [];
const classrooms = [];
const courses = [];
const schedule = [];
// Functions
// Adding a new professor
function addProfessor(professor) {
    professors.push(professor);
}
// Adding a lesson to the schedule if there's no conflict
function addLesson(lesson) {
    if (validateLesson(lesson) === null) {
        schedule.push(lesson);
        return true;
    }
    return false;
}
// Finding available classrooms for a specific time slot and day
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);
    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}
// Get the schedule of a specific professor
function getProfessorSchedule(professorId) {
    return schedule.filter(lesson => lesson.professorId === professorId);
}
// Validate if a lesson creates a conflict
function validateLesson(lesson) {
    for (const existingLesson of schedule) {
        if (existingLesson.dayOfWeek === lesson.dayOfWeek &&
            existingLesson.timeSlot === lesson.timeSlot) {
            if (existingLesson.professorId === lesson.professorId) {
                return { type: "ProfessorConflict", lessonDetails: existingLesson };
            }
            if (existingLesson.classroomNumber === lesson.classroomNumber) {
                return { type: "ClassroomConflict", lessonDetails: existingLesson };
            }
        }
    }
    return null;
}
// Get classroom utilization percentage
function getClassroomUtilization(classroomNumber) {
    const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    const totalSlots = 5 * 5; // 5 days a week, 5 time slots per day
    return (totalLessons / totalSlots) * 100;
}
// Get the most popular course type
function getMostPopularCourseType() {
    const courseTypeCounts = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0,
    };
    for (const lesson of schedule) {
        const course = courses.find(course => course.id === lesson.courseId);
        if (course) {
            courseTypeCounts[course.type]++;
        }
    }
    return Object.entries(courseTypeCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}
// Reassign a classroom for a lesson if possible
function reassignClassroom(lessonId, newClassroomNumber) {
    const lesson = schedule.find(lesson => lesson.courseId === lessonId);
    if (lesson && validateLesson(Object.assign(Object.assign({}, lesson), { classroomNumber: newClassroomNumber })) === null) {
        lesson.classroomNumber = newClassroomNumber;
        return true;
    }
    return false;
}
// Cancel a lesson
function cancelLesson(lessonId) {
    const index = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (index !== -1) {
        schedule.splice(index, 1);
    }
}
