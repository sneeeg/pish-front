<template>
  <div v-if="!isDesktop" ref="menu" class="menu">
    <div class="menu__scroll-wrap">
      <div class="menu__content">
        <form @submit.prevent="onSubmit">
          <label for="search" class="menu__search">
            <input
              id="search"
              v-model="search"
              :placeholder="lang['search.placeholder']"
            />

            <button class="menu__search-btn"><svg-icon name="search" /></button>
          </label>
        </form>

        <nav class="menu__nav">
          <LangToggler />

          <SmartLink
            v-for="{ text, href } in menus.header"
            :key="text"
            :to="href"
            >{{ text }}</SmartLink
          >
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import SmartLink from '~/components/utils/SmartLink'
import LangToggler from '~/components/controls/LangToggler'

export default {
  name: 'TheMenu',
  components: {
    SmartLink,
    LangToggler,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState('default', ['menus', 'lang']),
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
      this.$router.push(
        this.localePath({ name: 'search', query: { request: this.search } })
      )
    },
  },
  mounted() {
    disableBodyScroll(this.$refs.menu)
  },
  beforeDestroy() {
    enableBodyScroll(this.$refs.menu)
  },
}
</script>
<style lang="scss">
.menu {
  position: absolute;
  top: 15.1rem;
  left: 0;
  z-index: 9;
  width: 100%;
  height: calc(100vh - 15.1rem);
  background-color: #fff;

  @include --from-tablet {
    display: none;
  }

  @include --mobile {
    top: 11.9rem;
    height: calc(100vh - 11.9rem);
  }

  &__scroll-wrap {
    position: relative;
    z-index: 10;
    height: 100%;
    padding: 1rem 0 4rem 0;
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
    display: block;
    height: 100%;

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
