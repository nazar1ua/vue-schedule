<template>
  <div class="mb-6">
    <div class="flex items-center justify-between">
      <h4 class="text-lg font-medium mb-1">Домашнє завдання</h4>
      <CreateHomework :lessons="lessons" @created="createdHandler" />
    </div>
    <ul v-if="homework.filter(day => day.filter(l => l !== null).length > 0).length > 0" class="mt-4 divide-y divide-indigo-300 border border-indigo-300 rounded-lg">
      <template v-for="(day, index) in lessons.days" :key="day.name + index + Math.random()">
        <li class="py-1.5" v-if="day.lessons.length > 0 && homework[index].filter(l => l !== null).length > 0">
          <h6 class="font-medium px-1.5">{{day.name}}</h6>
          <ul>
            <template v-for="(lesson, i) in day.lessons" :key="lesson">
              <li v-if="homework[index][i] !== null" class="px-1.5">{{lesson}}: {{homework[index][i].text}}</li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import CreateHomework from './Homework/CreateHomework.vue';
export default {
  name: "Homework",
  props: {
    lessons: Object,
  },
  data() {
    return {
      homework: this.getHomework()
    }
  },
  methods: {
    getHomework() {
      if (!localStorage.getItem('homework')) {
        localStorage.setItem('homework', JSON.stringify([[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]]))
      }
      return JSON.parse(localStorage.getItem('homework'))
    },
    createdHandler() {
      this.homework = this.getHomework()
      this.$emit('created')
    }
  },
  emits: ['created'],
  components: { CreateHomework }
}
</script>

<style scoped>

</style>