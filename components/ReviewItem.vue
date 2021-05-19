<template>
  <div class="review-item">
    <div class="review-item__date">
      {{ $dayjs(review.activeFrom).format($constants.POST_DATE_FORMAT) }}
    </div>
    <div class="review-item__title _visually-h4">{{ review.title }}</div>
    <div class="review-item__text" v-html="review.content"></div>
    <ArrowLink
      class="reciew-item__link"
      :to="review.href"
      :text="lang['base.readMore']"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArrowLink from '~/components/controls/ArrowLink'
export default {
  name: 'ReviewItem',
  components: { ArrowLink },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.review-item {
  &__date {
    @include text-button-small;
    margin-bottom: 2.2rem;
    color: $color_grey_text;
    font-weight: 400;
  }

  &__title {
    margin-bottom: 0.6rem;
    font-weight: 500;
  }

  &__text {
    @include text-small;
    margin-bottom: 3.8rem;
  }
}
</style>
