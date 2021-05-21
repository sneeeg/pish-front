<template>
  <div class="other-post-preview">
    <SmartLink :to="linkObject" class="other-post-preview__image">
      <img :src="post.previewPicture.src" :alt="post.previewPicture.alt" />
    </SmartLink>
    <div class="other-post-preview__content">
      <div class="other-post-preview-head">
        {{ $dayjs(post.activeFrom).format($constants.POST_DATE_FORMAT) }}
      </div>
      <SmartLink
        :to="linkObject"
        class="other-post-preview__title hover-opacity"
      >
        <span>{{ post.title }}</span>
      </SmartLink>
      <ArrowLink
        :to="linkObject"
        :text="lang['base.readMore']"
        class="other-post-preview__link"
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
  name: 'OtherPostPreview',
  components: { ArrowLink, SmartLink },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    linkObject() {
      return {
        name: 'news-type-post',
        params: { type: 'university', post: this.post.slug },
      }
    },
  },
}
</script>

<style lang="scss">
.other-post-preview {
  display: flex;
  flex-direction: column;
  min-height: 44rem;
  background-color: $color_white;

  @include --tablet {
    min-height: 46rem;
  }

  @include --mobile {
    min-height: 40rem;
  }

  &__image {
    display: block;
    flex-shrink: 0;
    width: 100%;
    height: 22.8rem;
    transition: filter 0.3s ease;

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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2.2rem 4rem 3.2rem;

    @include --mobile {
      padding: 3.2rem 2rem;
    }
  }

  &__title {
    @include text-small;
    display: block;
    flex-grow: 1;
    margin: 2.2rem 0;

    span {
      @include lineClamp(5);

      @include --mobile {
        @include lineClamp(4);
      }
    }

    @include --mobile {
      margin: 1.6rem 0;
    }
  }

  &__link {
    width: fit-content;
  }
}

.other-post-preview-head {
  @include text-button-small;
  color: $color_grey_text;
  font-weight: normal;
}
</style>
