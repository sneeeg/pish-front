<template>
  <p class="post-source">
    {{ lang['news.source'] || 'Источник' }}:
    <a class="hover-opacity" :href="source.href">{{ source.text }}</a>
  </p>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PostSource',
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.post-source {
  @include p;
  margin-bottom: 0;

  a {
    color: $color_accent;
    overflow-wrap: break-word;
  }
}
</style>
