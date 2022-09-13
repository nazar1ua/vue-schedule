<template>
  <div class="bg-indigo-50 dark:bg-indigo-900 border-b border-b-indigo-500 fixed top-0 left-0 right-0">
    <div class="container px-4 py-2 mx-auto">
      <div class="flex justify-between items-center">
        <div class="shrink-0">
          <span class="hidden sm:inline-flex mr-2 gap-[1px] rounded-full border border-indigo-500 dark:border-indigo-300 px-2 bg-indigo-100 dark:bg-indigo-600">
            {{ time.hours }}
            <span class="blink">:</span>
            {{time.minutes}}
          </span>
          <span v-if="getLessonIndex() !== null" class="inline-flex mr-2 gap-[1px] rounded-full border border-indigo-500 dark:border-indigo-300 px-2 bg-indigo-100 dark:bg-indigo-600">
            Час до кінця: {{timeToEnd}} хв
          </span>
          <span class="inline-flex gap-[1px] rounded-full border border-indigo-500 dark:border-indigo-300 px-2 bg-indigo-100 dark:bg-indigo-600">
            {{new Date().getDate()}}.{{new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}}
          </span>
        </div>
        <div class="flex gap-2">
          <p class="font-semibold hidden sm:block">
            {{lesson}}
          </p>
          <ThemeButton/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeToEnd, getLessonIndex } from "./GetLesson";
import ThemeButton from "./ThemeButton.vue";
export default {
  name: "Header",
  components: {ThemeButton},
  props: ['lessons', 'lesson', 'time'],
  computed: {
    timeToEnd() {
      return this.getLessonIndex() === null ? '' : getTimeToEnd(`${this.time.hours}:${this.time.minutes}`, this.lessons.schedule[this.lessons.days[this.time.day.number].lessons.indexOf(this.lesson)].end)
    },
  },
  methods: {
    getLessonIndex() {
      return getLessonIndex(this.lessons)
    },
  },
 }
</script>

<style scoped>

</style>