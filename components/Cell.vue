<template>
  <SmartLink
    v-if="!$utils.isObjectEmpty(item)"
    :to="item.href || '/'"
    class="cell hover-opacity"
  >
    <div class="cell__content">
      <SvgIcon class="cell__icon" :name="item.icon" />

      <div class="cell__title _visually-h4">
        {{ item.text }}
      </div>

      <ArrowLink is-div class="cell__icon__link" :text="lang['base.more']" />
    </div>
  </SmartLink>

  <div v-else class="cell">
    <SkeletonLoader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SmartLink from '~/components/utils/SmartLink'
import SkeletonLoader from '~/components/utils/SkeletonLoader'
import ArrowLink from '~/components/controls/ArrowLink'

export default {
  name: 'Cell',
  components: { SkeletonLoader, SmartLink, ArrowLink },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss">
.cell {
  @include skeletonContainer;
  display: flex;
  flex-direction: column;
  background-color: $color_white;
  min-height: 25rem;

  @include --mobile {
    min-height: 20rem;
  }

  &__content {
    @include box(100%);
    padding: 2.4rem;
  }

  &__title {
    min-height: 5.8rem;
    margin-top: 5.2rem;
    margin-bottom: 1.4rem;
    font-weight: 700;

    @include --mobile {
      min-height: auto;
      margin-top: 3.2rem;
      margin-bottom: 2.4rem;
    }
  }

  &__icon {
    width: 5.8rem;
    height: 7rem;

    svg {
      @include box(100%);
    }
  }
}
</style>
