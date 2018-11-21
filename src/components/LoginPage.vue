<template>
  <div>
    <nav class="bg-blue-lightest text-blue-darker py-6">
      <h1 class="text-center font-normal">Pointing Poker</h1>
    </nav>
    <main class="text-black">
      <form class="px-4 py-6 max-w-sm mx-auto">
        <div class="flex items-center mb-6">
          <div class="w-1/4">
            <label for="name" class="block text-grey font-bold text-right pr-4">Name</label>
          </div>
          <div class="w-3/4">
            <input class="login-input" id="name" type="text" required v-model="name" />
          </div>
        </div>
        <div class="flex items-center mb-6">
          <div class="w-1/4">
            <label for="room" class="block text-grey font-bold text-right pr-4">Room</label>
          </div>
          <div class="w-3/4">
            <input class="login-input" id="room" type="text" required v-model="session" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-1/4"></div>
          <div class="w-3/4">
            <router-link v-if="session && name" :to="{ name: 'SessionPage', params: { id: session, name } }" tag="button" class="btn btn-blue no-underline">Host</router-link>
            <button v-else class="btn btn-blue hover:bg-blue opacity-50 cursor-not-allowed" disabled>Host</button>
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
  }
}
</script>
