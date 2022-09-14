<template>
  <Header :time="time" :lessons="lessons" :lesson="lesson"/>
  <div class="container px-4 mx-auto mt-10">
    <Table ref="table" :lessons="lessons" :lesson="lesson" :today="today" @homework-change="updateHomework"/>
    <Homework :lessons="lessons" :homework="homework" @created="createdHandler" />
  </div>
</template>

<script>
import lessons from './assets/lessons.json'
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import feather from "feather-icons";
import Homework from "./components/Homework.vue";
import { getLesson } from './components/GetLesson';

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
    createdHandler() {
      this.$refs.table.updateStorage()
      this.$refs.table.updateHomework()
      this.updateHomework()
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
      return getLesson(lessons)
    },
  },
}
</script>

<style>

</style>
