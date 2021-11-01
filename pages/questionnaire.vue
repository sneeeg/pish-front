<template>
  <div>
    <Section>
      <HTMLContent :html="page.message" />
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Section from '~/components/layout/Section'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Questionnaire',
  components: { HTMLContent, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style lang="scss"></style>
