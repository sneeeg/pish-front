<template>
  <SmartLink class="arrow-link hover-accent-light" :aria-label="text" :to="to">
    <span>{{ text }}</span
    ><SvgIcon
      :class="['arrow-link__svg', { _left: arrowLeft }]"
      :name="arrowLeft ? 'arrow-left' : 'arrow-right'"
    />
  </SmartLink>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'ArrowLink',
  components: { SmartLink },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    arrowLeft: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.arrow-link {
  @include text-button;
  display: flex;
  align-items: center;
  color: $color_accent;

  &__svg {
    @include box(1rem);
    margin-left: 0.6rem;
    transition: transform 0.3s ease;

    &._left {
      order: -1;
      margin: 0 0.6rem 0 0;
    }
  }

  @include hover {
    svg {
      transform: translateX(4px);

      &._left {
        transform: translateX(-4px);
      }
    }
  }
}
</style>
