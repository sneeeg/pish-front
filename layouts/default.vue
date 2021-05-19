<template>
  <div id="app">
    <main class="main">
      <Nuxt />
    </main>

    <TheFooter />
  </div>
</template>

<style></style>

<script>
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: {
    TheFooter,
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
