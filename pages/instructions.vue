<template>
  <div>
    <Section :title="page.pageTitle">
      <Videos />
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Section from '~/components/layout/Section'
import Videos from '~/components/Videos'
export default {
  name: 'Instructions',
  components: { Videos, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style lang="scss"></style>
