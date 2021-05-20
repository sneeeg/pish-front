<template>
  <div class="post-preview">
    <SmartLink :to="toObject" class="post-preview__image">
      <img :src="post.previewPicture.src" :alt="post.previewPicture.alt" />
    </SmartLink>
    <div class="post-preview__content">
      <div class="post-preview-head">
        <template v-if="post.category.text">
          <span class="post-preview-head__category">{{
            post.category.text
          }}</span>
          <span class="post-preview-head__separator"> / </span>
        </template>
        <span class="post-preview-head__date">{{
          $dayjs(post.activeFrom).format($constants.POST_DATE_FORMAT)
        }}</span>
      </div>
      <SmartLink :to="toObject" class="post-preview__title hover-opacity">
        {{ post.title }}
      </SmartLink>
      <ArrowLink
        :to="toObject"
        :text="lang['base.more']"
        class="post-preview__link"
      >
      </ArrowLink>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SmartLink from '~/components/utils/SmartLink'
import ArrowLink from '~/components/controls/ArrowLink'
export default {
  name: 'PostPreview',
  components: { ArrowLink, SmartLink },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    toObject() {
      return { name: 'news-post', params: { post: this.post.slug } }
    },
  },
}
</script>

<style lang="scss">
.post-preview {
  background-color: $color_white;

  &__image {
    display: block;
    width: 100%;
    height: 32rem;
    transition: filter 0.3s ease;

    @include --tablet {
      height: 22.4rem;
    }

    @include --mobile {
      height: 20rem;
    }

    img {
      @include box(100%);
      object-fit: cover;
    }

    @include hover {
      filter: brightness(0.85);
    }
  }

  &__content {
    @include padding-card;
  }

  &__title {
    display: block;
    margin: 2.4rem 0;
    line-height: 2.7rem;

    @include --mobile {
      margin: 1.6rem 0;
      line-height: 2.2rem;
    }
  }

  &__link {
    width: fit-content;
  }
}

.post-preview-head {
  @include text-button-small;

  &__separator {
    color: $color_accent;
  }

  &__date {
    color: $color_grey_text;
  }
}
</style>
