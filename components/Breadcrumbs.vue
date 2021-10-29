<template>
  <div class="breadcrumbs">
    <ul
      class="breadcrumbs__list"
      itemscope=""
      itemtype="http://schema.org/BreadcrumbList"
    >
      <li
        v-for="({ to, text }, index) in items"
        :key="index"
        itemscope=""
        itemtype="http://schema.org/ListItem"
      >
        <component
          :is="'SmartLink'"
          :class="{ _disabled: !to, 'hover-opacity': to }"
          :to="to || ''"
        >
          {{ text }}
        </component>
        <meta itemprop="position" :content="index" />
      </li>
    </ul>
  </div>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'Breadcrumbs',
  components: { SmartLink },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.breadcrumbs {
  @include text-button;
  font-weight: normal;

  text-transform: none;

  &__list {
    display: inline-flex;
    flex-flow: row wrap;
    margin-bottom: -0.6rem;

    li {
      margin-bottom: 0.6rem;
      vertical-align: middle;

      a {
        color: $color_accent;

        &._disabled {
          color: $color_grey_text;
          opacity: 1;
        }
      }

      &:not(:last-child) {
        &::after {
          margin: 0 1rem 0 0.5rem;
          color: $color_grey_text;
          vertical-align: middle;
          content: '/';
        }
      }
    }
  }
}
</style>
