<template>
  <form class="header-search" @submit.prevent="onSubmit">
    <div class="header-search__inner" :class="{ '_is-open': isOpen }">
      <button type="button" class="header-search__submit" @click="toggleSearch">
        <svg-icon name="search" />
      </button>
      <input
        v-show="isOpen"
        v-model="search"
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

export default {
  name: 'LangToggler',
  data() {
    return {
      isOpen: false,
      search: '',
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  methods: {
    toggleSearch() {
      if (this.isOpen) {
        this.onSubmit()
      } else {
        this.isOpen = true
      }
    },
    closeSearch() {
      this.isOpen = false
      this.search = ''
    },
    onSubmit() {
      this.$router.push({ path: 'search', query: { q: this.search } })
      this.search = ''
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
    background-color: $color_light_grey;
    transition: width 0.5s ease;

    &._is-open {
      width: 60rem;
      border-bottom: 1px solid $color_grey_text;
    }
  }

  &__submit {
    @include btn-reset;
    width: 1.5rem;
    height: 1.7rem;
    margin: auto 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__input {
    position: absolute;
    top: 0;
    left: 3rem;
    width: calc(100% - 5rem);
    height: 100%;
    border: 0;
    background-color: transparent;
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
