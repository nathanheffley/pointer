<template>
  <div
    v-if="show"
    :class="`
      py-2 px-3 flex items-start rounded shadow ${classes}
      bg-blue-50 text-blue-900
      dark:bg-gray-700 dark:text-gray-200
    `"
  >
    <div>
      <slot></slot>
    </div>
    <button
      class="leading-none p-1 -my-1 -mr-1 text-xl"
      @click="$emit('dismiss')"
    >&times;</button>
  </div>
</template>

<script>
export default {
  name: 'Instructional',
  props: ['show', 'classes'],
}
</script>
