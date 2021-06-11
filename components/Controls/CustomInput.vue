<template>
  <div class="custom-input">
    <label v-if="label" :for="name" class="custom-input__label">{{
      label
    }}</label>
    <input
      :id="name"
      ref="input"
      class="custom-input__input"
      :type="type"
      :value="value"
      :name="name"
      :aria-label="placeholder"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <div v-if="errorText" class="custom-input__error">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
import IMask from 'imask'

export default {
  name: 'CustomInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorText: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      phoneMask: null,
    }
  },
  mounted() {
    if (this.type === 'tel') {
      this.phoneMask = IMask(this.$refs.input, { mask: '+{7}(000)000-00-00' })
    }
  },

  beforeDestroy() {
    this.phoneMask?.destroy()
  },
}
</script>

<style lang="scss">
.custom-input {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 3.2rem;

  &__label {
    @include text-button-small;
    margin-bottom: 0.6rem;
    color: $color_grey_text;
    font-weight: 400;
    text-transform: uppercase;
  }

  &__input {
    @include text-small;
    padding: 1.8rem 1.2rem;
    border: 1px solid #e1e4e8;
    border-radius: 5px;
    background: transparent;
    transition: border-color 0.5s ease;
    appearance: none;

    &:focus {
      border-color: $color_accent;
    }

    &::placeholder {
      color: $color_grey_text;
    }
  }

  &__error {
    position: absolute;
    bottom: -2rem;
    color: red;
    font-weight: 400;
    text-transform: none;
    @include text-button-small;
  }
}
</style>
