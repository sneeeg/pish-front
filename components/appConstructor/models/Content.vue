<template>
  <HTMLContent :html="content" />
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'Content',
  components: { HTMLContent },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
h1 {
  font-size: 2rem;
}
</style>
