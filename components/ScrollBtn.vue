<template>
  <a href="" class="scroll-btn" @click.prevent="scrollToTop">
    <SvgIcon name="caret-top" />
  </a>
</template>

<script>
export default {
  name: 'ScrollBtn',
  methods: {
    scrollToTop() {
      this.$scrollTo('body', 500, {
        easing: 'ease-out',
        cancelable: true,
      })
    },
  },
}
</script>

<style lang="scss">
.scroll-btn {
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: $color_white;
  background-color: $color_accent;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @include box(4.2rem);

  svg {
    @include box(1.6rem);
  }
}
</style>
