<template>
  <Section :title="title" background>
    <HTMLContent />
  </Section>
</template>

<script>
import HTMLContent from '~/components/Utils/HTMLContent'

export default {
  name: 'TextBlock',
  components: { HTMLContent },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss"></style>
