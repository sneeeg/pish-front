<template>
  <SmartLink class="arrow-link hover-accent-light" :aria-label="text" :to="to">
    <span>{{ text }}</span
    ><SvgIcon name="arrow-right" />
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
  },
}
</script>

<style lang="scss">
.arrow-link {
  @include text-button;
  display: flex;
  align-items: center;
  color: $color_accent;

  svg {
    @include box(1rem);
    margin-left: 0.6rem;
    transition: transform 0.3s ease;
  }

  @include hover {
    svg {
      transform: translateX(4px);
    }
  }
}
</style>
