<template>
  <div>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.documents.title"
    >
      <DocumentsComponent :documents="page.documents.items" />
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import DocumentsComponent from '~/components/Documents'

export default {
  name: 'Documents',
  components: { Section, DocumentsComponent },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style scoped></style>
