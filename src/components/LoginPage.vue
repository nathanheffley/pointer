<template>
  <div>
    <nav class="py-6 bg-blue-50 text-blue-800 dark:bg-gray-900 dark:text-gray-300">
      <h1 class="text-3xl text-center font-normal">Pointing Poker</h1>
    </nav>
    <main>
      <form class="px-4 py-6 max-w-md mx-auto">
        <div class="flex items-center">
          <div class="w-1/4">
            <label for="name" class="block font-bold text-right pr-4 text-gray-500">Name</label>
          </div>
          <div class="w-3/4">
            <input class="login-input" id="name" type="text" required v-model="name" />
          </div>
        </div>
        <div class="flex items-center mt-6">
          <div class="w-1/4">
            <label for="room" class="block text-gray-500 font-bold text-right pr-4">Room</label>
          </div>
          <div class="w-3/4">
            <input class="login-input" id="room" type="text" required v-model="session" />
          </div>
        </div>
        <div v-if="session && session.trim().length > 0 && !isValidSession" class="flex items-center mt-2">
          <div class="w-1/4">
          </div>
          <div class="w-3/4">
            <p class="text-red-500 text-xs italic">Session name can only contain letters, numbers, and dashes.</p>
          </div>
        </div>
        <div class="flex items-center mt-6">
          <div class="w-1/4"></div>
          <div class="w-3/4">
            <router-link v-if="isValidSession && isValidName" :to="{ name: 'SessionPage', params: { id: session.toLowerCase().trim(), name } }" tag="button" class="btn btn-blue no-underline">
              Join
            </router-link>
            <button v-else class="btn btn-blue hover:bg-blue-400 dark:hover:bg-blue-700 opacity-50 cursor-not-allowed" disabled>
              Join
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      session: '',
      name: ''
    }
  },
  computed: {
    isValidSession() {
      return /^[a-zA-Z0-9-]+$/.test(this.session.trim());
    },
    isValidName() {
      return this.name.trim().length > 0;
    }
  },
  mounted () {
    if (localStorage.username) {
      this.name = localStorage.username
    }
  }
}
</script>
