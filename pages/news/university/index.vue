<template>
  <div>
    <div class="page__back">
      <ArrowLink :text="lang['base.back']" to="/news" arrow-left />
    </div>
    <Section :title="page.universityNewsTitle" :tag-title="$route.query.tag">
      <Posts all type="university" />
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

    page.title = page.title + ' - ' + page.universityNewsTitle

    return { page }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
