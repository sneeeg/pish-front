<template>
  <div class="search-select">
    <div v-if="label" class="search-select__label">{{ label }}</div>
    <v-select
      autocomplete="on"
      :options="options"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
      @search="onSearch"
      @option:selected="$emit('selected', $event)"
    >
      <template #no-options>
        {{ lang['search.empty'] }}
      </template>
    </v-select>
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
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  methods: {
    onSearch(str, loading) {
      this.$emit('search', { str, loading })
    },
  },
}
</script>

<style lang="scss">
.search-select {
  position: relative;
  z-index: 1;
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
    border: 1px solid #e1e4e8;
    border-radius: 0 0 5px 5px;
    box-shadow: none;
  }
}
</style>
