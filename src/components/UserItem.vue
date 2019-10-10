<template>
  <li class="mt-2 flex items-center group">
    <img :src="icon" class="mr-2 h-8 w-8" :class="[ faded ? 'opacity-50' : '' ]" />
    <input v-if="editingName" ref="nameInput" v-model="name" @keyup.enter="editingName = false" class="min-w-0 input-underline" />
    <span v-else :class="[ user.pass && !faded ? 'text-gray-700' : '', faded ? 'text-gray-400' : '', 'text-overflow-ellipsis' ]" v-text="user.username"></span>

    <button v-if="self" @click="editingName = !editingName" :class="[ editingName ? 'opacity-100' : 'opacity-0' ]" class="ml-2 flex-shrink-0 group-hover:opacity-100 focus:opacity-100">
      <img v-if="editingName" src="/static/save.svg" class="h-6 w-6" alt="Save Name" title="Save Name" />
      <img v-else src="/static/edit.svg" class="h-6 w-6" alt="Change Name" title="Change Name" />
    </button>
  </li>
</template>

<script>
export default {
  props: ['self', 'user', 'hovering'],
  data () {
    return {
      name: '',
      editingName: false,
    }
  },

  watch: {
    editingName: function (value) {
      if (value) {
        this.name = this.user.username
        this.$nextTick(() => {
          this.$refs.nameInput.focus();
        })
      } else {
        this.updateName()
      }
    }
  },

  computed: {
    icon: function () {
      if (this.user.pass) {
        return '/static/arrow.svg'
      }

      if (this.user.vote !== null) {
        return '/static/check.svg'
      }

      return '/static/ellipsis.svg'
    },

    faded: function () {
      if (this.$props.hovering === null) {
        return false
      }
      return this.$props.user.vote != this.$props.hovering
    }
  },

  methods: {
    updateName: function () {
      localStorage.username = this.name
      this.$emit('usernameChange', this.name)
    }
  }
}
</script>
