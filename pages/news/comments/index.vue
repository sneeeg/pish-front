<template>
  <div>
    <Section :title="lang['news.comments']" :tag-title="$route.query.tag">
      <Posts hide-head all type="comments" />
    </Section>
    <Section to="/news" :title="lang['news.all']">
      <OtherPosts />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import Posts from '~/components/Posts'
import OtherPosts from '~/components/OtherPosts'
import pageDefault from '~/assets/js/vue-mixins/page-default'

export default {
  name: 'Index',
  components: { Posts, Section, OtherPosts },
  mixins: [pageHead, pageDefault],
  async asyncData({ store, $api }) {
    const pageName = 'news'

    const apiMethod = $api.pages[pageName]

    if (!apiMethod) return { page: {} }

    const page = await apiMethod().then(({ data }) => data)

    page.title = page.title + ' - ' + page.reviewsTitle

    return { page }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
