<template>
  <div class="tasks">
    <HTMLContent v-scroll-element class="tasks__content" :html="content" />
    <div
      v-if="window.isDesktopSize"
      v-scroll-element="'right'"
      class="tasks__image"
    >
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'Tasks',
  components: { HTMLContent },
  props: {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '/i/tasks/1.png',
    },
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.tasks {
  display: flex;
  align-items: center;

  &__image {
    flex-shrink: 0;
    width: 49.4rem;
    height: 37.6rem;
    margin-left: 12.8rem;

    img {
      @include box(100%);
    }
  }
}
</style>
