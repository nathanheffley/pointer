<template>
  <li class="mt-2 flex">
    <img :src="icon" class="mr-2 h-8 w-8" />
    <span :class="[ $props.user.pass ? 'text-grey-darker' : '', 'text-overflow-ellipsis' ]" v-text="$props.user.username"></span>
  </li>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    icon: function () {
      if (this.$props.user.pass) {
        return '/static/arrow.svg'
      }

      if (this.$props.user.vote !== null) {
        return '/static/check.svg'
      }

      return '/static/ellipsis.svg'
    }
  }
}
</script>
