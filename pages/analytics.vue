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
import Section from '~/components/layout/Section'

export default {
  name: 'Commission',
  components: { Section },
  mixins: [pageHead, pageDefault],
  async asyncData({ store, $api }) {
    const page = await $api.pages.analytics().then(({ data }) => data)

    return { page }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {},
}
</script>

<style lang="scss"></style>
