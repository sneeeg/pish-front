<template>
  <a class="file-link hover-opacity" :href="href" download>
    <SvgIcon :name="icon" />

    <span>{{ text || href }}</span>
  </a>
</template>

<script>
export default {
  name: 'FileLink',
  props: {
    href: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'paper',
    },
  },
}
</script>

<style lang="scss">
.file-link {
  @include text-small;

  display: flex;
  align-items: center;
  font-weight: 500;

  span {
    color: $color_dark_grey;
  }

  svg {
    position: relative;
    top: -2px;
    width: 2rem;
    height: 2.5rem;
    margin-right: 1.6rem;
    color: $color_accent;
  }
}
</style>
