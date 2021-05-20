<template>
  <div>
    <Section :title="page.mainNewsTitle">
      <Posts all />
    </Section>
    <Section background :title="page.reviewsTitle">
      <Reviews />
    </Section>
    <Section :title="page.universityNewsTitle">
      <OtherPosts />
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
import OtherPosts from '~/components/OtherPosts'

export default {
  name: 'Index',
  components: { Reviews, Posts, Section, OtherPosts },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
