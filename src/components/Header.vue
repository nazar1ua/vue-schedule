<template>
  <div class="bg-indigo-50 dark:bg-indigo-900 border-b border-b-indigo-500 fixed top-0 left-0 right-0">
    <div class="container px-4 py-2 mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <span class="inline-flex gap-[1px] rounded-full border border-indigo-500 dark:border-indigo-300 px-2 bg-indigo-100 dark:bg-indigo-600">
            {{ time.hours }}
            <span class="blink">:</span>
            {{time.minutes}}
          </span>
          <span class="ml-2">{{time.day.name}}</span>
        </div>
        <div class="flex gap-2">
          <p class="font-semibold">
            {{lesson}}
          </p>
          <ThemeButton/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThemeButton from "./ThemeButton.vue";
export default {
  name: "Header",
  components: {ThemeButton},
  props: ['lessons', 'lesson', 'time'],
  data() {
    return {
      //
    }
  },
 }
</script>

<style scoped>

</style>