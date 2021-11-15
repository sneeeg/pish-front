<template>
  <div class="page">
    <div class="page__back">
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
          :tags="page.tags"
          type="university"
        />
        <HTMLContent
          v-if="page.description"
          :html="page.description"
          class="post__description"
        />
        <HTMLContent for-news :html="page.content" class="post__body" />
        <Slider
          v-if="page.slides && page.slides.length"
          :class="['post__slider', { _mb: page.source && page.source.href }]"
          :slides="page.slides"
        />
        <PostSource
          v-if="page.source && page.source.href"
          :source="page.source"
        />
      </article>
    </Section>
    <Section to="/news" :title="lang['news.other']">
      <OtherPosts
        type="university"
        :slug="page.slug"
        :category="page.category"
      />
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
import PostSource from '~/components/PostSource'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Slider from '~/components/Slider'
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
    Slider,
  },
  mixins: [pageHead, pageDefault],
  async asyncData({ error, route, $api }) {
    const page = await $api.posts
      .getUniversityPostBySlug(route.params.post)
      .then(({ data }) => data)

    if (!page) {
      return error({ statusCode: 404, message: 'Post not found' })
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
  &__body,
  &__slider {
    @include containerInnerSmall;
  }

  &__slider {
    margin-top: 5.6rem;

    @include --mobile {
      margin-top: 4.2rem;
    }

    &._mb {
      margin-bottom: 4.2rem;

      @include --mobile {
        margin-bottom: 3.2rem;
      }
    }
  }

  &__description,
  &__slider {
    margin-bottom: 4.8rem;

    @include --mobile {
      margin-bottom: 4rem;
    }
  }
}
</style>
