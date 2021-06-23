<template>
  <header
    ref="header"
    class="header"
    :class="{ '_has-background': hasBackground }"
  >
    <div v-will-change class="header__info gsap_header__info">
      <div class="header__content">
        <SmartLink
          v-will-change
          :to="settings.mainLink"
          class="header__logo hover-opacity"
        >
          <img
            :src="
              $i18n.locale === 'ru'
                ? '/i/min-science-full.svg'
                : '/i/min-science-full-en.svg'
            "
            alt=""
          />
        </SmartLink>

        <div class="header__wrapper">
          <SmartLink
            v-if="false"
            v-will-change
            class="header__account hover-opacity"
            :to="settings.lkLink"
            >{{ lang['base.lk'] }}</SmartLink
          >

          <LangToggler v-if="false" />
        </div>
      </div>
    </div>

    <div v-will-change class="header__content gsap_header__content">
      <SmartLink v-will-change to="/" class="header__logo--full hover-opacity">
        <img
          :src="$i18n.locale === 'ru' ? '/i/logo.svg' : '/i/logo-en.svg'"
          alt=""
        />
      </SmartLink>

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

import LangToggler from '~/components/controls/LangToggler'
import SearchHeader from '~/components/controls/SearchHeader'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'TheHeader',
  components: {
    LangToggler,
    SearchHeader,
    SmartLink,
  },
  computed: {
    ...mapState('default', ['menus', 'settings', 'lang']),
    ...mapState('responsive', ['window']),
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
  position: relative;
  z-index: 11;
  transition: background-color 0.3s ease;

  ._menu-active & {
    background-color: #fff;
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__info {
    background-color: #fff;

    .header__content {
      align-items: center;
      justify-content: space-between;
      padding: 1.4rem 0;

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
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 2rem 0 0 0;

    @include --tablet {
      padding: 1.7rem 0;
    }
  }

  &__logo {
    position: relative;
    display: block;
    flex-shrink: 0;
    width: 16rem;
    height: 4.2rem;

    @include --tablet {
      width: 14rem;
      height: 3.7rem;
    }

    @include --mobile {
      width: 12rem;
      height: 3.2rem;
    }

    &--full {
      position: relative;
      flex-shrink: 0;
      width: 38rem;
      height: 7.3rem;
      margin-right: auto;

      @include --tablet {
        width: 32rem;
        height: 6.2rem;
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

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__account {
    @include text-button-small;
    display: flex;
    align-items: center;
    //margin-right: 4rem;
    color: $color_red;

    &:not(:last-child) {
      margin-right: 4rem;
    }

    &::before {
      @include box(2rem);
      display: block;
      margin-right: 1rem;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM5.07 16.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78A7.893 7.893 0 0110 18c-1.86 0-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 012 10c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM10 4C8.06 4 6.5 5.56 6.5 7.5S8.06 11 10 11s3.5-1.56 3.5-3.5S11.94 4 10 4zm0 5c-.83 0-1.5-.67-1.5-1.5S9.17 6 10 6s1.5.67 1.5 1.5S10.83 9 10 9z' fill='%23F32735'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: cover;
      content: '';

      @include --mobile {
        @include box(1.6rem);
        margin-right: 0.8rem;
      }
    }
  }

  &__nav {
    //@include text-small;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
      margin: 0 0 0 2.1rem;
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
