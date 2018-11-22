<template>
  <div>
    <nav class="bg-blue-lightest text-blue-darker py-6">
      <h1 class="text-center font-normal">Pointing Poker</h1>
      <div class="flex justify-center mt-2">
        <span class="bg-transparent text-sm font-bold text-blue-darker cursor-pointer" @click="copyLink">{{ sessionUrl }}</span>
        <img src="/static/clone.svg" class="ml-2 cursor-pointer opacity-60 h-4" @click="copyLink" alt="Copy" title="Copy" />
      </div>
    </nav>

    <main class="text-black">
      <div class="px-4 py-6 max-w-sm mx-auto">
        <vote-recorder v-model="vote"></vote-recorder>

        <div class="sm:flex sm:justify-between">
          <ul class="mt-4 pr-2 list-reset text-3xl overflow-hidden">
            <user-item :user="{username, vote}" />
            <user-item v-for="user in users" :key="user.userId" :user="user" />
          </ul>

          <div class="mt-6 text-grey-darkest">
            <vote-results :votes="votes" :show="showVotes"></vote-results>

            <conditional-button :enabled="(votes.filter(Boolean).length > 0) && !showVotes" @click="revealVotes">Reveal</conditional-button>
            <conditional-button :enabled="votes.filter(Boolean).length > 0" @click="clearVotes">Clear</conditional-button>
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
      channel: null,
      session: this.$route.params.id,
      userId: null,
      username: this.$props.name,
      vote: null,
      forceReveal: false,
      users: []
    }
  },

  mounted () {
    while (this.username == null || this.username.length < 1) {
      this.username = prompt('Please enter your username:').trim()
    }

    // eslint-disable-next-line
    let pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
      forceTLS: true,
      authEndpoint: `${process.env.API_HOST}/auth`,
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
            vote: null
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
          vote: member.info.vote
        })
      }

      if (this.vote !== null) {
        this.channel.trigger('client-vote', {
          userId: this.userId,
          points: this.vote
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
  },

  watch: {
    vote: function (value) {
      this.channel.trigger('client-vote', {
        userId: this.userId,
        points: value
      })
    }
  },

  computed: {
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
      return this.votes.filter(Boolean).length === (this.users.length + 1)
    },
    sessionUrl: function () {
      return `${process.env.FRONTEND_HOST}/s/${this.session}`
    }
  },

  methods: {
    copyLink: function () {
      navigator.clipboard.writeText(this.sessionUrl)
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
    }
  }
}
</script>
