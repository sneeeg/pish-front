<template>
  <button
    :title="lang['search.title']"
    :aria-label="lang['search.title']"
    class="search-btn"
  >
    <svg-icon name="search" />
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchBtn',
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.search-btn {
  @include btn-reset;
  @include box(1.6rem);
  margin: auto 0;
  color: $color_black;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
