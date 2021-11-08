<template>
  <SmartLink :style="{ background }" class="card-link hover-opacity" :to="to">
    <div class="card-link__slot">
      <slot />
    </div>

    <SvgIcon class="card-link__icon" name="arrow-right" />
  </SmartLink>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'CardLink',
  components: { SmartLink },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    background: {
      type: String,
      default: 'white',
    },
  },
}
</script>

<style lang="scss">
.card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  @include --mobile {
    padding: 1.6rem;
  }

  &__icon {
    @include box(1rem);
    flex-shrink: 0;
    margin-left: 4.2rem;
    color: $color_accent;

    @include --mobile {
      margin-left: 2rem;
    }
  }
}
</style>
