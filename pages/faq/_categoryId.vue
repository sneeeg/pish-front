<template>
  <div class="faq-category">
    <div class="page__back">
      <ArrowLink :text="lang['base.back']" to="/faq" arrow-left />
    </div>
    <Section :title="mainCategory.text" class="faq-category-main">
      <p v-if="isPageEmpty" class="faq-category-main__empty">
        {{ lang['faq.empty'] }}
      </p>
      <FaqPostsList
        v-else-if="mainCategoryPosts.length"
        :items="mainCategoryPosts"
      />
    </Section>

    <Section
      v-for="(category, index) in categories"
      v-show="getPostsByCategoryId(category.id).length"
      :key="category.id"
      :background="index % 2 === 0"
    >
      <FaqPostsList
        :title="category.text"
        :outlined="index % 2 === 0"
        :items="getPostsByCategoryId(category.id)"
      />
    </Section>

    <portal to="popups">
      <transition name="fade">
        <PostPopup
          v-if="popupPost"
          :title="popupPost.description"
          :content="popupPost.content"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import ArrowLink from '~/components/controls/ArrowLink'
import FaqPostsList from '~/components/FaqPostsList'
import PostPopup from '~/components/PostPopup'

export default {
  name: 'CategoryId',
  components: { PostPopup, FaqPostsList, Section, ArrowLink },
  mixins: [pageHead, pageDefault],
  async asyncData({ error, $api, route }) {
    const [posts, categories] = await $api.faq
      .getCategories()
      .then(({ data }) => [data.posts || [], data.categories || []])

    const currentCategories = categories.filter(
      (item) => String(item.parent) === String(route.params.categoryId)
    )

    if (!currentCategories.length && !posts.length) {
      error({ statusCode: 404, message: 'Post not found' })

      return
    }

    return { categories: currentCategories, posts, allCategories: categories }
  },
  computed: {
    ...mapState('default', ['lang']),
    popupPost() {
      if (!this.$route.query.post) return null

      return this.posts.find((post) => post.slug === this.$route.query.post)
    },
    mainCategory() {
      const item = this.allCategories.find(
        (category) =>
          String(category.id) === String(this.$route.params.categoryId)
      )

      const itemFields = item.text.split('|')
      const category = {}

      category.id = item.id
      category.text = itemFields[0].trim()

      return category
    },
    page() {
      return {
        title: this.mainCategory.text,
        metaTitle: this.mainCategory.text,
      }
    },
    mainCategoryPosts() {
      return this.posts
        .filter(
          (post) => String(post.category.id) === String(this.mainCategory.id)
        )
        .reverse()
    },
    isPageEmpty() {
      return !this.categories.length && !this.mainCategoryPosts.length
    },
  },
  methods: {
    getPostsByCategoryId(id) {
      return this.posts
        .filter((item) => String(item.category.id) === String(id))
        .reverse()
    },
  },
}
</script>

<style lang="scss">
.faq-category-main {
  &__empty {
    margin: 0;
  }
}
</style>
