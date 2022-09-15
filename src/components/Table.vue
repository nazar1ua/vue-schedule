<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6" ref="grid">
    <template v-for="(day, index) in lessons.days" :key="day.name + index + Math.random()">
      <div v-show="day.lessons.length > 0" class="border border-indigo-300 rounded-xl pt-1" :class="{ 'bg-indigo-50 dark:bg-indigo-900': index === today }">
        <div class="px-2 pb-1 flex justify-between items-center">
          <h1 class="font-bold text-lg font-serif">{{day.name}}</h1>
          <ClearHovework :today="index === today" @reset-done="clearHomework(index)" @reset-homework="clearHomework(index, true)" />
        </div>
        <ul>
          <li class="flex items-center px-2 py-0.5 border-t border-t-indigo-300" v-for="(subject, number) in day.lessons" :key="subject + number + Math.random()">
            <input type="checkbox" @change="handleChange" @keyup.enter="handleKeyup" :checked="todo[index][number]"
              class="shrink-0 mr-1 appearance-none h-4 w-4 rounded border border-indigo-300 dark:border-indigo-500 cursor-pointer transition-all bg-[length:0%] checked:bg-[length:0.9rem] checked:bg-indigo-300 dark:checked:bg-indigo-500 checked:bg-center checked:bg-[url('src/assets/checkbox.svg')] outline-none focus-visible:ring focus-visible:ring-indigo-200 dark:focus-visible:ring-indigo-600 bg-no-repeat">
            <span>{{number + 1}}.&nbsp;</span>
            <Emoji :lesson="subject" />
            <span class="truncate" :class="{ 'font-medium': subject === lesson && today === index }">&nbsp;{{subject}} <span :class="[todo[index][number] ? 'line-through' : '']">{{homework[index][number] !== null ? '(' + homework[index][number].text + ')' : ''}}</span></span>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import Emoji from './Emoji.vue'
import ClearHovework from './Homework/ClearHovework.vue'

export default {
  name: "Table",
  components: { Icon, Emoji, ClearHovework },
  props: ['lessons', 'lesson', 'today'],
  emits: ['homeworkChange'],
  data() {
    return {
      todo: this.getStorage(),
      homework: this.getHomework()
    }
  },
  methods: {
    getHomework() {
      if (!localStorage.getItem('homework')) {
        localStorage.setItem('homework', JSON.stringify([[null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null], [null, null, null, null, null, null, null]]))
      }
      return JSON.parse(localStorage.getItem('homework'))
    },
    updateHomework() {
      this.homework = this.getHomework()
    },
    getStorage() {
      if (!localStorage.getItem('todo')) {
        localStorage.setItem('todo', JSON.stringify([[false, false, false, false, false, false, false], [false, false, false, false, false, false, false], [false, false, false, false, false, false, false], [false, false, false, false, false, false, false], [false, false, false, false, false, false, false]]));
      }
      return JSON.parse(localStorage.getItem('todo'));
    },
    updateStorage() {
      this.todo = this.getStorage()
    },
    setStorage(value) {
      localStorage.setItem('todo', JSON.stringify(value));
    },
    handleChange(event) {
      let eventDay, eventLesson, eventStatus;
      const currentLesson = event.path[1];
      const currentDay = event.path[3];
      const lessons = event.path[4];
      for (let index = 0; index < lessons.children.length; index++) {
        if (lessons.children[index] === currentDay) {
          eventDay = Number(index);
          for (let number = 0; number < lessons.children[eventDay].children[1].children.length; number++) {
            if (lessons.children[eventDay].children[1].children[number] === currentLesson) {
              eventLesson = Number(number);
            }
          }
        }
      }
      eventStatus = Boolean(!!event.target.checked);
      if (eventStatus) {
        event.path[0].nextElementSibling.nextElementSibling.nextElementSibling.children[0].classList.add('line-through')
      } else {
        event.path[0].nextElementSibling.nextElementSibling.nextElementSibling.children[0].classList.remove('line-through')
      }
      let todo = this.getStorage();
      todo[eventDay][eventLesson] = eventStatus;
      let homework = this.getHomework();
      if (homework[eventDay][eventLesson] !== null) {
        homework[eventDay][eventLesson].done = eventStatus;
        localStorage.setItem('homework', JSON.stringify(homework));
        this.$emit('homeworkChange');
      }
      this.setStorage(todo);
    },
    handleKeyup(event) {
      event.target.checked = !event.target.checked
      this.handleChange(event)
    },
    clearHomework(day, purge = false) {
      let todo = this.getStorage();
      todo[day].forEach((lesson, index) => {
        todo[day][index] = false;
      });
      let homework = this.getHomework();
      homework[day].forEach((lesson, index) => {
        if (purge) {
          homework[day][index] = null
        } else if (!purge && homework[day][index] !== null) {
          homework[day][index].done = false
        }
      })
      const parent = this.$refs.grid.children[day].children[1].children;
      for (let index = 0; index < parent.length; index++) {
        parent[index].children[0].checked = false;
        parent[index].children[0].nextElementSibling.nextElementSibling.nextElementSibling.children[0].classList.remove('line-through')
        if (purge) {
          parent[index].children[0].nextElementSibling.nextElementSibling.nextElementSibling.children[0].innerText = ''
        }
      }
      this.setStorage(todo);
      localStorage.setItem('homework', JSON.stringify(homework));
      this.$emit('homeworkChange');
    },
  },
}
</script>

<style scoped>
.reset-button {
  transition-property: transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.reset-button.active svg {
  animation: 200ms linear rotate;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
