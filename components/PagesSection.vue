<template>
  <div class="pages-section">
    <SmartLink
      v-for="{ href, text, icon } in pages"
      :key="text"
      :to="href"
      :class="['page-item', { _large: pages.length === 1 }]"
    >
      <div class="page-item__icon-wrap">
        <svg-icon
          class="page-item__icon"
          :class="`_${icon}`"
          :name="icon === 'page-docs' && browser.isIE ? 'university' : icon"
        ></svg-icon>
      </div>
      <span class="page-item__text hover-opacity">{{ text }}</span>
      <svg-icon class="page-item__arrow" name="arrow-right"></svg-icon>
    </SmartLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'PagesSection',
  components: { SmartLink },
  props: {
    pages: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('responsive', ['browser']),
  },
}
</script>

<style lang="scss">
.pages-section {
  @include row(3rem);

  .page-item {
    @include col(4, 3rem);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 2rem 1.6rem;
    background-color: #fff;

    &._large {
      @include col(2, 3rem);

      @include --tablet {
        @include col(1, 3rem);
      }
    }

    @include --tablet {
      @include col(2, 3rem);
    }

    @include --mobile {
      @include col(1, 1.5rem);
    }

    &__icon-wrap {
      @include --tablet {
        display: flex;
        justify-content: center;
        width: 4.5rem;
      }
    }

    &__icon {
      flex-shrink: 0;
      width: 4.5rem;
      height: 4.3rem;

      &._page-member {
        width: 5.02rem;
      }

      &._page-docs {
        width: 3.5rem;
      }

      &._page-screen {
        width: 4.56rem;
      }

      &._page-pie {
        width: 4.3rem;
      }
    }

    &__text {
      @include text;
      max-width: 15.2rem;
      margin-left: 1.6rem;
      font-weight: 700;
    }

    &__arrow {
      width: 5px;
      height: 1rem;
      margin-left: auto;
      color: $color_accent;
    }
  }
}
</style>
