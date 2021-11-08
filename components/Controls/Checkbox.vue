<template>
  <label :class="['checkbox', { _readonly: readonly, _black: black }]">
    {{ label }}
    <input
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="update"
    />
    <span><svg-icon name="check" /></span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number],
    modelValue: {
      type: [Boolean, Array],
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    trueValue: {
      type: Boolean,
      default: true,
    },
    falseValue: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    black: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isChecked() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === this.trueValue
    },
  },
  methods: {
    update(event) {
      if (this.readonly) return

      const isChecked = event.target.checked

      if (Array.isArray(this.modelValue)) {
        const newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    },
  },
}
</script>

<style lang="scss">
.checkbox {
  @include text-button-small;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  color: $color_grey_text;
  font-weight: 400;
  user-select: none;

  &._readonly {
    pointer-events: none;
  }

  &._black {
    color: $color_black;
  }

  input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    @include box(100%);

    &:checked ~ span svg {
      transform: scale(1);
    }
  }

  span {
    position: absolute;
    top: calc(50% - 1rem);
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color_grey_text;
    border-radius: 5px;
    @include box(1.8rem);

    svg {
      @include box(70%);
      color: $color_accent;
      transform: scale(0);
      transition: transform 0.15s;
    }
  }
}
</style>
