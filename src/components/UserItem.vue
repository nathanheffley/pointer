<template>
  <li class="mt-2 flex items-center">
    <img :src="icon" class="mr-2 h-8 w-8" :class="[ faded ? 'opacity-50' : '' ]" />
    <span :class="[ $props.user.pass && !faded ? 'text-gray-700' : '', faded ? 'text-gray-400' : '', 'text-overflow-ellipsis' ]" v-text="$props.user.username"></span>
  </li>
</template>

<script>
export default {
  props: ['user', 'hovering'],
  computed: {
    icon: function () {
      if (this.$props.user.pass) {
        return '/static/arrow.svg'
      }

      if (this.$props.user.vote !== null) {
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
  }
}
</script>
