<template>
  <div class="other-posts">
    <div
      ref="otherPostsList"
      :class="['other-posts-list', { _flex: !sliderStatus }]"
    >
      <OtherPostPreview
        v-for="post in posts"
        :key="post.id"
        class="other-posts-list__item"
        :to="
          mainPosts
            ? { name: 'news-post', params: { post: post.slug } }
            : post.href
        "
        :active-from="post.activeFrom"
        :picture="mainPosts ? post.detailPicture : post.previewPicture"
        :title="post.title"
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
    mainPosts: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: [String, Number, undefined],
      default: undefined,
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
      if (!this.mainPosts) {
        this.posts = await this.$api.posts
          .getUniversityPosts()
          .then(({ data }) => data || [])
      } else {
        this.posts = await this.$api.posts
          .get(this.categoryId, 1, 10)
          .then(({ data }) => data.posts || [])
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
  }
}

.other-posts-list {
  &._flex {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    width: 31.6666666%;

    &:not(:last-child) {
      margin-right: 2.5%;
    }
  }
}
</style>
