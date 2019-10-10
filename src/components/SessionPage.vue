<template>
  <div>
    <nav class="bg-blue-100 text-blue-800 py-6">
      <h1 class="text-3xl text-center font-normal">Pointing Poker</h1>
      <div class="flex justify-center items-center mt-2">
        <span class="bg-transparent text-sm font-bold text-blue-800 cursor-pointer" @click="copyLink">{{ sessionUrl }}</span>
        <img src="/static/clone.svg" class="ml-2 cursor-pointer opacity-60 h-4" @click="copyLink" alt="Copy" title="Copy" />
      </div>
    </nav>

    <main class="text-black">
      <div class="px-4 py-6 max-w-lg mx-auto">
        <div v-show="!online" class="mb-4 flex items-center">
          <img src="/static/warning.svg" class="h-8 w-8" />
          <span class="ml-4 text-red-700 text-xl"><span class="font-bold">You are not online.</span> You'll be reconnected as soon as you have an internet connection.</span>
        </div>

        <vote-recorder v-model="vote" v-on:input="clearPass()" v-on:pass="passVote()"></vote-recorder>

        <div class="sm:flex sm:justify-between">
          <ul class="mt-4 pr-2 list-reset text-3xl overflow-hidden">
            <user-item :self="true" :user="{username, vote, pass}" :hovering="hoveringVote" v-on:usernameChange="handleUsernameChange" />
            <user-item v-for="user in users" :key="user.userId" :self="false" :user="user" :hovering="hoveringVote" />
          </ul>

          <div class="mt-6 text-gray-800">
            <vote-results :votes="votes" :show="showVotes" v-on:hovering="highlightVoters"></vote-results>

            <conditional-button :enabled="(votes.filter(vote => vote !== null).length > 0) && !showVotes" @click="revealVotes">Reveal</conditional-button>
            <conditional-button :enabled="votes.filter(vote => vote !== null).length > 0" @click="clearVotes">Clear</conditional-button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import VoteRecorder from './VoteRecorder.vue'
import VoteResults from './VoteResults.vue'
import UserItem from './UserItem.vue'
import ConditionalButton from './ConditionalButton.vue'
import Pusher from 'pusher-js'

export default {
  name: 'SessionPage',

  components: {
    VoteRecorder,
    VoteResults,
    UserItem,
    ConditionalButton
  },

  props: ['name'],

  data () {
    return {
      session: this.$route.params.id,
      userId: null,
      username: this.$props.name,
      pass: false,
      vote: null,
      forceReveal: false,
      users: [],
      hoveringVote: null,
      pusher: null,
      channel: null,
    }
  },

  mounted () {
    while (this.username == null || this.username.length < 1) {
      if (localStorage.username) {
        this.username = localStorage.username
      } else {
        this.username = prompt('Please enter your username:').trim()
      }
    }

    localStorage.username = this.username

    window.addEventListener('online', () => {
      this.connect()
    })

    window.addEventListener('offline', () => {
      this.disconnect()
    })

    this.connect()
  },

  watch: {
    vote: function (value) {
      this.channel.trigger('client-vote', {
        userId: this.userId,
        points: value
      })
    },

    pass: function (value) {
      this.channel.trigger('client-pass', {
        userId: this.userId,
        pass: value
      })
    }
  },

  computed: {
    online: function () {
      return navigator.onLine
    },
    votes: function () {
      let otherVotes = this.users.map(function (user) {
        return user.vote
      })

      return [
        this.vote,
        ...otherVotes
      ]
    },
    showVotes: function () {
      if (this.forceReveal) {
        return true
      }
      let votingUserCount = this.users.filter(user => user.pass === false).length
      if (this.pass === false) {
        votingUserCount += 1
      }
      return this.votes.filter(vote => vote !== null).length === votingUserCount
    },
    sessionUrl: function () {
      return `${process.env.VUE_APP_HOST}/s/${this.session}`
    }
  },

  methods: {
    copyLink: function () {
      navigator.clipboard.writeText(this.sessionUrl)
    },

    passVote: function () {
      this.pass = true
      this.vote = null
    },

    clearPass: function () {
      this.pass = false
    },

    revealVotes: function () {
      this.forceReveal = true
      this.channel.trigger('client-reveal-votes', {})
    },

    clearVotes: function () {
      this.vote = null
      this.users.forEach(function (user) {
        user.vote = null
      })
      this.forceReveal = false
      this.channel.trigger('client-clear-votes', {})
    },

    handleUsernameChange: function (username) {
      this.username = username
      this.reconnect()
    },

    highlightVoters: function (hoveringVote) {
      this.hoveringVote = hoveringVote
    },

    reconnect: function () {
      this.disconnect()
      this.connect()
    },

    disconnect: function () {
      this.pusher.disconnect()
      this.channel = null
      this.pusher = null
      this.vote = null
      this.pass = false
      this.users = []
    },

    connect: function () {
      // eslint-disable-next-line
      let pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
        cluster: process.env.VUE_APP_PUSHER_CLUSTER,
        forceTLS: true,
        authEndpoint: `${process.env.VUE_APP_API_HOST}/auth`,
        authTransport: 'jsonp',
        auth: {
          params: {
            username: this.username
          }
        }
      })

      pusher.connection.bind('connected', () => {
        this.userId = pusher.connection.socket_id
      })

      let channel = pusher.subscribe('presence-' + this.session)

      channel.bind('pusher:subscription_succeeded', () => {
        this.channel = channel
        channel.members.each(member => {
          if (member.id !== this.userId) {
            this.users.push({
              userId: member.id,
              username: member.info.name,
              vote: null,
              pass: false
            })
          }
        })
      })

      channel.bind('pusher:member_added', (member) => {
        let found = false

        this.users.forEach(function (user) {
          if (user.userId === member.id) {
            found = true
          }
        })

        if (!found) {
          this.users.push({
            userId: member.id,
            username: member.info.name,
            vote: member.info.vote,
            pass: member.info.pass ? member.info.pass : false
          })
        }

        if (this.vote !== null) {
          this.channel.trigger('client-vote', {
            userId: this.userId,
            points: this.vote
          })
        }

        if (this.pass !== false) {
          this.channel.trigger('client-pass', {
            userId: this.userId,
            pass: this.pass
          })
        }
      })

      channel.bind('pusher:member_removed', (member) => {
        this.users.forEach(function (user, index, users) {
          if (user.userId === member.id) {
            users.splice(index, 1)
          }
        })
      })

      channel.bind('client-vote', ({userId, points}) => {
        this.users.forEach(function (user) {
          if (user.userId === userId) {
            user.vote = points
          }
        })
      })

      channel.bind('client-pass', ({userId, pass}) => {
        this.users.forEach(function (user) {
          if (user.userId === userId) {
            user.pass = pass
          }
        })
      })

      channel.bind('client-reveal-votes', () => {
        this.forceReveal = true
      })

      channel.bind('client-clear-votes', () => {
        this.forceReveal = false
        this.vote = null
        this.users.forEach(function (user) {
          user.vote = null
        })
      })

      this.pusher = pusher
      this.channel = channel
    }
  }
}
</script>
