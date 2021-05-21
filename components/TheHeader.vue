<template>
  <header
    ref="header"
    class="header"
    :class="{ '_has-background': hasBackground }"
  >
    <div class="header__info">
      <div class="header__content">
        <a
          class="header__ministry"
          href="#"
          rel="nofollow noopener"
          target="_blank"
        >
          <img src="/i/min-science.svg" alt="" />
        </a>
        <SocIcons class="_header" />
      </div>
    </div>

    <div class="header__content">
      <nuxt-link to="/" class="header__logo">
        <img
          :src="$i18n.locale === 'ru' ? '/i/logo.svg' : '/i/logo-en.svg'"
          alt=""
        />
      </nuxt-link>

      <nav class="header__nav">
        <SmartLink
          v-for="{ text, href } in menus.header"
          :key="text"
          :to="href"
          >{{ text }}</SmartLink
        >
      </nav>

      <div class="header__controls">
        <SearchHeader />
        <LangToggler />
      </div>
      <button type="button" class="header__menu-btn" @click="toggleMenu">
        <i></i>
        <i></i>
        <i></i>
      </button>
    </div>
  </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import SocIcons from '~/components/SocIcons'
import LangToggler from '~/components/Controls/LangToggler'
import SearchHeader from '~/components/Controls/SearchHeader'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'TheHeader',
  components: {
    SocIcons,
    LangToggler,
    SearchHeader,
    SmartLink,
  },
  computed: {
    ...mapState('default', ['menus']),
    hasBackground() {
      return this.$store.state.scroll.y > 50
    },
  },
  methods: {
    ...mapActions('menu', { toggleMenu: 'toggle' }),
  },
}
</script>
<style lang="scss">
.header {
  transition: background-color 0.3s ease;

  ._menu-active & {
    background-color: #fff;
  }

  &__info {
    background-color: #fff;

    .header__content {
      align-items: center;
      padding: 1.3rem 0;

      @include --tablet {
        padding: 0.9rem 0;
      }

      @include --mobile {
        flex-direction: row-reverse;
      }
    }
  }

  &__content {
    @include container;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    padding: 3rem 0 0 0;

    @include --tablet {
      padding: 1.5rem 0 0;
    }
  }

  &__ministry {
    width: 16rem;
    height: 4.2rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__logo {
    position: relative;
    flex-shrink: 0;
    width: 31.3rem;
    height: 6rem;

    @include --tablet {
      width: 24.6rem;
      height: 4.8rem;
    }

    @include --mobile {
      width: 18rem;
      height: 3.5rem;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__nav {
    @include text-small;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 2.3rem;
    margin-left: auto;
    color: #000;
    font-weight: 400;

    @include --tablet {
      display: none;
    }

    > * {
      position: relative;
      transition: color 0.3s ease;

      &.nuxt-link-exact-active {
        color: $color_accent;
      }

      @include hover {
        color: $color_accent;
      }
    }

    > :not(:last-child) {
      margin-right: 4.6rem;
    }
  }

  &__controls {
    display: flex;
    align-items: center;

    @include --tablet {
      display: none;
    }

    .header-search {
      margin: 0 3.7rem 0 2.1rem;
    }
  }

  &__menu-btn {
    @include btn-reset;
    position: relative;
    width: 2.2rem;
    height: 1.5rem;
    margin: auto 0;

    @include --from-tablet {
      display: none;
    }

    i {
      position: absolute;
      left: 0;
      display: block;
      width: 2.2rem;
      height: 3px;
      background-color: #000;
      transform: rotate(0deg);
      transform-origin: center;
      transition: transform 0.3s ease, background-color 0.3s ease;
      content: '';

      &:nth-child(1) {
        top: 0;
      }

      &:nth-child(2) {
        top: 0.6rem;
        transform-origin: left center;
      }

      &:nth-child(3) {
        top: 1.2rem;
      }

      ._menu-active & {
        top: 50%;

        &:nth-child(1) {
          transform: translateY(-50%) rotate(45deg);
        }

        &:nth-child(2) {
          transform: scale(0);
        }

        &:nth-child(3) {
          transform: translateY(-50%) rotate(-45deg);
        }
      }
    }
  }
}
</style>
