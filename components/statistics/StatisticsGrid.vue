<template>
  <div class="statistics-grid">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="statistics-grid__item"
      :class="{ '_full-width': fullWidth }"
    >
      <strong>{{ item.value }}</strong>
      {{ item.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatisticsGrid',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss">
.statistics-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  background: #fff;

  &__item {
    width: calc(50% - 1.5rem);
    padding: 2.4rem;
    color: $color_grey_text;
    font-size: 1.4rem;

    .statistics-card & {
      width: calc(50% - 1.6rem);
      margin-top: 3.2rem;
      padding: 3.2rem 0 0 0;
      border-top: 1px solid $color_grey_border;
    }

    &._full-width {
      width: 100%;
      margin-top: 0;
    }

    @include --mobile {
      width: 100%;

      .statistics-card & {
        width: 100%;
        margin-top: 2.4rem;
        padding: 2.4rem 0 0 0;
      }

      &._full-width {
        &:first-child {
          margin-top: 0;
        }
      }
    }

    strong {
      display: block;
      margin-bottom: 0.8rem;
      color: $color_black;
      font-size: 2.4rem;
      line-height: 3.2rem;
    }

    &:not(:last-child):not(:nth-last-child(2)) {
      @include --from-mobile {
        margin-bottom: 3rem;
      }
    }
  }
}
</style>
