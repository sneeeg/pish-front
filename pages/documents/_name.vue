<template>
  <div class="page">
    <Section>
      <h1>{{ page.title }}</h1>
      <HTMLContent :html="page.detailText" />
    </Section>
  </div>
</template>

<script>
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Name',
  components: { HTMLContent, Section },
  mixins: [pageHead, pageDefault],
  async asyncData({ $api, route, error }) {
    const page = await $api.pages
      .getDocumentPageByName(route.params.name || '')
      .then(({ data }) => data)

    if (!page) {
      error({ statusCode: 404 })

      return
    }

    page.title = page.elementPageTitle
    page.metaTitle = page.elementMetaTitle
    page.metaDescription = page.elementMetaDescription

    delete page.elementPageTitle
    delete page.elementMetaTitle
    delete page.elementMetaDescription

    return { page }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 6.4rem;

  @include --mobile {
    margin-bottom: 5.2rem;
  }
}
</style>
