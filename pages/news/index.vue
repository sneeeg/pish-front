<template>
  <div>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.mainNewsTitle"
      :tag-title="$route.query.tag"
    >
      <Posts all />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      to="/news/comments"
      background
      title="Комментарии"
      arrow-text="Все комментарии"
    >
      <Reviews is-comments />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      to="/news/media"
      :title="page.reviewsTitle"
    >
      <Reviews />
    </Section>
    <!--    <Section-->
    <!--      v-view="$utils.scrollCenterDetection"-->
    <!--      to="/news/university"-->
    <!--      :title="page.universityNewsTitle"-->
    <!--    >-->
    <!--      <OtherPosts type="university" />-->
    <!--    </Section>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import Posts from '~/components/Posts'
import Reviews from '~/components/Reviews'
// import OtherPosts from '~/components/OtherPosts'
import pageDefault from '~/assets/js/vue-mixins/page-default'

export default {
  name: 'Index',
  components: { Reviews, Posts, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
