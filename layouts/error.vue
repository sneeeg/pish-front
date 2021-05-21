<template>
  <Section>
    <Error :error="error" />
  </Section>
</template>

<script>
import Error from '~/components/Error.vue'
import Section from '~/components/layout/Section'

export default {
  components: {
    Error,
    Section,
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
