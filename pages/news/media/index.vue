<template>
  <div>
    <div class="page__back">
      <ArrowLink :text="lang['base.back']" to="/news" arrow-left />
    </div>
    <Section :title="page.reviewsTitle" :tag-title="$route.query.tag">
      <Posts all type="media" />
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
import ArrowLink from '~/components/controls/ArrowLink'

export default {
  name: 'Index',
  components: { Posts, Section, OtherPosts, ArrowLink },
  mixins: [pageHead, pageDefault],
  async asyncData({ store, $api, error, i18n }) {
    if (i18n.locale === 'en')
      error({ statusCode: 404, message: 'page not found' })

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
