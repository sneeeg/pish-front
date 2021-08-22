<template>
  <div class="history">
    <SmartLink
      v-for="{ title, text, icon, isActive, href } in events"
      :key="title"
      :to="href"
      class="history-item hover-opacity"
      :class="isActive"
    >
      <h2 class="history-item__title">{{ title }}</h2>
      <SvgIcon :name="icon" />
      <HTMLContent :html="text" />
    </SmartLink>
  </div>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'TheHistory',
  components: { HTMLContent, SmartLink },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.history-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1.4rem;
  padding-bottom: 8rem;

  @include --tablet {
    margin-left: 0;
    padding-bottom: 5rem;
  }

  @include --mobile {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 3rem;
    padding-bottom: 3rem;
  }

  &::after {
    position: absolute;
    top: 3rem;
    left: 16rem;
    z-index: -1;
    width: 2px;
    height: 100%;
    background: $color_grey_text;
    transform: translateX(-50%) translateX(-1px);
    content: '';

    @include --tablet {
      top: 7.7rem;
      left: 14rem;
      height: calc(100% - 1rem);
    }

    @include --mobile {
      top: 1.5rem;
      left: -3rem;
      height: 100%;
    }
  }

  &:last-child {
    padding-bottom: 0;

    &::after {
      height: 0;
    }
  }

  &::before {
    @include box(1.2rem);
    position: absolute;
    top: 2rem;
    left: 16rem;
    border-radius: 50%;
    background: $color_grey_text;
    transform: translateX(-50%) translateX(-1px);
    content: '';

    @include --tablet {
      top: 6.7rem;
      left: 14rem;
    }

    @include --mobile {
      top: 1.5rem;
      left: -3rem;
    }
  }

  &__title {
    @include h2();

    display: block;
    min-width: 15rem;
    color: $color_grey_text;
    font-weight: 400;
    letter-spacing: 1.05px;

    @include --tablet {
      font-size: 3.8rem;
      line-height: 4;
    }

    @include --mobile() {
      font-size: 3rem;
      line-height: 1.5;
    }
  }

  .icon {
    width: 12rem;
    height: 5rem;
    margin-right: 2rem;
    margin-left: 5rem;

    @include --tablet {
      margin-right: 2rem;
      margin-left: 3rem;
    }

    @include --mobile {
      display: none;
    }
  }
}

.active {
  &::after,
  &::before {
    background: $color_red;
  }
}

.history-item.active:nth-child(4)::after {
  background: $color_grey_text;
}
</style>
