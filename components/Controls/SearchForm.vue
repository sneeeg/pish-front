<template>
  <form class="search-form" @submit.prevent="emit">
    <div class="search-form-field">
      <SvgIcon class="search-form-field__svg" name="search" />
      <input
        ref="searchInput"
        v-model.trim="request"
        class="search-form-field__input"
        type="text"
        :placeholder="lang['search.placeholder']"
      />
    </div>
    <Btn
      :loading="loading"
      class="search-form__btn"
      :text="lang['search.title']"
    />
  </form>
</template>

<script>
import { mapState } from 'vuex'
import Btn from '~/components/controls/Btn'

export default {
  name: 'SearchForm',
  components: { Btn },
  props: {
    value: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      request: this.value,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  mounted() {
    !this.value && this.$refs.searchInput.focus()
  },
  methods: {
    emit() {
      if (this.request && this.request !== this.value)
        this.$emit('submit', this.request)
    },
  },
}
</script>

<style lang="scss">
.search-form {
  display: flex;

  &__btn {
    flex-shrink: 0;
    width: 16.3rem;
    margin-left: 1.6rem;
  }
}

.search-form-field {
  position: relative;
  flex-grow: 1;
  border-bottom: 1.5px solid $color_grey_text;

  &__svg {
    @include box(1.6rem);
    position: absolute;
    top: calc(50% - 0.8rem);
  }

  &__input {
    @include box(100%);
    @include text-small;
    padding: 0 0 0 3.6rem;
    border: 0;
    background: transparent;
    appearance: none;

    &::placeholder {
      color: $color_black;
    }
  }
}
</style>
