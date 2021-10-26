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
      <v-select
        ref="select"
        :multiple="multiple"
        :close-on-select="!multiple"
        :searchable="searchable"
        autocomplete="on"
        :options="options"
        :value="value"
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

        <template v-if="multiple" #selected-option-container="option">
          {{ option }}
        </template>
      </v-select>

      <button
        :class="['search-select__caret', { _open: isOpen }]"
        @click="toggleDropdown"
      >
        <SvgIcon v-if="!searchable" name="caret-down" />
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
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
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
      this.$refs.select.toggleDropdown(e)
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

    &._open {
      svg {
        transform: rotate(180deg);
      }
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
      background-color: transparent;

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
    flex-shrink: 0;
    position: relative;
    @include box(1.6rem);
    border: 1px solid $color_accent;

    &::before {
      @include box(1rem);
      top: calc(50% - 0.5rem);
      left: calc(50% - 0.5rem);
      background-color: $color_accent;
      position: absolute;
      content: '';
      transition: transform 0.3s ease;
      will-change: transform;
      transform: scale(0);
    }

    &._active {
      &::before {
        transform: scale(1);
      }
    }
  }

  &__label {
    margin-left: 1.2rem;
  }
}
</style>
