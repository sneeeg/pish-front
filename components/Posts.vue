<template>
  <div class="posts">
    <div v-scroll-element class="posts__head">
      <ul
        v-if="window.isDesktopSize && categories.length > 1"
        class="posts-categories"
      >
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
      <CustomSelect
        v-else-if="categories.length > 1"
        :value="currentCategoryId"
        :items="categories"
        class="posts__select"
        @input="changeCategory"
      />
      <ArrowLink
        v-if="!all && window.isDesktopSize"
        :text="lang['news.all']"
        to="/news"
      />
    </div>
    <div v-scroll-element class="posts__content">
      <div class="posts-list">
        <PostPreview
          v-for="post in posts"
          :key="post.id"
          class="posts-list__item"
          :post="post"
          :colored="colored"
          :type="type"
        />
      </div>
      <div v-if="moreButtonExist" class="posts-foot">
        <Btn
          class="posts-foot__btn"
          type="button"
          :text="lang['base.seeMore']"
          arrow="arrow-bottom"
          :loading="morePostsLoading"
          @click.native="loadMorePosts"
        />
      </div>
      <div v-if="!all && !window.isDesktopSize" class="posts-foot">
        <ArrowLink
          class="posts-foot__link"
          :text="lang['news.all']"
          to="/news"
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
import CustomSelect from '~/components/controls/CustomSelect'

export default {
  name: 'Posts',
  components: { CustomSelect, Btn, PostPreview, ArrowLink },
  props: {
    all: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'all',
    },
    colored: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      posts: [],
      pagination: {},
      categories: [],
      currentCategoryId: -1,
      morePostsLoading: false,
      apiMethod: null,
    }
  },
  async fetch() {
    this.apiMethod =
      this.type === 'all'
        ? this.$api.posts.get
        : this.type === 'university'
        ? this.$api.posts.getUniversityPosts
        : this.$api.reviews.get

    await this.fetchPosts(undefined, 1)
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
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
    async fetchPosts(categoryId, page, concat = false) {
      if (!concat) {
        this.posts = this.$utils.fillEmptyArray({}, 4)
      }

      await this.$utils.delay(1500, true)

      return this.apiMethod(categoryId, page).then(({ data }) => {
        if (concat) {
          this.posts = this.posts.concat(data.posts || [])
        } else {
          this.posts = data.posts || []
        }

        if (!this.categories.length) {
          this.categories = data.categories || []
          this.categories.unshift({ id: -1, text: this.lang['base.all'] })
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

  &__select {
    width: 100%;
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

    @include --mobile {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
}

.posts-foot {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 4rem;

  &__btn {
    width: 23.2rem;

    @include --mobile {
      width: 18rem;
    }
  }

  &__link {
    width: fit-content;
  }
}
</style>
