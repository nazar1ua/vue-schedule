<template>
  <button @click="changeTheme" class="transition-shadow rounded focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-indigo-500">
    <svg v-if="theme.mode === 'system'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smartphone"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
    <svg v-else-if="theme.mode === 'light'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    <svg v-else-if="theme.mode === 'dark'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  </button>
</template>

<script>
export default {
  name: "ThemeButton",
  data() {
    return {
      theme: {
        mode: localStorage.getItem('theme') || 'system',
      },
    }
  },
  methods: {
    changeTheme(mounted) {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      if (mounted === true) return;
      if (this.theme.mode === 'system') {
        if (document.documentElement.classList.contains('dark')) {
          this.theme.mode = 'light';
          localStorage.setItem('theme', 'light');
          document.documentElement.classList.remove('dark');
        } else {
          this.theme.mode = 'dark';
          localStorage.setItem('theme', 'dark');
          document.documentElement.classList.add('dark');
        }
      } else if (this.theme.mode === 'light') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.theme.mode = 'system';
          localStorage.removeItem('theme');
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } else {
          this.theme.mode = 'dark';
          localStorage.setItem('theme', 'dark');
          document.documentElement.classList.add('dark');
        }
      } else if (this.theme.mode === 'dark') {
        this.theme.mode = 'system';
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  },
  mounted() {
    this.changeTheme(true);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.changeTheme(true)
    })
  },
  unmounted() {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change')
  },
}
</script>

<style scoped>
.feather {
  @apply h-5 w-5;
}
</style>