<template>
  <div>
    <MarqueeText
      class="ads"
      :paused="isPaused"
      :repeat="10"
      :duration="30"
      @mouseover="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <div v-for="item in items" :key="item.id" class="ads__item">
        <SmartLink :to="item.href" class="_visually-h3 hover-opacity">{{
          item.text
        }}</SmartLink>
        <SvgIcon name="arrow-right" />
      </div>
    </MarqueeText>
  </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'Ads',
  components: { SmartLink, MarqueeText },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isPaused: false,
    }
  },
}
</script>

<style lang="scss">
.ads {
  margin-bottom: 8rem;

  &__item {
    display: flex;
    align-items: center;

    svg {
      @include box(1.6rem);
      margin: 0 3.2rem;
    }

    a {
      color: $color_accent;
      font-weight: bold;
    }
  }
}
</style>
