<template>
  <div class="post-head">
    <h1 v-scroll-element class="post-head__title _visually-h2">{{ title }}</h1>
    <div v-scroll-element class="post-head-info">
      <template v-if="category">
        <span class="post-head-info__category">{{ category.text }}</span>
        <span class="post-head-info__separator"> / </span>
      </template>
      <span class="post-head-info__date">{{
        $dayjs(date).format($constants.POST_DATE_FORMAT)
      }}</span>
    </div>
    <ul v-if="tags && tags.length" v-scroll-element class="post-tags">
      <li v-for="tag in tags" :key="tag.id">
        <SmartLink class="hover-color-accent" :to="getTagLink(tag)"
          >#{{ tag }}</SmartLink
        >
      </li>
    </ul>
    <div v-if="picture" v-scroll-element class="post-head__picture">
      <img :src="picture.src" :alt="picture.alt" />
      <a v-if="source && source.href" class="hover-opacity" :href="source.text"
        >© {{ source.text }}</a
      >
    </div>
  </div>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'PostHead',
  components: { SmartLink },
  props: {
    title: {
      type: String,
      required: true,
    },
    picture: {
      type: Object,
      default: null,
    },
    category: {
      type: Object,
      default: null,
    },
    date: {
      type: String,
      required: true,
    },
    source: {
      type: Object,
      default: null,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'news',
    },
  },
  methods: {
    getTagLink(tag) {
      return {
        name: this.type !== 'news' ? `news-${this.type}` : 'news',
        query: { tag },
      }
    },
  },
}
</script>

<style lang="scss">
.post-head {
  &__title {
    @include containerInnerSmall;
  }

  &__picture {
    position: relative;
    width: 100%;
    height: 53.5rem;
    margin-top: 3.2rem;

    @include --tablet {
      height: 40rem;
    }

    @include --mobile {
      height: 26rem;
      margin-top: 3.2rem;
    }

    a {
      @include text-button;
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
      padding: 1rem;
      color: $color_white;
      font-weight: normal;
      text-transform: none;
      background-color: rgba($color_black, 0.6);

      @include --mobile {
        padding: 0.8rem;
      }
    }

    img {
      @include box(100%);
      object-fit: cover;
    }
  }
}

.post-head-info {
  @include text-button;
  margin-top: 3.2rem;
  font-weight: 500;
  text-transform: uppercase;

  @include --mobile {
    margin-top: 2.4rem;
  }

  &__separator {
    color: $color_accent;
  }

  &__date {
    color: $color_grey_text;
  }
}

.post-tags {
  @include flexGap(2px, 60rem);
  font-weight: 700;
  padding-top: 3.2rem;

  @include --tablet {
    @include flexGap(2px, 100%);
  }

  @include --mobile {
    padding-top: 2.4rem;
  }

  li {
    &:not(:last-child) {
      margin-right: 0.8rem;
    }
  }
}
</style>
