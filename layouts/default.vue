<template>
  <div id="app">
    <TheHeader />

    <div id="main" v-will-change class="main _default">
      <Nuxt :key="key" />
    </div>

    <TheFooter />

    <transition name="fade">
      <TheMobileMenu v-if="$store.state.menu.isActive"></TheMobileMenu>
    </transition>

    <transition name="fade">
      <DocPopup v-if="$store.state.default.popup.isShow" />
    </transition>

    <transition name="fade-from-right" appear>
      <ScrollBtn v-if="window.isMobileSize && scrollY >= 700" />
    </transition>

    <portal-target name="popups"> </portal-target>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import ScrollBtn from '~/components/ScrollBtn'

export default {
  components: {
    TheHeader,
    TheFooter,
    TheMobileMenu: () => import('~/components/TheMobileMenu'),
    DocPopup: () => import('~/components/DocPopup'),
    ScrollBtn,
  },
  computed: {
    ...mapState('scroll', { scrollY: 'y' }),
    ...mapState('responsive', ['window']),
    key() {
      const pageName = this.$utils.getPageNameByRoute(this.$route.name)

      return this.$route.name &&
        (pageName === 'faq-categoryId' || pageName === 'analytics-id-program')
        ? this.$route.name
        : this.$route.matched[0].path
    },
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
}
</script>

<style></style>
