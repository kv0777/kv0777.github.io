// Type aliases and union types
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// Data structures
type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

// Data arrays
const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

// Functions
function addProfessor(professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);
    if (conflict) {
        console.error("Conflict found:", conflict);
        return false;
    }
    schedule.push(lesson);
    return true;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

function validateLesson(lesson: Lesson): ScheduleConflict | null {
    const professorConflict = schedule.find(
        l => l.professorId === lesson.professorId && l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot
    );
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }

    const classroomConflict = schedule.find(
        l => l.classroomNumber === lesson.classroomNumber && l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot
    );
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }

    return null;
}

function getClassroomUtilization(classroomNumber: string): number {
    const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    return (totalLessons / 5) * 100; // Assume 5 time slots per day
}

function getMostPopularCourseType(): CourseType {
    const courseCount = courses.reduce((acc, course) => {
        acc[course.type] = (acc[course.type] || 0) + 1;
        return acc;
    }, {} as Record<CourseType, number>);

    return Object.entries(courseCount).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)[0] as CourseType;
}

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    const lesson = schedule.find(l => l.courseId === lessonId);
    if (!lesson) return false;

    const newLesson: Lesson = { ...lesson, classroomNumber: newClassroomNumber };
    const conflict = validateLesson(newLesson);
    if (conflict) {
        console.error("Conflict when reassigning:", conflict);
        return false;
    }

    lesson.classroomNumber = newClassroomNumber;
    return true;
}

function cancelLesson(lessonId: number): void {
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