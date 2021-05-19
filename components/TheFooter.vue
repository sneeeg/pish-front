<template>
  <footer class="footer">
    <div class="footer__content">
      <address class="footer__info">
        <p>{{ lang['company.copyright'] }}</p>
        <a :href="lang['company.tel-href']"
          ><span>{{ lang['company.tel-text'] }}</span></a
        >
        <a :href="`mailto:${lang['company.email']}`"
          ><span>{{ lang['company.email'] }}</span></a
        >
      </address>

      <div class="footer__socials">
        <p>Подпишитесь на нас в соцсетях:</p>
        <SocIcons></SocIcons>
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
  padding: 4.5rem 0 5.8rem 0;
  color: #ffffff;
  background: $color_dark_grey;

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

  &__info {
    @include text-small;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-style: normal;

    @include --mobile {
      margin-bottom: 2.8rem;
    }

    > :not(:last-child) {
      margin: 0 0 0.8em 0;
    }

    > a {
      @include hover-underline;
    }
  }

  &__socials {
    p {
      margin: 0 0 1.6rem 0;
    }
  }
}
</style>
