<template>
  <div>
    <button v-if="enabled" @click="$emit('click')" class="mt-2 block w-full btn btn-blue"><slot></slot></button>
    <button v-else class="mt-2 block w-full btn btn-blue hover:bg-blue opacity-50 cursor-not-allowed" disabled><slot></slot></button>
  </div>
</template>

<script>
export default {
  props: ['enabled']
}
</script>
