<template>
  <div id="app">
    <TheHeader />

    <div id="main" v-will-change class="main _default">
      <Loader v-show="pageLoading" />

      <Nuxt v-show="!pageLoading" :key="key" />
    </div>

    <TheFooter />

    <transition name="fade">
      <TheMobileMenu v-if="$store.state.menu.isActive"></TheMobileMenu>
    </transition>

    <transition name="fade">
      <DocPopup v-if="$store.state.default.popup.isShow" />
    </transition>

    <transition name="fade-from-right" appear>
      <FloatBtn v-if="scrollBtnExist" @click="scrollToTop" />
    </transition>

    <portal-target name="popups"> </portal-target>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import FloatBtn from '~/components/FloatBtn'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader,
    TheHeader,
    TheFooter,
    TheMobileMenu: () => import('~/components/TheMobileMenu'),
    DocPopup: () => import('~/components/DocPopup'),
    FloatBtn,
  },
  computed: {
    ...mapState('scroll', { scrollY: 'y' }),
    ...mapState('responsive', ['window']),
    ...mapState('default', ['pageLoading']),

    key() {
      if (this.$route.query.tag) {
        return this.$route.fullPath
      }

      const pageName = this.$utils.getPageNameByRoute(this.$route.name)

      if (!pageName) return this.$route.fullPath

      return this.$route.name && pageName === 'faq-categoryId'
        ? this.$route.name
        : this.$route.matched[0].path
    },
    scrollBtnExist() {
      const pageName = this.$utils.getPageNameByRoute(this.$route.name)

      return (
        ((pageName === 'analytics-id-program' && this.window.isDesktopSize) ||
          (pageName !== 'analytics-id-program' && this.window.isMobileSize)) &&
        this.scrollY >= 700
      )
    },
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
  methods: {
    scrollToTop() {
      this.$scrollTo('body', 500, {
        easing: 'ease-out',
        cancelable: true,
      })
    },
  },
}
</script>
