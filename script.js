"use strict";
// Data arrays
const professors = [];
const classrooms = [];
const courses = [];
const schedule = [];
// Functions
function addProfessor(professor) {
    professors.push(professor);
}
function addLesson(lesson) {
    const conflict = validateLesson(lesson);
    if (conflict) {
        console.error("Conflict found:", conflict);
        return false;
    }
    schedule.push(lesson);
    return true;
}
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);
    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}
function getProfessorSchedule(professorId) {
    return schedule.filter(lesson => lesson.professorId === professorId);
}
function validateLesson(lesson) {
    const professorConflict = schedule.find(l => l.professorId === lesson.professorId && l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot);
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    const classroomConflict = schedule.find(l => l.classroomNumber === lesson.classroomNumber && l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot);
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }
    return null;
}
function getClassroomUtilization(classroomNumber) {
    const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    return (totalLessons / 5) * 100; // Assume 5 time slots per day
}
function getMostPopularCourseType() {
    const courseCount = courses.reduce((acc, course) => {
        acc[course.type] = (acc[course.type] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(courseCount).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)[0];
}
function reassignClassroom(lessonId, newClassroomNumber) {
    const lesson = schedule.find(l => l.courseId === lessonId);
    if (!lesson)
        return false;
    const newLesson = Object.assign(Object.assign({}, lesson), { classroomNumber: newClassroomNumber });
    const conflict = validateLesson(newLesson);
    if (conflict) {
        console.error("Conflict when reassigning:", conflict);
        return false;
    }
    lesson.classroomNumber = newClassroomNumber;
    return true;
}
function cancelLesson(lessonId) {
    const lessonIndex = schedule.findIndex(l => l.courseId === lessonId);
    if (lessonIndex !== -1) {
        schedule.splice(lessonIndex, 1);
    }
}
// Example data for testing
addProfessor({ id: 1, name: "Іваненко Іван", department: "Фізика" });
classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 25, hasProjector: false });
courses.push({ id: 1, name: "Фізика", type: "Lecture" });
addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "10:15-11:45" });
console.log(findAvailableClassrooms("10:15-11:45", "Monday")); // Check available classrooms
console.log(getProfessorSchedule(1)); // Get professor's schedule
