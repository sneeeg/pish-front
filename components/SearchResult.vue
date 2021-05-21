<template>
  <div class="search-result">
    <div v-if="result.activeFrom" class="search-result__date">
      {{ $dayjs(result.activeFrom).format($constants.POST_DATE_FORMAT) }}
    </div>
    <SmartLink
      :to="linkObject"
      class="search-result__title hover-opacity _visually-h4"
      >{{ result.title }}</SmartLink
    >
    <HTMLContent :html="result.content" class="search-result__text" />
    <ArrowLink :text="lang['base.more']" :to="linkObject" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HTMLContent from '~/components/utils/HTMLContent'
import SmartLink from '~/components/utils/SmartLink'
import ArrowLink from '~/components/controls/ArrowLink'
export default {
  name: 'SearchResult',
  components: { ArrowLink, SmartLink, HTMLContent },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('default', ['lang']),
    linkObject() {
      return { name: 'news-post', params: { post: this.result.slug } }
    },
  },
}
</script>

<style lang="scss">
.search-result {
  position: relative;
  padding: 4rem 0 3.2rem;
  border-bottom: 1px solid #e1e4e8;

  &__date {
    @include text-button-small;
    font-weight: 400;
    position: absolute;
    top: 0;
    left: 0;
    color: $color_grey_text;
  }

  &__title {
    display: block;
    font-weight: 700;
  }

  &__text {
    @include text-small;
    margin: 1.6rem 0 3.2rem;
  }
}
</style>
