<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  name: 'TextContent',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
