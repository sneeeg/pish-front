<template>
  <HTMLContent ref="content" class="constructor-content" :html="content" />
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
  mounted() {
    this.$refs.content.$el.innerHTML = this.$refs.content.$el.innerHTML.replace(
      /&nbsp;|•/g,
      ' '
    )
  },
}
</script>

<style lang="scss">
.constructor-content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @include text();
    font-weight: 500;
  }
}
</style>
