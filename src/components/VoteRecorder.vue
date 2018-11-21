<template>
  <div>
    <ul class="list-reset flex justify-between max-w-xs">
      <li><button value="1" @click="recordVote(1)" :class="[ isVote(1) ? 'btn-blue' : 'btn-grey', 'btn text-xl' ]">1</button></li>
      <li><button value="3" @click="recordVote(3)" :class="[ isVote(3) ? 'btn-blue' : 'btn-grey', 'btn text-xl' ]">3</button></li>
      <li><button value="5" @click="recordVote(5)" :class="[ isVote(5) ? 'btn-blue' : 'btn-grey', 'btn text-xl' ]">5</button></li>
      <li><button value="8" @click="recordVote(8)" :class="[ isVote(8) ? 'btn-blue' : 'btn-grey', 'btn text-xl' ]">8</button></li>
      <li><button value="13" @click="recordVote(13)" :class="[ isVote(13) ? 'btn-blue' : 'btn-grey', 'btn text-xl' ]">13</button></li>
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
