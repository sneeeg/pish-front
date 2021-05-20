<template>
  <div class="other-post-preview">
    <SmartLink :to="to" class="other-post-preview__image">
      <img :src="picture.src" :alt="picture.alt" />
    </SmartLink>
    <div class="other-post-preview__content">
      <div class="other-post-preview-head">
        {{ $dayjs(activeFrom).format($constants.POST_DATE_FORMAT) }}
      </div>
      <SmartLink :to="to" class="other-post-preview__title hover-opacity">
        {{ title }}
      </SmartLink>
      <ArrowLink
        :to="to"
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
    to: {
      type: [String, Object],
      required: true,
    },
    picture: {
      type: Object,
      required: true,
    },
    activeFrom: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.other-post-preview {
  background-color: $color_white;

  &__image {
    display: block;
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
    padding: 2.2rem 4rem;

    @include --mobile {
      padding: 3.2rem 2rem;
    }
  }

  &__title {
    @include text-small;
    display: block;
    margin: 2.2rem 0 4.8rem;

    @include --mobile {
      margin: 1.6rem 0 2rem;
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
