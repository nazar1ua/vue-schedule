<script setup>
import { computed, ref, watch } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import Listbox from '../Listbox.vue'

const props = defineProps({
    lessons: Object
})

const emit = defineEmits(['created'])

const loading = ref(false)
const success = ref(false)

const isOpen = ref(false)
const selectedDay = ref(props.lessons.days[0])
const selectedLesson = ref({ name: selectedDay.value.lessons[0] })

const homeworkText = ref('')

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

function getHomework() {
    if (!localStorage.getItem('homework')) {
        localStorage.setItem('homework', JSON.stringify([[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]]))
    }
    return JSON.parse(localStorage.getItem('homework'))
}

function addHomework() {
    loading.value = true
    let homework = getHomework()

    const dayIndex = props.lessons.days.findIndex(day => day.name === selectedDay.value.name)
    const lessonIndex = props.lessons.days[dayIndex].lessons.indexOf(selectedLesson.value.name)

    homework[dayIndex][lessonIndex] = homeworkText.value.length > 0 ? {
        text: homeworkText.value,
        date: new Date().getTime(),
        done: false
    } : null

    localStorage.setItem('homework', JSON.stringify(homework))
    setTimeout(() => {
        success.value = true
        loading.value = false
        emit('created')
        isOpen.value = false
        homeworkText.value = ''
        setTimeout(() => {
            success.value = false
        }, 200)
    }, 100)
}

const lessonsToSelect = computed(() => {
    const lessons = []
    selectedDay.value.lessons.forEach(lesson => {
        lessons.push({ name: lesson })
    })
    return lessons
})

watch(selectedDay, async newValue => {
    selectedLesson.value = { name: newValue.lessons[0] }
})
</script>

<template>
    <button @click="openModal"
        class="rounded focus:outline-none focus-visible:ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 focus-visible:ring-indigo-300 dark:focus-visible:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="select-none">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    </button>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                        <DialogPanel class="w-full max-w-md transform rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Додати домашнє завдання
                            </DialogTitle>
                            <div class="mt-2">
                                <div>
                                    <label for="select-day" class="text-sm">Виберіть день</label>
                                    <Listbox :array="lessons.days" v-model="selectedDay" id="select-day" />
                                </div>
                                <div class="mt-2">
                                    <label for="select-lessons" class="text-sm">Виберіть предмет</label>
                                    <Listbox :array="lessonsToSelect" v-model="selectedLesson" id="select-lessons" />
                                </div>
                                <div class="mt-2">
                                    <label for="homework-text" class="text-sm">Введіть завдання</label>
                                    <input type="text" placeholder="Нприклад: вивчити вірш..." v-model="homeworkText" @keyup.enter="addHomework" class="mt-1 w-full rounded-lg py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm
                                    bg-white border-indigo-500 focus-visible:border-indigo-500 focus-visible:ring-white focus-visible:ring-offset-indigo-300
                                    dark:bg-gray-900 dark:focus-visible:ring-gray-900 dark:focus-visible:ring-offset-indigo-700">
                                </div>
                            </div>

                            <div class="mt-4 flex items-center justify-end gap-4">
                                <button type="button" class="inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                    border-indigo-100 text-indigo-900 hover:border-indigo-200 focus-visible:ring-indigo-500
                                    dark:border-indigo-700 dark:text-indigo-100 dark:hover:border-indigo-600 dark:focus-visible:ring-indigo-400 dark:ring-offset-gray-900" @click="closeModal">
                                    Скасувати
                                </button>
                                <button type="button" :disabled="loading" class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                    bg-indigo-100 text-indigo-900 hover:bg-indigo-200 focus-visible:ring-indigo-500
                                    dark:bg-indigo-700 dark:text-indigo-100 dark:hover:bg-indigo-600 dark:focus-visible:ring-indigo-400 dark:ring-offset-gray-900" @click="addHomework">
                                    <svg v-if="loading" class="animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="2" x2="12" y2="6"></line>
                                        <line x1="12" y1="18" x2="12" y2="22"></line>
                                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                        <line x1="2" y1="12" x2="6" y2="12"></line>
                                        <line x1="18" y1="12" x2="22" y2="12"></line>
                                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                    </svg>
                                    <svg v-else-if="success" class="h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span v-else>Додати</span>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  