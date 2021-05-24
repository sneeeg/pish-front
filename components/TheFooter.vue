<template>
  <footer v-will-change class="footer">
    <div class="footer__content">
      <div class="footer__row">
        <nuxt-link to="/" class="footer__logo">
          <img
            :src="
              $i18n.locale === 'ru'
                ? '/i/logo-white.svg'
                : '/i/logo-white-en.svg'
            "
            alt=""
          />
        </nuxt-link>

        <address class="footer__info">
          <a :href="lang['company.tel-href']"
            ><span>{{ lang['company.tel-text'] }}</span></a
          >
          <a :href="`mailto:${lang['company.email']}`"
            ><span>{{ lang['company.email'] }}</span></a
          >
        </address>
      </div>
      <div class="footer__row">
        <p class="footer__copyrights">
          {{ lang['company.copyright'] }}
        </p>
        <SocIcons />
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'

import SocIcons from '~/components/SocIcons'

export default {
  name: 'TheFooter',
  components: {
    SocIcons,
  },
  computed: {
    ...mapState('default', ['lang']),
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
    width: 22.9rem;
    height: 6rem;

    @include --tablet {
      width: 18.3rem;
      height: 4.8rem;
    }

    @include --mobile {
      width: 13.4rem;
      height: 3.5rem;
      margin-bottom: 3rem;
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
  }
}
</style>
