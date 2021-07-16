<template>
  <div class="faq-posts-list">
    <div v-if="title" class="faq-posts-list__title _visually-h4">
      {{ title }}
    </div>

    <div class="faq-posts-list__items">
      <SmartLink
        v-for="item in items"
        :key="item.id"
        :class="[
          'faq-posts-list-item',
          'hover-opacity',
          { _outlined: outlined },
        ]"
        :to="{ ...$route, ...{ query: { post: item.slug } } }"
      >
        <div class="faq-posts-list-item__title">{{ item.title }}</div>
        <SvgIcon class="faq-posts-list-item__icon" name="arrow-right" />
      </SmartLink>
    </div>
  </div>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'FaqPostsList',
  components: { SmartLink },
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.faq-posts-list {
  max-width: 89.3rem;

  &__title {
    margin-bottom: 4rem;
    font-weight: bold;

    @include --mobile {
      margin-bottom: 3.2rem;
    }
  }

  &__items {
    > * {
      &:not(:last-child) {
        margin-bottom: 1.6rem;
      }
    }
  }
}

.faq-posts-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  background-color: $color_white;

  &__title {
    @include text-small;
    font-weight: 700;
  }

  &__icon {
    @include box(1rem);
    flex-shrink: 0;
    margin-left: 1.6rem;
    color: $color_accent;
  }

  &._outlined {
    border: 1px solid #e1e4e8;
  }
}
</style>
