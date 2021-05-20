<template>
  <div class="page _background">
    <div v-if="window.isDesktopSize" class="page__back">
      <ArrowLink :text="lang['base.back']" to="/news" arrow-left />
    </div>
    <Section background-absolute
      ><article class="post">
        <PostHead
          :title="page.title"
          :category="page.category.text"
          :date="page.activeFrom"
          :description="page.description"
          :picture="page.detailPicture"
          class="post__head"
        />
      </article>
      <HTMLContent
        v-if="page.description"
        :html="page.description"
        class="post__description"
      />
      <HTMLContent :html="page.content" class="post__body" />
    </Section>
    <Section :title="lang['news.other']">
      <OtherPosts main-posts :category-id="page.category.id" />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageHead from '~/assets/js/vue-mixins/page-head'
import ArrowLink from '~/components/controls/ArrowLink'
import Section from '~/components/layout/Section'
import PostHead from '~/components/PostHead'
import HTMLContent from '~/components/utils/HTMLContent'
import OtherPosts from '~/components/OtherPosts'

export default {
  name: 'Post',
  components: { HTMLContent, PostHead, Section, ArrowLink, OtherPosts },
  mixins: [pageHead],
  async asyncData({ $nuxt, route, $api }) {
    const page = await $api.posts
      .getPostBySlug(route.params.post)
      .then(({ data }) => data)

    if (!page) {
      return $nuxt.error({ statusCode: 404, message: 'Post not found' })
    }

    return { page }
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.post {
  &__head {
    margin-bottom: 7.2rem;

    @include --mobile {
      margin-bottom: 5.2rem;
    }
  }

  &__desription,
  &__body {
    @include containerInnerSmall;
  }

  &__description {
    margin-bottom: 4.8rem;

    @include --mobile {
      margin-bottom: 4rem;
    }
  }
}
</style>
