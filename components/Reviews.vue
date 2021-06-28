<template>
  <div class="reviews">
    <div
      ref="reviewsList"
      v-scroll-element
      :class="[
        'reviews-list',
        {
          _flex: !sliderStatus,
          '_flex-sb': !sliderStatus && reviews.length > 2,
        },
      ]"
    >
      <ReviewItem
        v-for="review in reviews"
        :key="review.id"
        class="reviews-list__item"
        :review="review"
        :is-comment="isComments"
      />
    </div>
    <div class="reviews__controls">
      <SliderControls v-if="sliderInstance" :slider-instance="sliderInstance" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReviewItem from '~/components/ReviewItem'
import Slider from '~/assets/js/modules/slider'
import SliderControls from '~/components/SliderControls'

export default {
  name: 'Reviews',
  components: { SliderControls, ReviewItem },
  props: {
    isComments: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reviews: [],
      sliderInstance: null,
    }
  },
  computed: {
    ...mapState('responsive', ['window', 'device']),
    sliderStatus() {
      if (this.window.isMobileSize && this.reviews.length > 1) {
        return 'mobile'
      } else if (this.window.isTabletSize && this.reviews.length > 2) {
        return 'tablet'
      } else if (this.window.isDesktopSize && this.reviews.length > 3) {
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
            (this.sliderInstance = new Slider(this.$refs.reviewsList, {
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
    this.fetchReviews()
  },
  methods: {
    async fetchReviews() {
      if (this.isComments) {
        this.reviews = await this.$api.comments
          .get(undefined, 1, 9)
          .then(({ data }) => data.posts || [])
      } else {
        this.reviews = await this.$api.reviews
          .get(undefined, 1, 9)
          .then(({ data }) => data.posts || [])
      }
    },
  },
}
</script>

<style lang="scss">
.reviews {
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

.reviews-list {
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
    width: 30%;

    @include --tablet {
      width: 47.5%;
    }

    @include --mobile {
      width: 100%;
    }

    &:not(:last-child) {
      margin-right: 5%;

      @include --mobile {
        margin-right: 3rem;
      }
    }
  }
}
</style>
