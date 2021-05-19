<template>
  <div id="app">
    <div class="main _default">
      <Nuxt />
    </div>

    <TheFooter />
  </div>
</template>

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
