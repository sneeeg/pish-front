<template>
  <div class="review-item">
    <div class="review-item__date">
      {{ $dayjs(review.activeFrom).format($constants.POST_DATE_FORMAT) }}
    </div>

    <div class="review-item__head">
      <div v-if="isComment" class="review-item__image">
        <img :src="review.previewPicture.src" :alt="review.title" />
      </div>

      <div class="review-item__content">
        <SmartLink
          :to="linkObject"
          class="review-item__title hover-opacity _visually-h4"
          >{{ review.title }}</SmartLink
        >
        <div class="review-item__text" v-html="review.description"></div>
      </div>
    </div>

    <ArrowLink
      class="review-item__link"
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
    isComment: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    linkObject() {
      return {
        name: this.isComment ? 'news-comments-post' : 'news-media-post',
        params: { post: this.review.slug },
      }
    },
  },
}
</script>

<style lang="scss">
.review-item {
  &__head {
    display: flex;
    align-items: center;
  }

  &__image {
    @include box(8.6rem);
    flex-shrink: 0;
    margin-right: 2rem;
    border-radius: 50%;
    overflow: hidden;

    img {
      @include box(100%);
      object-fit: cover;
    }

    @include --mobile {
      @include box(7.2rem);
    }
  }

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

    p {
      margin: 0;
    }
  }

  &__link {
    margin-top: 3.8rem;

    @include --mobile {
      margin-top: 2rem;
    }
  }
}
</style>
