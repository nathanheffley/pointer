<template>
  <div>
    <span class="block uppercase font-light text-3xl">Results</span>
    <ul v-if="$props.show && (voteResults.length > 0)" class="list-reset mt-2">
      <li class="mt-2 text-2xl" v-for="result in voteResults" :key="result.points">
        <span :class="[ result.highest ? 'bg-blue' : 'bg-grey', 'points' ]" v-text="result.points"></span>
        <span v-text="result.votes + ' ' + pluralizedVote(result.votes)"></span>
      </li>
    </ul>
    <span v-else class="block mt-2 font-light text-xl">Waiting...</span>
  </div>
</template>

<script>
export default {
  name: 'VoteResults',
  props: ['votes', 'show'],
  computed: {
    voteResults: function () {
      let results = {
        1: 0,
        3: 0,
        5: 0,
        8: 0,
        13: 0
      }

      this.votes.forEach(function (vote) {
        results[vote]++
      })

      let points = Object.keys(results).filter(function (key) {
        return results[key] > 0
      })

      let finalResults = []
      points.forEach(function (point) {
        finalResults.push({
          points: point,
          votes: results[point],
          highest: false
        })
      })

      finalResults.sort(function (a, b) {
        if (a.votes < b.votes) {
          return -1
        }
        if (a.votes > b.votes) {
          return 1
        }

        return 0
      })

      if (finalResults.length > 0) {
        finalResults[finalResults.length - 1].highest = true
      }

      return finalResults
    }
  },
  methods: {
    pluralizedVote: function (votes) {
      if (votes === 1) {
        return 'vote'
      } else {
        return 'votes'
      }
    }
  }
}
</script>
