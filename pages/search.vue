<template>
  <div>
    <Section
      :title="$i18n.locale === 'ru' ? 'Поиск' : 'Search'"
      :has-overflow="false"
    >
    </Section>
  </div>
</template>

<script>
import Section from '~/components/layout/Section'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'

export default {
  components: {
    Section,
  },
  mixins: [pageDataFetch, pageHead],
}
</script>

<style></style>
