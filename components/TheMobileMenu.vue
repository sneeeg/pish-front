<template>
  <div v-if="!isDesktop" class="menu">
    <div class="menu__scroll-wrap">
      <div class="menu__content">
        <form @submit.prevent="onSubmit">
          <label for="search" class="menu__search">
            <input id="search" v-model="search" placeholder="поиск" />

            <button class="menu__search-btn"><svg-icon name="search" /></button>
          </label>
        </form>

        <nav class="menu__nav">
          <SmartLink
            v-for="{ text, href } in menus.header"
            :key="text"
            :to="href"
            >{{ text }}</SmartLink
          >

          <LangToggler />
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import LangToggler from '~/components/Controls/LangToggler'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'TheMenu',
  components: {
    LangToggler,
    SmartLink,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState('default', ['menus']),
    ...mapState('responsive', ['window']),
    isDesktop() {
      return this.window.isDesktopSize
    },
  },
  updated() {
    if (this.window.isDesktopSize) {
      this.closeMenu()
    }
  },
  methods: {
    ...mapActions('menu', { closeMenu: 'close' }),
    onSubmit() {
      this.$router.push({ path: 'search', query: { q: this.search } })
    },
  },
}
</script>
<style lang="scss">
.menu {
  position: absolute;
  top: 11rem;
  left: 0;
  z-index: 9;
  width: 100%;
  height: calc(100% - 11rem);
  background-color: #fff;

  @include --from-tablet {
    display: none;
  }

  &__scroll-wrap {
    position: relative;
    z-index: 10;
    height: 100%;
    padding: 2rem 0 4rem 0;
    overflow: hidden auto;
    -webkit-overflow-scrolling: touch;
  }

  &__content {
    @include container;
    z-index: 10;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin: 0 auto;
  }

  &__search {
    position: relative;

    input {
      width: 100%;
      padding: 0.8rem 5rem 0.8rem 1.3rem;
      border: 0;
      border-radius: 3px;
      background-color: #f6f7f8;
    }
  }

  &__search-btn {
    @include btn-reset;
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    width: 5rem;
    height: 100%;
    transform: translateY(-50%);

    svg {
      width: 1.3rem;
      height: 1.4rem;
      margin: auto;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4.6rem;
    font-weight: 500;

    > * {
      position: relative;
      transition: color 0.3s ease;

      &.nuxt-link-exact-active {
        color: $color_accent;
      }

      &:not(:last-child) {
        margin-bottom: 4.6rem;
      }
    }
  }
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>