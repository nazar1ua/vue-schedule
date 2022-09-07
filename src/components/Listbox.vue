<script setup>
import { ref } from 'vue'
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    array: {
        type: Array,
        required: true,
        default: [{name: "Немає даних"}]
    },
    modelValue: null
})

defineEmits(['update:modelValue'])
</script>
  
<template>
    <Listbox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
        <div class="relative mt-1">
            <ListboxButton
                class="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm
                bg-white border-indigo-500 focus-visible:border-indigo-500 focus-visible:ring-white focus-visible:ring-offset-indigo-300
                dark:bg-gray-900 dark:focus-visible:ring-gray-900 dark:focus-visible:ring-offset-indigo-700">
                <span class="block truncate">{{ modelValue.name || 'Немає даних' }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black dark:ring-gray-800 ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="option in array" :key="option.name" :value="option" as="template">
                        <li :class="[
                          active ? 'bg-indigo-100 text-indigo-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-900 dark:text-white',
                          'relative cursor-pointer select-none py-2 pl-10 pr-4',
                        ]">
                            <span :class="[
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            ]">{{ option.name }}</span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
