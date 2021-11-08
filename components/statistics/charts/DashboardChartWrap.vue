<template>
  <div class="dashboard-chart-wrap">
    <slot></slot>

    <div class="dashboard-chart-wrap__legend">
      <div
        v-for="item in legend"
        :key="item.id"
        class="dashboard-chart-wrap__legend-item"
      >
        <i :style="{ backgroundColor: item.color }"></i>
        <span class="legend-text" v-html="item.text"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashboardChartWrap',
  props: {
    legend: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getLabelText(label) {
      const isYear =
        (typeof label === 'number' && label > 2000) ||
        (typeof label === 'string' && parseInt(label) > 2000)

      if (isYear) {
        label = `В ${label} году`
      }

      return label
    },
  },
}
</script>
<style lang="scss">
.dashboard-chart-wrap {
  &__legend {
    margin-bottom: 2rem;
  }

  &__legend-item {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }

    > div {
      display: flex;
      align-items: center;
    }
  }
}
</style>
