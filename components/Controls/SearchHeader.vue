<template>
  <form
    :class="[
      'header-search',
      { _disabled: routing.currentPageName === 'search' },
    ]"
    @submit.prevent="onSubmit"
  >
    <div class="header-search__inner" :class="{ '_is-open': isOpen }">
      <SearchBtn
        type="button"
        class="header-search__submit"
        @click.native="toggleSearch"
      />
      <input
        v-show="isOpen"
        ref="headerSearchInput"
        v-model.trim="search"
        type="text"
        :placeholder="lang['search.placeholder']"
        class="header-search__input"
      />
      <button
        v-show="isOpen"
        type="button"
        class="header-search__close"
        @click="closeSearch"
      >
        <i></i>
        <i></i>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import SearchBtn from '~/components/controls/SearchBtn'

export default {
  name: 'SearchHeader',
  components: { SearchBtn },
  data() {
    return {
      isOpen: false,
      search: '',
    }
  },
  computed: {
    ...mapState('default', ['lang', 'routing']),
  },
  methods: {
    toggleSearch() {
      if (this.isOpen) {
        this.onSubmit()
      } else {
        this.isOpen = true
        setTimeout(() => this.$refs.headerSearchInput.focus())
      }
    },
    closeSearch() {
      this.isOpen = false
      this.search = ''
    },
    onSubmit() {
      if (!this.search) return

      this.$router.push(
        this.localePath({ name: 'search', query: { request: this.search } })
      )
      this.closeSearch()
    },
  },
}
</script>

<style lang="scss">
.header-search {
  position: relative;
  width: 1.5rem;
  height: 1.7rem;

  &__inner {
    position: absolute;
    top: -1rem;
    right: 0;
    bottom: -1rem;
    display: flex;
    width: 100%;
    background-color: $color_background;
    transition: width 0.5s ease;

    &._is-open {
      width: 74rem;
      border-bottom: 1px solid $color_grey_text;
    }
  }

  &__input {
    @include text-small;
    position: absolute;
    top: 0;
    left: 3rem;
    width: calc(100% - 5rem);
    height: 100%;
    border: 0;
    color: $color_black;
    color: $color_black;
    background-color: transparent;

    &::placeholder {
      color: $color_black;
    }
  }

  &__close {
    @include btn-reset;
    position: absolute;
    top: 50%;
    right: 0;
    width: 1.8rem;
    height: 1.8rem;
    margin: auto 0;
    transform: translateY(-50%);

    i {
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 2rem;
      height: 1px;
      background-color: #000;
      transform-origin: center;
      content: '';

      &:nth-child(1) {
        transform: translateY(-50%) rotate(45deg);
      }

      &:nth-child(2) {
        transform: translateY(-50%) rotate(-45deg);
      }
    }
  }
}
</style>
