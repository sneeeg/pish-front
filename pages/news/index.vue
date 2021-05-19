<template>
  <div>
    <Section :title="lang['news.title']">
      <Posts />
    </Section>
    <Section background :title="lang['reviews.title']"> </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import Posts from '~/components/Posts'

export default {
  name: 'Index',
  components: { Posts, Section },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
