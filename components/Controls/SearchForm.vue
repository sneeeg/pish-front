<template>
  <form class="search-form" @submit.prevent="emit">
    <div class="search-form-field">
      <SvgIcon
        v-if="window.isDesktopSize"
        class="search-form-field__svg"
        name="search"
      />
      <input
        ref="searchInput"
        v-model.trim="request"
        class="search-form-field__input"
        type="text"
        :placeholder="lang['search.placeholder']"
      />
    </div>
    <Btn
      v-if="window.isDesktopSize"
      :loading="loading"
      class="search-form__btn"
      :text="lang['search.title']"
    />
    <SearchBtn v-else class="search-form__btn" />
  </form>
</template>

<script>
import { mapState } from 'vuex'
import Btn from '~/components/controls/Btn'
import SearchBtn from '~/components/controls/SearchBtn'

export default {
  name: 'SearchForm',
  components: { SearchBtn, Btn },
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
    ...mapState('responsive', ['window']),
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

  @include --tablet {
    border-bottom: 1px solid $color_grey_text;
  }

  &__btn {
    flex-shrink: 0;
    margin-left: 1.6rem !important;

    @include --from-tablet {
      width: 16.3rem;
    }
  }
}

.search-form-field {
  position: relative;
  flex-grow: 1;
  height: 4.7rem;
  border-bottom: 1px solid $color_grey_text;

  @include --tablet {
    border-bottom: 0;
  }

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

    @include --tablet {
      padding: 0;
    }

    &::placeholder {
      color: $color_black;
    }
  }
}
</style>
