<template>
  <div>
    <ul class="btn-list sm:max-w-xs">
      <li><button value="0" @click="recordVote(0)" :class="[ isVote(0) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">0</button></li>
      <li><button value="1" @click="recordVote(1)" :class="[ isVote(1) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">1</button></li>
      <li><button value="2" @click="recordVote(2)" :class="[ isVote(2) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">2</button></li>
      <li><button value="3" @click="recordVote(3)" :class="[ isVote(3) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">3</button></li>
      <li><button value="5" @click="recordVote(5)" :class="[ isVote(5) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">5</button></li>
      <li><button value="8" @click="recordVote(8)" :class="[ isVote(8) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">8</button></li>
      <li><button value="13" @click="recordVote(13)" :class="[ isVote(13) ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">13</button></li>
      <li><button value="?" @click="recordVote('?')" :class="[ isVote('?') ? 'btn-blue' : 'btn-gray', 'btn text-xl w-16' ]">?</button></li>
    </ul>
    <div class="mt-2 sm:max-w-xs">
      <div
        v-if="showPassInstructional"
        @click="dismissPassInstructional()"
        class="py-2 px-3 flex items-start rounded bg-blue-50 text-blue-900 shadow my-4 xl:absolute xl:-ml-80 xl:-mt-12 xl:w-72"
      >
        <div>
          <span class="font-semibold">You can <i>Pass</i> if you don't plan on voting.</span>
          This is helpful so somebody doesn't have to reveal the vote every round.
        </div>
        <button
          data-test="pass-instructional-dismiss-button"
          class="leading-none p-1 -my-1 -mr-1 text-xl"
        >&times;</button>
      </div>
      <div class="flex justify-between">
        <button @click="passVote()" class="italic text-blue-600">Pass</button>
        <button @click="recordVote(null)" class="italic text-gray-600">Clear your vote...</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoteRecorder',
  props: ['value', 'showPassInstructional'],
  methods: {
    isVote: function (points) {
      if (this.value === null) return true
      return points === this.value
    },

    passVote: function () {
      this.$emit('pass')
      if (this.showPassInstructional) {
        this.dismissPassInstructional()
      }
    },

    recordVote: function (points) {
      this.$emit('input', points)
    },

    dismissPassInstructional: function () {
      this.$emit('dismiss-pass-instructional')
    },
  }
}
</script>
