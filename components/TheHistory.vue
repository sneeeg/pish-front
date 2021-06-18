<template>
  <div class="history">
    <article
      v-for="{ title, text } in events"
      :key="title"
      class="history-item"
    >
      <h4 class="history-item__title">{{ title }}</h4>
      <HTMLContent :html="text" />
    </article>
  </div>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'TheHistory',
  components: { HTMLContent },
  props: {
    events: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.history {
}

.history-item {
  position: relative;
  margin-left: 1.4rem;
  padding: 0 0 5.6rem 10rem;
  border-left: 2px solid $color_grey_text;

  &:last-child {
    padding-bottom: 0;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: calc(100% + 8.4rem);
      background: $color_grey_text;
      transform: translateX(calc(-50% - 1px));
      content: '';
    }
  }

  &:first-child {
    border-color: $color_red;

    &::before {
      @include box(2.8rem);
      background: $color_red;
    }
  }

  &:nth-child(2) {
    &::before {
      background: $color_red;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 70%;
      background: linear-gradient(to bottom, $color_red, transparent);
      transform: translateX(calc(-50% - 1px));
      content: '';
    }
  }

  &::before {
    @include box(1.2rem);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: $color_grey_text;
    transform: translateX(calc(-50% - 1px));
    content: '';
  }

  &__title {
    margin-bottom: 1.6rem;
  }
}
</style>
