<template>
  <Section>
    <Error :error="error" />
  </Section>
</template>

<script>
import Error from '~/components/Error.vue'
import Section from '~/components/layout/Section'
import pageDefault from '~/assets/js/vue-mixins/page-default'

export default {
  components: {
    Error,
    Section,
  },
  mixins: [pageDefault],
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
