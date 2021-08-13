<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__row">
        <nuxt-link
          to="/"
          :class="['footer__logo', { _en: $i18n.locale === 'en' }]"
        >
          <img
            :src="
              $i18n.locale === 'ru'
                ? '/i/logo-white.svg'
                : '/i/logo-white-en.svg'
            "
            :alt="$store.state.default.settings.siteName"
          />
        </nuxt-link>

        <address class="footer__info">
          <a :href="`tel:${lang['footer.tel.href']}`"
            ><span>{{ lang['footer.tel.text'] }}</span></a
          >
          <a :href="`mailto:${lang['footer.email']}`"
            ><span>{{ lang['footer.email'] }}</span></a
          >
        </address>
      </div>
      <div class="footer__row">
        <p class="footer__copyrights">
          <span>{{ lang['company.copyright'] }}</span>
          <SmartLink :to="settings.policyLink">{{
            lang['footer.policy']
          }}</SmartLink>
        </p>
        <SocIcons />
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'

import SocIcons from '~/components/SocIcons'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'TheFooter',
  components: {
    SmartLink,
    SocIcons,
  },
  computed: {
    ...mapState('default', ['lang', 'settings']),
  },
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  padding: 4rem 0;
  color: #ffffff;
  background: $color_black;

  @include --mobile {
    padding: 3.8rem 0;
  }

  &__content {
    @include container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
  }

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

    @include --mobile {
      flex-direction: column;
    }

    &:not(:last-child) {
      margin: 0 0 4.4rem 0;

      @include --mobile {
        margin-bottom: 3rem;
      }
    }
  }

  &__logo {
    width: 24.6rem;
    height: 4.83rem;

    @include --tablet {
      width: 18rem;
      height: 3.4rem;
    }

    @include --mobile {
      margin-bottom: 3rem;
    }

    img {
      width: 100%;
      height: 100%;
    }

    &._en {
      width: 20.6rem;
      height: 5.3rem;

      @include --tablet {
        width: 16rem;
        height: 4.1rem;
      }

      @include --mobile {
        margin-bottom: 3rem;
      }
    }
  }

  &__info {
    display: flex;
    font-style: normal;

    @include --tablet {
      flex-direction: column;
    }

    > :not(:last-child) {
      margin: 0 4rem 0 0;

      @include --tablet {
        margin: 0 0 1rem 0;
      }
    }

    > a {
      @include hover-underline;
    }
  }

  &__copyrights {
    @include text-small;
    margin: 0;
    opacity: 0.7;

    @include --mobile {
      order: 1;
      margin-top: 2rem;
    }

    a {
      @include hover-opacity;
      margin-left: 8.2rem;
      text-decoration: underline;

      @include --tablet {
        margin: 1rem 0 0;
      }
    }

    @include --tablet {
      > * {
        display: block;
      }
    }
  }
}
</style>
