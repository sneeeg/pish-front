<template>
  <div :class="['custom-input', { _disabled: disabled }]">
    <label v-if="label" :for="name" class="custom-input__label"
      >{{ label }}<sup v-if="required">*</sup></label
    >

    <DatePicker
      v-if="calendar"
      :placeholder="placeholder"
      :value="value"
      :type="calendar"
      @input="update"
    >
    </DatePicker>

    <template v-else>
      <input
        v-if="type !== 'textarea'"
        :id="name"
        ref="input"
        v-imask="mask"
        class="custom-input__input"
        :type="type"
        :accept="type === 'file' ? acceptFormats : false"
        :value="value"
        :name="name"
        :aria-label="placeholder"
        :placeholder="placeholder"
        @input="update"
        @accept="accept"
      />

      <textarea
        v-else
        :id="name"
        ref="input"
        rows="10"
        cols="20"
        class="custom-input__input"
        :value="value"
        :name="name"
        :aria-label="placeholder"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      >
      </textarea>
    </template>

    <div v-if="errorText" class="custom-input__error">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
import { IMaskDirective } from 'vue-imask'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'

export default {
  name: 'CustomInput',
  directives: {
    imask: IMaskDirective,
  },
  components: { DatePicker },
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
      type: [String, Date],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maskType: {
      type: String,
      default: '',
    },
    calendar: {
      type: String,
      default: '',
    },
    acceptFormats: {
      type: String,
      default: '.jpg, .jpeg, .png',
    },
    maxFileSize: {
      type: Number,
      default: 10000000,
    },
  },
  computed: {
    mask() {
      let result = null

      switch (this.maskType) {
        case 'tel':
          result = { mask: '+{7}(000)000-00-00' }
          break

        case 'age':
          result = { mask: Number, min: 0, max: 99 }
          break

        case 'count':
          result = { mask: Number, min: 0, max: 999 }
          break
      }

      return result
    },
  },

  methods: {
    update(e) {
      if (this.maskType) return

      const value = e?.target?.value ?? e ?? ''

      this.$emit('input', value)

      if (this.type === 'file') {
        const files = this.$refs.input.files || []
        const file = files[0] ?? null

        if (!file) {
          this.$emit('onFileChange', file)

          return
        }

        const types = this.acceptFormats.split(',').reduce((acc, item) => {
          const str = item.trim().slice(1, item.length)
          acc.push('image/' + str)

          return acc
        }, [])

        if (!types.includes(file.type)) {
          this.$emit('onFileError', 'Неверный формат')
        } else if (file.size > this.maxFileSize) {
          this.$emit('onFileError', 'Превышен допустимы размер файла')
        } else {
          this.$emit('onFileChange', file)
        }
      }
    },

    accept(e) {
      const value = e.target.value

      this.$emit('input', value)
    },
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

    sup {
      position: relative;
      top: -3px;
      left: 2px;
      color: $color_accent;
      font-size: 1.3rem;
    }
  }

  .mx-datepicker {
    width: 100%;
  }

  .mx-icon-calendar {
    right: 1.6rem;
    color: $color_accent;
  }

  &__input,
  .mx-input {
    @include text-small;
    height: auto;
    padding: 1.8rem 1.2rem;
    border: 1px solid #e1e4e8;
    border-radius: 5px;
    background: transparent;
    transition: border-color 0.5s ease;
    appearance: none;
    resize: none;

    //&:focus {
    //  border-color: $color_accent;
    //}

    &::placeholder {
      color: $color_grey_text;
    }
  }

  &__error {
    @include text-button-small;
    position: absolute;
    bottom: -2rem;
    color: red;
    font-weight: 400;
    text-transform: none;
  }
}
</style>
