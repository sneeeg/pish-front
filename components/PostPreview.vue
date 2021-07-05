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
          <span v-html="post.title"></span>
          <span v-if="type === 'comments'" v-html="post.description"></span>
        </SmartLink>

        <ul v-if="post.tags && post.tags.length" class="post-preview__tags">
          <li v-for="tag in post.tags" :key="tag.id">
            <SmartLink class="hover-color-accent" :to="getTagLink(tag)"
              >#{{ tag }}</SmartLink
            >
          </li>
        </ul>
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
  methods: {
    getTagLink(tag) {
      return {
        name: this.type !== 'all' ? `news-${this.type}` : 'news',
        query: { tag },
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

  &__tags {
    @include flexGap(2px);
    @include text-button;
    padding-bottom: 3.8rem;
    color: #6b6b74;

    @include --mobile {
      padding-bottom: 2.4rem;
    }

    @include --tablet {
      @include flexGap(2px, 100%);
    }

    li {
      &:not(:last-child) {
        margin-right: 0.8rem;
      }
    }
  }

  &._colored {
    background-color: $color_background;
  }

  @include --tablet {
    min-height: 44rem;
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

    span {
      display: block;
    }

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
