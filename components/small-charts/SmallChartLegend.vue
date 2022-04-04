<template>
  <div
    :class="[
      'small-chart-legend',
      'mt-5',
      { _horizontal: !showLegendValue && !window.isMobileSize },
    ]"
  >
    <div
      v-for="(item, index) in formattedItems"
      :key="index"
      class="small-chart-legend__item"
    >
      <div class="small-chart-legend__label">
        <i
          v-if="indicatorType !== 'radar'"
          :style="{ backgroundColor: colors[index] }"
        ></i>
        <strong class="small-chart-legend__text">{{ item.label }}</strong>
      </div>

      <div v-if="showLegendValue" class="small-chart-legend__value">
        <span>
          {{
            showPercent
              ? item.value
              : new Intl.NumberFormat('ru-RU').format(item.value)
          }}
        </span>

        {{ item.postfix }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { COLORS } from '~/assets/js/constants'

export default {
  name: 'SmallChartLegend',
  props: {
    indicatorType: {
      type: String,
      default: '',
    },
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
      colors: this.items[0].color
        ? this.items.reduce((acc, item) => {
            acc.push(item.color)

            return acc
          }, [])
        : COLORS,
    }
  },
  computed: {
    ...mapState('responsive', ['window']),
    ...mapState('default', ['lang']),

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
      } else {
        return this.items.reduce((acc, item, index) => {
          acc.push({
            label:
              item.label +
              (this.indicatorType === 'radar'
                ? ` (${this.lang['analytics.value']} ${index + 1})`
                : ''),
            value:
              this.showPercent && !isNaN(this.sum)
                ? ((item.value / this.sum) * 100).toFixed(1) + ' %'
                : item.value,
          })

          return acc
        }, [])
      }
    },
  },
}
</script>
<style lang="scss">
.small-chart-legend {
  font-size: 1.4rem;
  line-height: 1.8rem;

  &._horizontal {
    @include flexGap(5.6rem, 1.6rem);

    .small-chart-legend__item {
      &:not(:last-child) {
        padding-bottom: 0;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      padding-bottom: 1.6rem;
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
