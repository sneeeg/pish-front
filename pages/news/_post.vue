<template>
  <div class="page">
    <div v-if="false" class="page__back">
      <ArrowLink :text="lang['news.all']" to="/news" arrow-left />
    </div>
    <Section :background-absolute="!!page.detailPicture"
      ><article ref="post" class="post">
        <PostHead
          :title="page.title"
          :category="page.category"
          :date="page.activeFrom"
          :description="page.description"
          :picture="page.detailPicture"
          class="post__head"
          :source="page.pictureSource"
        />
        <HTMLContent
          v-if="page.description"
          v-scroll-element
          :html="page.description"
          class="post__description"
        />
        <HTMLContent
          v-scroll-element
          for-news
          :html="page.content"
          class="post__body"
        />
        <PostSource
          v-if="page.source && page.source.href"
          :source="page.source"
        />
      </article>
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      to="/news"
      :title="lang['news.other']"
    >
      <OtherPosts main-posts :slug="page.slug" :category="page.category" />
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
import pageDefault from '~/assets/js/vue-mixins/page-default'
import PostSource from '~/components/PostSource'
import scrollAnimation from '~/assets/js/composables/animations/scroll-animation'

export default {
  name: 'Post',
  components: {
    HTMLContent,
    PostHead,
    Section,
    ArrowLink,
    OtherPosts,
    PostSource,
  },
  mixins: [pageHead, pageDefault],
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
  mounted() {
    scrollAnimation(this.$refs.post)
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
