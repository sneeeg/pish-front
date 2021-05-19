<template>
  <button
    v-if="!isLink"
    :aria-label="text"
    :class="['btn', { _disabled: disabled || loading }]"
  >
    <SvgIcon
      v-if="icon"
      :class="['btn__icon', { _hidden: loading }]"
      :name="icon"
    />
    <span :class="['btn__text', { _hidden: loading }]">{{ text }}</span>
    <SvgIcon
      v-if="arrow"
      :class="['btn__arrow', { _hidden: loading }]"
      :name="arrow"
    />
    <Spinner v-if="loading" class="btn__spinner" />
  </button>
  <SmartLink
    v-else
    :to="to"
    :aria-label="text"
    :class="['btn', { _disabled: disabled }]"
  >
    <SvgIcon v-if="icon" class="btn__icon" :name="icon" />
    <span class="btn__text">{{ text }}</span>
    <SvgIcon v-if="arrow" class="btn__arrow" :name="arrow" />
  </SmartLink>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
import Spinner from '~/components/utils/Spinner'

export default {
  name: 'Btn',
  components: { SmartLink, Spinner },
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    arrow: {
      type: String,
      default: 'arrow-right',
    },
    to: {
      type: [String, Object],
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.btn {
  @include btn-reset;
  @include text-button;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2rem;
  color: $color_white;
  font-weight: 400;
  background-color: $color_accent;

  &::before {
    @include box(100%);
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba($color_white, 0.15);
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s ease;
    content: '';
    pointer-events: none;
  }

  @include hover {
    &::before {
      transform: scaleX(1);
    }
  }

  > * {
    display: block;
  }

  &__arrow {
    @include box(1.2rem);
    margin-left: 1.2rem;
  }

  &__spinner {
    @include box(1.8rem);
    position: absolute;
    top: calc(50% - 0.9rem);
    left: calc(50% - 0.9rem);
  }
}
</style>