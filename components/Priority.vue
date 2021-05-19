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
  display: flex;
  padding: 2.4rem 0;

  @include --tablet {
    padding: 0.8rem 0;
  }

  &__icon-wrapper {
    display: flex;
    flex: 0 0 21%;
    align-items: flex-start;
    justify-content: center;
    margin-right: 2.4rem;

    @include --tablet {
      margin-right: 1.6rem;
    }

    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  > .html-content {
    margin-top: 2.4rem;

    @include --tablet {
      margin-top: 1.6rem;
    }
  }
}
</style>
