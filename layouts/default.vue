<template>
  <div id="app">
    <div class="main _default">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
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
