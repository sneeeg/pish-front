<template>
  <div class="principles">
    <h3 class="principles__title _visually-h4">
      {{ title }}
    </h3>
    <HTMLContent :html="content" />
  </div>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'Principles',
  components: { HTMLContent },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.principles {
  &__title {
    margin-bottom: 1.6rem;
    font-weight: bold;
  }
}
</style>
