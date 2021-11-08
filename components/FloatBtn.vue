<template>
  <a href="" class="float-btn" @click.prevent="$emit('click')">
    <SvgIcon :name="icon" />
  </a>
</template>

<script>
export default {
  name: 'FloatBtn',
  props: {
    icon: {
      type: String,
      default: 'caret-top',
    },
  },
}
</script>

<style lang="scss">
.float-btn {
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  z-index: 2;
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
