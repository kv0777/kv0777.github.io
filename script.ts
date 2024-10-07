// Type Definitions

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

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

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

// Data Arrays

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

// Functions

// Adding a new professor
function addProfessor(professor: Professor): void {
    professors.push(professor);
}

// Adding a lesson to the schedule if there's no conflict
function addLesson(lesson: Lesson): boolean {
    if (validateLesson(lesson) === null) {
        schedule.push(lesson);
        return true;
    }
    return false;
}

// Finding available classrooms for a specific time slot and day
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}

// Get the schedule of a specific professor
function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

// Validate if a lesson creates a conflict
function validateLesson(lesson: Lesson): ScheduleConflict | null {
    for (const existingLesson of schedule) {
        if (
            existingLesson.dayOfWeek === lesson.dayOfWeek &&
            existingLesson.timeSlot === lesson.timeSlot
        ) {
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
function getClassroomUtilization(classroomNumber: string): number {
    const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    const totalSlots = 5 * 5; // 5 days a week, 5 time slots per day
    return (totalLessons / totalSlots) * 100;
}

// Get the most popular course type
function getMostPopularCourseType(): CourseType {
    const courseTypeCounts: Record<CourseType, number> = {
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

    return Object.entries(courseTypeCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0] as CourseType;
}

// Reassign a classroom for a lesson if possible
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    const lesson = schedule.find(lesson => lesson.courseId === lessonId);
    if (lesson && validateLesson({ ...lesson, classroomNumber: newClassroomNumber }) === null) {
        lesson.classroomNumber = newClassroomNumber;
        return true;
    }
    return false;
}

// Cancel a lesson
function cancelLesson(lessonId: number): void {
    const index = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (index !== -1) {
        schedule.splice(index, 1);
    }
}
