<template>
  <div class="video-preview">
    <template v-if="!$utils.isObjectEmpty(post)">
      <MediaPlayer
        class="video-preview__frame"
        :video-id="post.content"
        :preview="post.previewPicture"
      />
      <div class="video-preview__content">
        <div v-if="false" class="video-preview-head">
          <span class="video-preview-head__date">{{
            $dayjs(post.activeFrom).format($constants.POST_DATE_FORMAT)
          }}</span>
        </div>
        <SmartLink :to="link" class="video-preview__title hover-opacity">
          <span v-html="post.title"></span>
        </SmartLink>

        <ArrowLink
          :to="link"
          :text="lang['base.seeVideo']"
          class="video-preview__link"
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
import MediaPlayer from '~/components/MediaPlayer'
export default {
  name: 'VideoCard',
  components: { MediaPlayer, SkeletonLoader, ArrowLink, SmartLink },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    link() {
      return `https://www.youtube.com/watch?v=${this.post.content}`
    },
  },
}
</script>

<style lang="scss">
.video-preview {
  @include skeletonContainer;
  display: flex;
  flex-direction: column;
  min-height: 52rem;
  background-color: $color_white;

  @include --tablet {
    min-height: 47.9rem;
  }

  @include --mobile {
    min-height: 30rem;
  }

  &__frame {
    display: block;
    flex-shrink: 0;
    width: 100%;
    height: 31.8rem;

    @include --mobile {
      height: 18.85rem;
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
    margin: 0 0 2.4rem;
    line-height: 2.7rem;

    span {
      display: block;
    }

    @include --mobile {
      line-height: 2.2rem;
    }
  }

  &__link {
    width: fit-content;
  }
}

.video-preview-head {
  @include text-button-small;

  &__separator {
    color: $color_accent;
  }

  &__date {
    color: $color_grey_text;
  }
}
</style>
