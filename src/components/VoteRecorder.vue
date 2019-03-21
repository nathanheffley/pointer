<template>
  <div>
    <ul class="btn-list sm:max-w-xs">
      <li><button value="0" @click="recordVote(0)" :class="[ isVote(0) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">0</button></li>
      <li><button value="1" @click="recordVote(1)" :class="[ isVote(1) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">1</button></li>
      <li><button value="3" @click="recordVote(3)" :class="[ isVote(3) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">3</button></li>
      <li><button value="5" @click="recordVote(5)" :class="[ isVote(5) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">5</button></li>
      <li><button value="8" @click="recordVote(8)" :class="[ isVote(8) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">8</button></li>
      <li><button value="13" @click="recordVote(13)" :class="[ isVote(13) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">13</button></li>
      <li><button value="20" @click="recordVote(20)" :class="[ isVote(20) ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">20</button></li>
      <li><button value="?" @click="recordVote('?')" :class="[ isVote('?') ? 'btn-blue' : 'btn-grey', 'btn text-xl w-16' ]">?</button></li>
    </ul>
    <button @click="recordVote(null)" class="italic text-grey-dark mt-2">Clear your vote...</button>
  </div>
</template>

<script>
export default {
  name: 'VoteRecorder',
  props: ['value'],
  methods: {
    isVote: function (points) {
      if (this.value === null) return true
      return points === this.value
    },

    recordVote: function (points) {
      this.$emit('input', points)
    }
  }
}
</script>
