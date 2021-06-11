<template>
  <div :class="['post-preview', { _colored: colored }]">
    <template v-if="!$utils.isObjectEmpty(post)">
      <SmartLink :to="linkObject" class="post-preview__image">
        <img
          v-if="post.previewPicture && post.previewPicture.src"
          :src="post.previewPicture.src"
          :alt="post.previewPicture.alt"
        />
      </SmartLink>
      <div class="post-preview__content">
        <div class="post-preview-head">
          <template v-if="post.category && post.category.text">
            <span class="post-preview-head__category">{{
              post.category.text
            }}</span>
            <span class="post-preview-head__separator"> / </span>
          </template>
          <span class="post-preview-head__date">{{
            $dayjs(post.activeFrom).format($constants.POST_DATE_FORMAT)
          }}</span>
        </div>
        <SmartLink :to="linkObject" class="post-preview__title hover-opacity">
          {{ post.title }}
        </SmartLink>
        <ArrowLink
          :to="linkObject"
          :text="lang['base.more']"
          class="post-preview__link"
        >
        </ArrowLink>
      </div>
    </template>
    <SkeletonLoader v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SmartLink from '~/components/utils/SmartLink'
import ArrowLink from '~/components/controls/ArrowLink'
import SkeletonLoader from '~/components/utils/SkeletonLoader'
export default {
  name: 'PostPreview',
  components: { SkeletonLoader, ArrowLink, SmartLink },
  props: {
    post: {
      type: Object,
      required: true,
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
  computed: {
    ...mapState('default', ['lang']),
    linkName() {
      return this.type === 'all' ? 'news-post' : `news-${this.type}-post`
    },
    linkObject() {
      return {
        name: this.linkName,
        params: { post: this.post.slug },
      }
    },
  },
}
</script>

<style lang="scss">
.post-preview {
  @include skeletonContainer;
  display: flex;
  flex-direction: column;
  min-height: 52rem;
  background-color: $color_white;

  &._colored {
    background-color: $color_background;
  }

  @include --tablet {
    min-height: 48rem;
  }

  @include --mobile {
    min-height: 30rem;
  }

  &__image {
    display: block;
    flex-shrink: 0;
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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__title {
    display: block;
    flex-grow: 1;
    margin: 2.4rem 0;
    line-height: 2.7rem;

    @include --mobile {
      margin-top: 1.6rem;
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
