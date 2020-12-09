<template>
  <div id="app" :class="{ 'dark bg-gray-800': darkMode }" class="flex flex-col justify-between" style="min-height: 100vh">
    <router-view/>

    <div class="flex items-end justify-end p-7">
      <Instructional :show="showDarkModeInstructional" classes="-my-2 mr-4" v-on:dismiss="dismissDarkModeInstructional()">
        <span class="font-semibold dark:font-bold">Dark Mode.</span>
        Go ahead and try it out.
      </Instructional>
      <button
        type="button"
        aria-pressed="false"
        :class="{ 'bg-blue-600': darkMode, 'bg-gray-200': !darkMode }"
        class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="toggleDarkMode()"
      >
        <span class="sr-only">Toggle dark mode</span>
        <span
          :class="{ 'translate-x-5': darkMode, 'translate-x-0': !darkMode }"
          class="relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        >
          <span
            :class="{ 'opacity-0 ease-out duration-100': darkMode, 'opacity-100 ease-in duration-200': !darkMode }"
            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            aria-hidden="true"
          >
            <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
          </span>
          <span
            :class="{ 'opacity-100 ease-in duration-200': darkMode, 'opacity-0 ease-out duration-100': !darkMode }"
            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            aria-hidden="true"
          >
            <svg class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  </div>
</template>

<style src="./main.css"></style>

<script>
import Instructional from './components/Instructional.vue'
export default {
  name: 'App',

  components: { Instructional },

  data: function () {
    return {
      darkMode: false,
      showDarkModeInstructional: false,
    }
  },

  mounted() {
    if (localStorage.darkMode == "true") {
      this.darkMode = true
    } else {
      this.darkMode = false
    }

    if (!localStorage.hasDismissedDarkModeInstructional) {
      this.showDarkModeInstructional = true
    }
  },

  methods: {
    toggleDarkMode: function () {
      this.darkMode = !this.darkMode
      localStorage.darkMode = this.darkMode
      if (this.showDarkModeInstructional) {
        this.dismissDarkModeInstructional()
      }
    },

    dismissDarkModeInstructional: function () {
      this.showDarkModeInstructional = false
      localStorage.hasDismissedDarkModeInstructional = true
    },
  },
}
</script>
