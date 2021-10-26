<template>
  <div class="file">
    <a class="file__link hover-opacity" href="" download :aria-label="text">
      <SvgIcon name="download"></SvgIcon>
    </a>

    <div v-if="text" class="file__text">
      <div class="file__name">{{ text }}</div>
      <div v-if="_size" class="file__size">{{ _size }}.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'File',
  props: {
    href: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    _size() {
      if (!this.size) {
        return 0
      } else if (typeof this.size === 'string') {
        return this.size
      } else {
        return this.$utils.formatBytes(this.size, this.$i18n.locale)
      }
    },
  },
}
</script>

<style lang="scss">
.file {
  display: flex;

  &__link {
    @include box(3.2rem);

    display: flex;
    align-items: center;
    justify-content: center;
    color: $color_white;
    background-color: $color_accent;

    svg {
      @include box(2rem);
    }
  }

  &__text {
    margin-left: 1.2rem;

    > * {
      &:last-child {
        margin-top: 0.6rem;
      }
    }
  }

  &__name {
    width: 13rem;
    color: $color_dark_grey;
    font-weight: 600;
    line-height: 1;
  }

  &__size {
    @include text-button-small;

    color: $color_grey_text;
    font-weight: normal;
  }
}
</style>
