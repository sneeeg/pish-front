<template>
  <div class="loader">
    <Spinner />

    <div class="loader__text">{{ text || lang['base.loading'] }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '~/components/utils/Spinner'
export default {
  name: 'Loader',
  components: { Spinner },
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.loader {
  @include box(100%);
  @include text-medium;
  display: flex;

  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    @include box(2.4rem);
  }

  &__text {
    margin-top: 1.6rem;
  }
}
</style>
