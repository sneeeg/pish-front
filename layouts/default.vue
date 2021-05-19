<template>
  <div id="app">
    <TheHeader />

    <main class="main">
      <Nuxt />
    </main>

    <TheFooter />

    <transition name="slide-right">
      <TheMobileMenu v-if="$store.state.menu.isActive"></TheMobileMenu>
    </transition>
  </div>
</template>

<style></style>

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
