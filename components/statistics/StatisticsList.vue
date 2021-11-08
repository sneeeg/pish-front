<template>
  <div class="statistics-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['statistics-list__item', { _lg: items.length < 2 }]"
    >
      <div class="statistics-list__label">
        <SvgIcon :name="icon"></SvgIcon>
        <strong class="statistics-list__text">{{ item.label }}</strong>
      </div>

      <div class="statistics-list__value">
        <span>
          {{ item.value }}
        </span>

        {{ item.postfix }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatisticsList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
.statistics-list {
  font-size: 1.4rem;
  line-height: 1.8rem;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &._lg {
      svg {
        @include box(2.8rem);
      }
    }

    svg {
      width: 2.2rem;
      min-width: 2.2rem;
      height: 2.2rem;
      margin-right: 1.6rem;
    }

    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }

  &__label {
    display: flex;
    align-items: center;

    ._lg & {
      @include h5();
    }
  }

  &__value {
    display: block;
    margin-left: 2.4rem;
    white-space: nowrap;

    > span {
      font-family: $font-monospaced;
    }
  }
}
</style>
