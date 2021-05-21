<template>
  <div class="review-item">
    <div class="review-item__date">
      {{ $dayjs(review.activeFrom).format($constants.POST_DATE_FORMAT) }}
    </div>
    <SmartLink
      :to="linkObject"
      class="review-item__title hover-opacity _visually-h4"
      >{{ review.title }}</SmartLink
    >
    <div class="review-item__text" v-html="review.description"></div>
    <ArrowLink
      class="reciew-item__link"
      :to="linkObject"
      :text="lang['base.readMore']"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArrowLink from '~/components/controls/ArrowLink'
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'ReviewItem',
  components: { SmartLink, ArrowLink },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    linkObject() {
      return {
        name: 'news-type-post',
        params: { type: 'media', post: this.review.slug },
      }
    },
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

    @include --mobile {
      margin-bottom: 1.2rem;
    }
  }

  &__title {
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;

    @include --mobile {
      margin-bottom: 2rem;
    }
  }

  &__text {
    @include text-small;
    margin-bottom: 3.8rem;

    @include --mobile {
      margin-bottom: 2rem;
    }

    p {
      margin: 0;
    }
  }
}
</style>
