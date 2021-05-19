<template>
  <div>
    <Section :title="page.mainNewsTitle">
      <Posts />
    </Section>
    <Section background :title="page.reviewsTitle">
      <Reviews />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import Posts from '~/components/Posts'
import Reviews from '~/components/Reviews'

export default {
  name: 'Index',
  components: { Reviews, Posts, Section },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
