<template>
  <div class="faq">
    <Section :title="page.pageTitle">
      <div class="faq__lead" v-html="page.lead"></div>

      <FaqCategories class="faq__categories" />
    </Section>
    <Section background>
      <FaqForm :title="page.form.title" />
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Section from '~/components/layout/Section'
import FaqForm from '~/components/FaqForm'
import FaqCategories from '~/components/FaqCategories'

export default {
  name: 'Index',
  components: { FaqCategories, FaqForm, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style lang="scss">
.faq {
  &__lead {
    max-width: 78.7rem;
    line-height: 2.7rem;
    margin-bottom: 6.4rem;

    @include --mobile {
      margin-bottom: 4.2rem;
    }
  }
}
</style>
