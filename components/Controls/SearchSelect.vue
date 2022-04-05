<template>
  <div :class="['search-select', { _disabled: disabled }]">
    <div
      v-if="label"
      class="search-select__label"
      @click="$refs.select.$el.querySelector('input').focus()"
    >
      {{ label }}<sup v-if="required">*</sup>
    </div>

    <div class="search-select__input">
      <vue-select
        ref="select"
        :selectable="selectable"
        :multiple="multiple"
        :close-on-select="!multiple"
        :searchable="searchable"
        autocomplete="on"
        :options="options"
        :value="value"
        :deselect-from-dropdown="multiple"
        :readonly="disabled"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
        @search="onSearch"
        @option:selected="$emit('selected', $event)"
        @focus="$emit('focus')"
        @open="isOpen = true"
        @close="isOpen = false"
      >
        <template #no-options>
          {{ lang['search.empty'] }}
        </template>

        <template v-if="multiple" #option="option">
          <div class="search-select-option">
            <div
              :class="[
                'search-select-option__box',
                { _active: valueHasOption(option) },
              ]"
            ></div>
            <div class="search-select-option__label">
              {{ option.label }}
            </div>
          </div>
        </template>

        <template v-if="multiple" #selected-option-container>
          {{ '' }}
        </template>
      </vue-select>

      <button
        v-if="!searchable"
        :class="[
          'search-select__caret',
          { _open: isOpen, _greyArrow: greyArrow },
        ]"
        @click="toggleDropdown"
      >
        <SvgIcon name="caret-down" />
      </button>
    </div>

    <div v-if="errorText" class="search-select__error">
      {{ errorText }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchSelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    errorText: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Array],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    greyArrow: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Function,
      default: (option) => true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  watch: {
    value() {
      this.getMultipleValue()
    },
  },
  methods: {
    onSearch(str, loading) {
      this.$emit('search', { str, loading })
    },
    valueHasOption(option) {
      const code = option.code || option.label

      if (typeof this.value === 'string' && code === this.value) return true
      if (typeof this.value !== 'string' && this.value.includes(code))
        return true
    },
    toggleDropdown(e) {
      if (
        this.$refs.select.$el.querySelector('ul').style.visibility === 'hidden'
      ) {
        this.$refs.select.toggleDropdown(e)
      }
    },
    getMultipleValue() {
      this.$nextTick(() => {
        const text = this.$refs.select.$el.querySelector(
          '.vs__selected-options'
        )
        let span = text.querySelector('span')

        if (!span) {
          span = document.createElement('span')
          text.prepend(span)
        }

        if (!this.multiple) return

        if (this.value.length > 1) {
          span.innerHTML = `${
            this.value[0].label ? this.value[0].label : this.value[0]
          } <b>+ ${this.value.length - 1}</b>`
        } else if (this.value.length) {
          span.innerHTML = this.value[0].label || this.value[0]
        } else {
          span.innerHTML = ''
        }
      })
    },
  },
}
</script>

<style lang="scss">
.search-select {
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
    cursor: pointer;

    sup {
      position: relative;
      top: -3px;
      left: 2px;
      color: $color_accent;
      font-size: 1.3rem;
    }
  }

  &__input {
    position: relative;
  }

  &__caret {
    @include btn-reset;

    position: absolute;
    top: calc(50% - 1.1rem);
    right: 1.2rem;
    z-index: 1;

    svg {
      @include box(2.2rem);
      transition: transform 0.3s ease;
      fill: $color_accent;
    }

    &._greyArrow {
      svg {
        fill: $color_grey_text;
      }
    }

    &._open {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  &__error {
    @include text-button-small;
    position: absolute;
    top: calc(100% + 0.6rem);
    color: red;
    font-weight: 400;
    text-transform: none;
  }

  .vs__dropdown-toggle,
  .vs__selected-options,
  .vs__search,
  .vs__selected {
    @include text-small;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .vs__selected-options {
    flex-wrap: nowrap;

    span {
      max-width: 90%;
      @include lineClamp(1);
      background-color: transparent;

      b {
        color: $color_accent;
        font-weight: 400;
      }

      button {
        display: none;
      }
    }
  }

  .vs__dropdown-toggle {
    padding: 1.8rem 1.2rem;
    border: 1px solid #e1e4e8;
    border-radius: 5px;
  }

  .vs__search {
    @include text-small;
    color: $color_grey_text;
  }

  .vs__actions {
    display: none;
  }

  .vs__dropdown-option {
    padding: 1.2rem;
  }

  .vs__dropdown-option--highlight {
    color: $color_accent;
    background: rgba($color_accent, 0.05);
  }

  .vs__dropdown-menu {
    @include text-small;
    @include scrollbar($color_accent);

    z-index: 10;
    border: 1px solid #e1e4e8;
    border-radius: 0 0 5px 5px;
    box-shadow: none;
  }
}

.search-select-option {
  display: flex;
  align-items: center;

  &__box {
    position: relative;
    flex-shrink: 0;
    border: 1px solid $color_accent;
    @include box(1.8rem);

    &::before {
      @include box(1.2rem);
      position: absolute;
      top: calc(50% - 0.6rem);
      left: calc(50% - 0.6rem);
      background-color: $color_accent;
      transform: scale(0);
      transition: transform 0.2s;
      content: '';
      will-change: transform;
    }

    &._active {
      &::before {
        transform: scale(1);
      }
    }
  }

  &__label {
    position: relative;
    top: 1px;
    margin-left: 1.2rem;
  }
}
</style>
