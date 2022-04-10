<template>
  <div class="breadcrumbs">
    <ul
      class="breadcrumbs__list"
      itemscope=""
      itemtype="http://schema.org/BreadcrumbList"
    >
      <li
        v-for="({ to, text, force }, index) in items"
        :key="index"
        itemscope=""
        itemtype="http://schema.org/ListItem"
      >
        <component
          :is="force ? 'a' : 'SmartLink'"
          :class="{ _disabled: !to, 'hover-opacity': to }"
          :to="!force ? to || '' : false"
          :href="force ? to || '' : false"
        >
          {{ getItemText(text) }}
        </component>
        <meta itemprop="position" :content="index" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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

  computed: {
    ...mapState('responsive', ['window']),
  },

  methods: {
    getItemText(text) {
      if (!this.window.isMobileSize) return text

      return text.length > 44 ? text.slice(0, 44) + '...' : text
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
    @include flexGap(0px, 0.6rem);

    li {
      white-space: nowrap;
      vertical-align: middle;

      a {
        color: $color_accent;
        cursor: pointer;

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
