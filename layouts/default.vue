<template>
  <div id="app">
    <TheHeader />

    <div id="main" v-will-change class="main _default">
      <Nuxt
        :key="
          $utils.getPageNameByRoute($route.name) === 'faq-categoryId'
            ? $route.name
            : $route.fullPath
        "
      />
    </div>

    <TheFooter />

    <transition name="fade">
      <TheMobileMenu v-if="$store.state.menu.isActive"></TheMobileMenu>
    </transition>

    <transition name="fade">
      <DocPopup v-if="$store.state.default.popup.isShow" />
    </transition>

    <portal-target name="popups"> </portal-target>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    TheMobileMenu: () => import('~/components/TheMobileMenu'),
    DocPopup: () => import('~/components/DocPopup'),
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
