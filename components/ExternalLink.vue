<template>
  <SmartLink class="external-link" :to="to">
    <SvgIcon name="link-external-2" />

    <span>{{ text }}</span>
  </SmartLink>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'ExternalLink',
  components: { SmartLink },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.external-link {
  @include text-small;

  display: flex;
  align-items: center;
  color: $color_accent;

  span {
    @include underline(0);

    position: relative;
  }

  svg {
    @include box(1.6rem);

    margin-right: 1rem;
  }
}
</style>
