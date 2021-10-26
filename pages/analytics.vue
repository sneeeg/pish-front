<template>
  <div class="analytics">
    <Section>
      <h1 class="council__title _visually-h2">{{ page.pageTitle }}</h1>
    </Section>

    <Section background :title="page.participants.title"> </Section>

    <Section :title="page.candidates.title"></Section>

    <Section background :title="page.summary.title"></Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import Section from '~/components/layout/Section'

export default {
  name: 'Commission',
  components: { Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {},
}
</script>

<style lang="scss"></style>
