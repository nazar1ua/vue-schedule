<template>
  <div class="mb-6">
    <h4 class="text-lg font-medium mb-4">Домашнє завдання:</h4>
    <ul class="divide-y divide-indigo-300 border border-indigo-300 rounded-lg">
      <li class="p-1.5" v-for="(day, index) in lessons.days" :key="day.name + index + Math.random()">
        <h6 class="font-medium">{{day.name}}:</h6>
        <ul>
          <li>{{day.lessons[0]}}: Твір</li>
          <li>{{day.lessons[0]}}: Вірш</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Homework",
  props: {
    lessons: Object,
  },
  data() {
    return {
      //
    }
  },
}
</script>

<style scoped>

</style>