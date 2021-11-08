<template>
  <div class="small-chart-legend mt-5">
    <div
      v-for="(item, index) in formattedItems"
      :key="index"
      class="small-chart-legend__item"
    >
      <div class="small-chart-legend__label">
        <i :style="{ backgroundColor: colors[index] }"></i>
        <strong class="small-chart-legend__text">{{ item.label }}</strong>
      </div>

      <div v-if="showLegendValue" class="small-chart-legend__value">
        <span>
          {{ item.value }}
        </span>

        {{ item.postfix }}
      </div>
    </div>
  </div>
</template>
<script>
import { COLORS } from '~/assets/js/constants'

export default {
  name: 'SmallChartLegend',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    showPercent: {
      type: Boolean,
      default: false,
    },
    showLegendValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colors: COLORS,
    }
  },
  computed: {
    sum() {
      return this.items.reduce((acc, item) => {
        acc += +item.value

        return acc
      }, 0)
    },

    formattedItems() {
      // когда линейный график лейблы и значения представлены массивами
      const lastItem = this.items[this.items.length - 1]

      /* Logic for constructor line chart */
      if (lastItem.values) {
        return this.items.reduce((acc, item) => {
          acc.push({
            label: item.label,
            value: item.values.slice(-1)[0],
          })

          return acc
        }, [])
      }

      const isLineChart =
        typeof lastItem.label === 'object' && Array.isArray(lastItem.label)

      if (isLineChart) {
        return lastItem.label.map((label, index) => ({
          label,
          value: lastItem.value[index],
          postfix: lastItem.postfix || '',
        }))
      } else if (this.showPercent && !isNaN(this.sum)) {
        return this.items.reduce((acc, item) => {
          acc.push({
            label: item.label,
            value: Math.round((item.value / this.sum) * 100) + '%',
          })

          return acc
        }, [])
      } else {
        return this.items
      }
    },
  },
}
</script>
<style lang="scss">
.small-chart-legend {
  font-size: 1.4rem;
  line-height: 1.8rem;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }

    i {
      display: inline-block;
      width: 0.8rem;
      min-width: 0.8rem;
      height: 0.8rem;
      margin-right: 1.6rem;
      border-radius: 50%;
    }
  }

  &__label {
    display: flex;
    align-items: center;
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
