<template>
  <div>
    <Section v-view="$utils.scrollCenterDetection" :title="page.mainNewsTitle">
      <Posts all />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      background
      :title="page.reviewsTitle"
    >
      <Reviews />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.universityNewsTitle"
    >
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
import pageDefault from '~/assets/js/vue-mixins/page-default'

export default {
  name: 'Index',
  components: { Reviews, Posts, Section, OtherPosts },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
