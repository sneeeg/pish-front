<template>
  <div class="other-posts">
    <div
      ref="otherPostsList"
      :class="[
        'other-posts-list',
        { _flex: !sliderStatus, '_flex-sb': !sliderStatus && posts.length > 2 },
      ]"
    >
      <OtherPostPreview
        v-for="post in posts"
        :key="post.id"
        :hide-head="hideHead"
        :type="type"
        class="other-posts-list__item"
        :post="post"
      />
    </div>
    <div class="other-posts__controls">
      <SliderControls v-if="sliderInstance" :slider-instance="sliderInstance" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OtherPostPreview from '~/components/OtherPostPreview'
import Slider from '~/assets/js/modules/slider'
import SliderControls from '~/components/SliderControls'

export default {
  name: 'OtherPosts',
  components: { OtherPostPreview, SliderControls },
  props: {
    type: {
      type: String,
      default: 'all',
    },
    category: {
      type: Object,
      default: null,
    },
    slug: {
      type: String,
      default: '',
    },
    hideHead: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      posts: [],
      sliderInstance: null,
    }
  },
  computed: {
    ...mapState('responsive', ['window', 'device']),
    sliderStatus() {
      if (this.window.isMobileSize && this.posts.length > 1) {
        return 'mobile'
      } else if (this.window.isTabletSize && this.posts.length > 2) {
        return 'tablet'
      } else if (this.window.isDesktopSize && this.posts.length > 3) {
        return 'desktop'
      }

      return false
    },
  },
  watch: {
    sliderStatus() {
      this.sliderInstance?.flickity?.destroy()
      this.sliderInstance = null

      if (this.sliderStatus) {
        setTimeout(
          () =>
            (this.sliderInstance = new Slider(this.$refs.otherPostsList, {
              groupCells: this.window.isDesktopSize
                ? 3
                : this.window.isMobileSize
                ? false
                : 2,
              draggable: this.device.isAdaptive,
            }))
        )
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      const apiMethod =
        this.type === 'all'
          ? this.$api.posts.get
          : this.type === 'university'
          ? this.$api.posts.getUniversityPosts
          : this.type === 'comments'
          ? this.$api.comments.get
          : this.$api.reviews.get

      this.posts = await apiMethod(this.category?.id, 1, 10).then(
        ({ data }) => data.posts || []
      )

      if (this.category && !this.posts.length) {
        this.posts = await apiMethod(undefined, 1, 10).then(
          ({ data }) => data.posts || []
        )
      }

      if (this.slug) {
        this.posts.splice(
          this.posts.findIndex((elem) => elem.slug === this.slug),
          1
        )
      }
    },
  },
}
</script>

<style lang="scss">
.other-posts {
  &__controls {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 7.2rem;

    @include --mobile {
      margin-top: 5rem;
    }
  }
}

.other-posts-list {
  &._flex {
    display: flex;
  }

  &._flex-sb {
    justify-content: space-between;
  }

  @include --mobile {
    @include sliderViewportVisible;
  }

  &__item {
    width: 31.6666666%;

    @include --tablet {
      width: 47.5%;
    }

    @include --mobile {
      width: 100%;
    }

    &:not(:last-child) {
      margin-right: 2.5%;

      @include --tablet {
        margin-right: 5%;
      }

      @include --mobile {
        margin-right: 1.6rem;
      }
    }
  }
}
</style>
