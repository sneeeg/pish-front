<template>
  <div id="app">
    <TheHeader />

    <div class="main _default">
      <Nuxt />
    </div>

    <TheFooter />

    <transition name="fade">
      <TheMobileMenu v-if="$store.state.menu.isActive"></TheMobileMenu>
    </transition>
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
