export const getLesson = (lessons) => {
    const
        currentDate = new Date(),
        formattedTime = currentDate.getTime(),
        createDate = (hours, minutes) => {
            return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), Number(hours), Number(minutes)).getTime();
        },
        startLesson = createDate(lessons.schedule[0].start.split(':')[0], lessons.schedule[0].start.split(':')[1]),
        endLesson = createDate(lessons.schedule[lessons.schedule.length - 1].end.split(':')[0], lessons.schedule[lessons.schedule.length - 1].end.split(':')[1]);
    if ((startLesson >= formattedTime || formattedTime >= endLesson)) {
        return 'Уроків немає';
    }
    const formattedDay = Number(currentDate.getDay() - 1);
    if (typeof (lessons.days[formattedDay]) === 'undefined') {
        return 'Сьогодні вихідний';
    }
    let value = 'Перерва';
    lessons.schedule.forEach((lessonTime, index) => {
        const formattedLessonTime = {
            start: createDate(lessonTime.start.split(':')[0], lessonTime.start.split(':')[1]),
            end: createDate(lessonTime.end.split(':')[0], lessonTime.end.split(':')[1])
        }
        if (formattedLessonTime.start <= formattedTime && formattedTime <= formattedLessonTime.end) {
            value = lessons.days[formattedDay]?.lessons[index]
        }
    })
    return value ?? 'Уроків немає';
}

export const getLessonIndex = (lessons) => {
    const
        currentDate = new Date(),
        formattedTime = currentDate.getTime(),
        createDate = (hours, minutes) => {
            return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), Number(hours), Number(minutes)).getTime();
        },
        startLesson = createDate(lessons.schedule[0].start.split(':')[0], lessons.schedule[0].start.split(':')[1]),
        endLesson = createDate(lessons.schedule[lessons.schedule.length - 1].end.split(':')[0], lessons.schedule[lessons.schedule.length - 1].end.split(':')[1]);
    if (startLesson >= formattedTime || formattedTime >= endLesson) {
        return null;
    }
    const formattedDay = Number(currentDate.getDay() - 1);
    if (typeof (lessons.days[formattedDay]) === 'undefined') {
        return null;
    }
    let value = null;
    lessons.schedule.forEach((lessonTime, index) => {
        const formattedLessonTime = {
            start: createDate(lessonTime.start.split(':')[0], lessonTime.start.split(':')[1]),
            end: createDate(lessonTime.end.split(':')[0], lessonTime.end.split(':')[1])
        }
        if (formattedLessonTime.start <= formattedTime && formattedTime <= formattedLessonTime.end) {
            if (lessons.days[formattedDay].lessons.length - 1 <= index) {
                value = lessons.days[formattedDay]?.lessons[index] ? index : null
            }
        }
    })
    return value ?? null;
}

export const timeToDate = (str) => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), str.split(':')[0], str.split(':')[1])
}

export const getTimeToEnd = (now, end) => {
    if (now > end) {
        return
    }
    const diffMs = (timeToDate(end) - timeToDate(now)); // milliseconds
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffMins
}
