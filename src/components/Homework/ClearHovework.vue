<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const resetBtn = ref(null)

const props = defineProps(['today'])
const emit = defineEmits(['resetDone', 'resetHomework'])

const deleteTasks = () => {
   emit('resetHomework')
   resetAnimation()
   open.value = false
}

const clearStatus = () => {
   emit('resetDone')
   resetAnimation()
   open.value = false
}

const resetAnimation = () => {
   if (resetBtn.value === null) return
   const target = resetBtn.value
   target.classList.add('active')
   target.addEventListener('animationend', () => {
      target.classList.remove('active')
   })
}
</script>

<template>
   <button button @click="open = true" ref="resetBtn"
      class="reset-button rounded focus:outline-none focus-visible:ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 focus-visible:ring-indigo-300 dark:focus-visible:ring-indigo-500"
      :class="{ 'focus-visible:ring-offset-indigo-50 dark:focus-visible:ring-offset-indigo-900': today }">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         class="select-none">
         <polyline points="1 4 1 10 7 10"></polyline>
         <polyline points="23 20 23 14 17 14"></polyline>
         <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
      </svg>
   </button>
   <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
         <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
         </TransitionChild>

         <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
               <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                  <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                     <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                        <button type="button" class="rounded-md bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                           @click="open = false">
                           <span class="sr-only">Закрити</span>
                           <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                     </div>
                     <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-600 dark:bg-opacity-25 sm:mx-0 sm:h-10 sm:w-10">
                           <ExclamationTriangleIcon class="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                           <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Очистити домашнє завдання</DialogTitle>
                           <div class="mt-2">
                              <p class="text-sm text-gray-500 dark:text-gray-400">Виберіть: очистити тільки статус завдань, чи видалити все домашнє завдання за день. Або просто закрийте це вікно, якщо натиснули
                                 помилково.</p>
                           </div>
                        </div>
                     </div>
                     <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="button"
                           class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-900"
                           @click="deleteTasks">Видалити завдання</button>
                        <button type="button"
                           class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-700 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-900"
                           @click="clearStatus">Очистити статус</button>
                        <button type="button"
                           class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-900"
                           @click="open = false">Скасувати</button>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>
 