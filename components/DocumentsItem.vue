<template>
  <div v-scroll-element class="documents-item">
    <div class="documents-item__date">
      {{ $dayjs(document.activeFrom).format('D MMMM YYYY') }}
    </div>
    <SmartLink class="documents-item__text hover-opacity" :to="document.link">
      {{ document.description }}
    </SmartLink>
  </div>
</template>

<script>
import SmartLink from '~/components/utils/SmartLink'
export default {
  name: 'DocumentsItem',
  components: { SmartLink },
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.documents-item {
  padding-bottom: 3.2rem;
  border-bottom: 1px solid #e1e4e8;

  @include --mobile {
    padding-bottom: 2.4rem;
  }

  &__date {
    @include text-button-small;
    margin-bottom: 2rem;
    color: $color_grey_text;
    font-weight: normal;
  }

  &__text {
    display: block;
    @include text;
    font-weight: 700;
    line-height: 2.7rem;
  }
}
</style>
