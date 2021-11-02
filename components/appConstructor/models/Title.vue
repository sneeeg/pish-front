<template>
  <h2 class="constructor-title _visually-h3">
    {{ title }}
  </h2>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss"></style>
