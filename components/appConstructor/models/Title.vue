<template>
  <h2 class="constructor-title">
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

<style scoped></style>
