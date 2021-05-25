<template>
  <div class="priority">
    <div class="priority__icon-wrapper">
      <img :src="icon" />
    </div>
    <HTMLContent :html="content" />
  </div>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'PriorityBlock',
  components: { HTMLContent },
  props: {
    icon: {
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
.priority {
  @include text-small;
  display: flex;
  padding: 2.4rem 0;

  @include --tablet {
    padding: 0.8rem 0;
  }

  &__icon-wrapper {
    display: flex;
    flex: 0 0 6rem;
    align-items: center;
    justify-content: center;
    max-width: 6rem;
    max-height: 6rem;
    margin-right: 2.4rem;

    @include --tablet {
      margin-right: 2rem;
    }

    @include --mobile {
      flex: 0 0 4rem;
      max-width: 4rem;
      max-height: 4rem;
    }

    > img {
      @include adaptiveImg(50%, 50%, contain);
    }
  }
}
</style>
