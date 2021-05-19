<template>
  <div class="posts">
    <div class="posts__head">
      <ul class="posts-categories">
        <li
          v-for="category in categories"
          :key="category.id"
          class="posts-categories__item"
        >
          <a
            href=""
            :class="[
              'hover-color-accent',
              { _active: category.id === currentCategoryId },
            ]"
            @click.prevent="changeCategory(category.id)"
            >{{ category.text }}</a
          >
        </li>
      </ul>
      <ArrowLink v-if="!all" :text="lang['news.all']" to="/" />
    </div>
    <div class="posts__content">
      <div class="posts-list">
        <PostPreview
          v-for="post in posts"
          :key="post.id"
          class="posts-list__item"
          :post="post"
          :category="findCategoryText(categories, post.categoryId)"
        />
      </div>
      <div v-if="moreButtonExist" class="posts-more">
        <Btn
          class="posts-more__btn"
          :text="lang['base.seeMore']"
          arrow="arrow-bottom"
          :loading="morePostsLoading"
          @click.native="loadMorePosts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArrowLink from '~/components/controls/ArrowLink'
import findCategoryText from '~/assets/js/utils/find-category-text'
import PostPreview from '~/components/PostPreview'
import Btn from '~/components/controls/Btn'

export default {
  name: 'Posts',
  components: { Btn, PostPreview, ArrowLink },
  props: {
    all: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      posts: [],
      pagination: {},
      categories: [],
      currentCategoryId: -1,
      morePostsLoading: false,
    }
  },
  async fetch() {
    const categories = this.$api.posts.getCategories().then(({ data }) => {
      this.categories = data || []
      this.categories.unshift({ id: -1, text: this.lang['base.all'] })
    })

    await Promise.all([categories, this.fetchPosts(undefined, 1)])
  },
  computed: {
    ...mapState('default', ['lang']),
    moreButtonExist() {
      if (!this.all || !this.pagination.current) return false

      return this.pagination.current < this.pagination.total
    },
  },
  methods: {
    changeCategory(categoryId) {
      this.currentCategoryId = categoryId

      this.fetchPosts(
        this.currentCategoryId !== -1 ? this.currentCategoryId : undefined,
        1
      )
    },
    async loadMorePosts() {
      this.morePostsLoading = true

      await this.fetchPosts(
        this.currentCategoryId,
        this.pagination.current + 1,
        true
      )

      this.morePostsLoading = false
    },
    fetchPosts(categoryId, page, concat = false) {
      return this.$api.posts.get(categoryId, page).then(({ data }) => {
        if (concat) {
          this.posts = this.posts.concat(data.posts || [])
        } else {
          this.posts = data.posts || []
        }

        this.pagination = data.pagination || {}
      })
    },
    findCategoryText,
  },
}
</script>

<style lang="scss">
.posts {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2.6rem;
  }
}

.posts-categories {
  display: flex;

  &__item {
    &:not(:last-child) {
      margin-right: 4.2rem;
    }

    a {
      @include text-button;
      font-weight: normal;
      text-transform: uppercase;

      &._active {
        color: $color_accent;
      }
    }
  }
}

.posts-list {
  @include flexGap(3rem);

  &__item {
    flex: 1 1 40%;
    max-width: calc(50% - 3rem);
  }
}

.posts-more {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 4rem;

  &__btn {
    width: 23.2rem;
  }
}
</style>
