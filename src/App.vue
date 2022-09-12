<template>
  <Header :time="time" :lessons="lessons" :lesson="lesson"/>
  <div class="container px-4 mx-auto mt-10">
    <Table :lessons="lessons" :lesson="lesson" :today="today" @homework-change="updateHomework"/>
    <Homework :lessons="lessons" :homework="homework" @created="updateHomework" />
  </div>
</template>

<script>
import lessons from './assets/lessons.json'
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import feather from "feather-icons";
import Homework from "./components/Homework.vue";

export default {
  name: "App",
  components: {Homework, Table, Header},
  data() {
    return {
      lessons,
      lesson: this.getLesson(),
      time: {
        hours: new Date().toLocaleTimeString().split(':')[0],
        minutes: new Date().toLocaleTimeString().split(':')[1],
        seconds: new Date().toLocaleTimeString().split(':')[2],
        day: {
          number: new Date().getDay() - 1,
          name: typeof lessons.days[new Date().getDay() - 1] !== 'undefined' ? lessons.days[new Date().getDay() - 1].name : 'Вихідний'
        },
      },
      today: new Date().getDay() - 1,
      homework: this.getHomework(),
    }
  },
  mounted() {
    this.updateNow();
    setInterval(this.updateNow.bind(this), 1000);
    feather.replace()
  },
  methods: {
    getHomework() {
      if (!localStorage.getItem('homework')) {
        localStorage.setItem('homework', JSON.stringify([[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]]))
      }
      return JSON.parse(localStorage.getItem('homework'))
    },
    updateHomework() {
      this.homework = this.getHomework()
    },
    updateNow() {
      this.time = {
        hours: new Date().toLocaleTimeString().split(':')[0],
        minutes: new Date().toLocaleTimeString().split(':')[1],
        seconds: new Date().toLocaleTimeString().split(':')[2],
        day: {
          number: new Date().getDay() - 1,
          name: typeof lessons.days[new Date().getDay() - 1] !== 'undefined' ? lessons.days[new Date().getDay() - 1].name : 'Вихідний'
        },
      };
      this.today = new Date().getDay() - 1;
      this.lesson = this.getLesson();
    },
    getLesson() {
      const
          currentDate = new Date(),
          formattedTime = currentDate.getTime(),
          createDate = (hours, minutes) => {
            return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), Number(hours), Number(minutes)).getTime();
          },
          startLesson = createDate(lessons.schedule[0].start.split(':')[0], lessons.schedule[0].start.split(':')[1]),
          endLesson = createDate(lessons.schedule[lessons.schedule.length - 1].end.split(':')[0], lessons.schedule[lessons.schedule.length - 1].end.split(':')[1]);
      if (startLesson >= formattedTime || formattedTime >= endLesson) {
        return 'Уроків немає';
      }
      const formattedDay = Number(currentDate.getDay() - 1);
      if (typeof (lessons.days[formattedDay]) === 'undefined') {
        return 'Сьогодні вихідний';
      }
      let value;
      lessons.schedule.forEach((lessonTime, index) => {
        const formattedLessonTime = {
          start: createDate(lessonTime.start.split(':')[0], lessonTime.start.split(':')[1]),
          end: createDate(lessonTime.end.split(':')[0], lessonTime.end.split(':')[1])
        }
        if (formattedLessonTime.start <= formattedTime && formattedTime <= formattedLessonTime.end) {
          value = lessons.days[formattedDay].lessons[index];
        }
      })
      return value || 'Перерва';
    },
  },
}
</script>

<style>

</style>
