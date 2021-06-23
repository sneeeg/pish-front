<template>
  <div>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.documents.title"
    >
      <div class="documents-list">
        <DocumentsItem
          v-for="doc in page.documents.items"
          :key="doc.id"
          class="documents-list__item"
          :document="doc"
        />
      </div>
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import DocumentsItem from '~/components/DocumentsItem'

export default {
  name: 'Documents',
  components: { Section, DocumentsItem },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style lang="scss">
.documents-list {
  &__item {
    &:not(:last-child) {
      margin-bottom: 3.2rem;

      @include --mobile {
        margin-bottom: 2.4rem;
      }
    }
  }
}
</style>
