<template>
  <div id="app">
    <div class="main _error">
      <Section>
        <Error :error="error" />
      </Section>
    </div>

    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue'
import Error from '~/components/Error.vue'

export default {
  components: {
    TheFooter,
    Error,
  },
  layout: 'error',
  data() {
    return {
      error: {
        ststusCode: 404,
      },
    }
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
