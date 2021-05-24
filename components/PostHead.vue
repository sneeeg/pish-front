<template>
  <div v-view="$utils.scrollCenterDetection" class="post-head">
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
    <div v-if="picture" v-scroll-element class="post-head__picture">
      <img :src="picture.src" :alt="picture.alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostHead',
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
  },
}
</script>

<style lang="scss">
.post-head {
  &__title {
    @include containerInnerSmall;
  }

  &__picture {
    width: 100%;
    height: 53.5rem;
    margin-top: 4.2rem;

    @include --tablet {
      height: 40rem;
    }

    @include --mobile {
      height: 26rem;
      margin-top: 3.2rem;
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
</style>
