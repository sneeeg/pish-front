<template>
  <button
    type="button"
    :aria-label="type"
    :class="['control-btn', `_${type}`, { _disabled: disabled }]"
  >
    <SvgIcon :name="iconName" />
  </button>
</template>

<script>
export default {
  name: 'ControlBtn',
  props: {
    type: {
      type: String,
      default: 'prev',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      if (this.type === 'prev') {
        return 'arrow-left'
      }
      return 'arrow-right'
    },
  },
}
</script>

<style lang="scss">
.control-btn {
  @include btn-reset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: $color_accent;
  transition: color 0.3s ease;

  @include hover {
    color: $color_accent_light;
  }

  svg {
    @include box(2rem);
  }
}
</style>
