<template>
  <SmartLink
    v-if="!isDiv"
    class="arrow-link hover-accent-light"
    :aria-label="text"
    :to="to"
  >
    <span>{{ text }}</span
    ><SvgIcon
      :class="['arrow-link__svg', { _left: arrowLeft }]"
      :name="arrowLeft ? 'arrow-left' : 'arrow-right'"
    />
  </SmartLink>
  <div v-else class="arrow-link">
    <span>{{ text }}</span
    ><SvgIcon
      :class="['arrow-link__svg', { _left: arrowLeft }]"
      :name="arrowLeft ? 'arrow-left' : 'arrow-right'"
    />
  </div>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'ArrowLink',
  components: { SmartLink },
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    arrowLeft: {
      type: Boolean,
      default: false,
    },
    isDiv: {
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

  span {
    position: relative;
    top: 1px;
  }

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
