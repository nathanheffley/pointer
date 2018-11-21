<template>
  <li class="mt-2 flex">
    <img :src="icon" class="mr-2 h-8" />
    <span class="text-overflow-ellipsis" v-text="$props.user.username"></span>
  </li>
</template>

<script>
export default {
  props: ['user', 'self'],
  computed: {
    icon: function () {
      if (this.$props.user.vote) {
        return '/static/check.svg'
      } else {
        return '/static/ellipsis.svg'
      }
    }
  }
}
</script>
