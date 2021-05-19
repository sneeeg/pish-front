<template>
  <div class="reviews">
    <div ref="reviewsList" :class="['reviews-list', { _flex: isListFlex }]">
      <ReviewItem
        v-for="review in reviews"
        :key="review.id"
        class="reviews-list__item"
        :review="review"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReviewItem from '~/components/ReviewItem'
// import Slider from '~/assets/js/modules/slider'

export default {
  name: 'Reviews',
  components: { ReviewItem },
  data() {
    return {
      reviews: [],
      sliderInstance: null,
    }
  },
  computed: {
    ...mapState('responsive', ['window']),
    isListFlex() {
      return window.isDesktopSize && this.reviews.length <= 4
    },
  },
  mounted() {
    this.fetchReviews()
  },
  methods: {
    async fetchReviews() {
      this.reviews = await this.$api.reviews
        .get()
        .then(({ data }) => data || [])

      console.log(this.reviews)
    },
  },
}
</script>

<style lang="scss"></style>
