<template>
  <div></div>
</template>
<script>
import { mapState } from 'vuex'
import { COLORS, GET_OPACITY_COLORS } from '~/assets/js/constants'

export default {
  name: 'SmallChartMixin',
  props: {
    type: {
      type: String,
      default: '',
    },
    serverType: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    scales: {
      type: Array,
      default: () => [],
    },
    reference: {
      type: Boolean,
      default: false,
    },
    chartLabels: {
      type: Array,
      default: () => [],
    },
    items: {
      required: true,
      type: Array,
    },
    summary: {
      type: Object,
      default: null,
    },
    reverse: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
      tooltips: [],
    }
  },
  computed: {
    ...mapState('responsive', ['window']),
    _items() {
      return this.items
    },
    labels() {
      if (this.type === 'radar' || this.type === 'doughnut') {
        return this.items.reduce((acc, item) => {
          const words = item.label.split(' ')

          if (words.length > 1) {
            const result = words.reduce((acc, item) => {
              const prevIndex = acc.length - 1 !== -1 ? acc.length - 1 : 0

              if (
                item.length < 6 &&
                acc[prevIndex] &&
                acc[prevIndex].length < 12
              ) {
                acc[prevIndex] = acc[prevIndex] + ' ' + item
              } else {
                acc.push(item)
              }

              return acc
            }, [])

            acc.push(result)
          } else {
            acc.push(item.label)
          }

          return acc
        }, [])
      }
      if (this.chartLabels.length) {
        return this.chartLabels
      }

      return this._items.reduce((acc, item, index) => {
        const isLineChart = typeof item.label === 'object'
        if (isLineChart) {
          if (index === 0) {
            acc.push(...item.label)
          }
        } else {
          acc.push(item.label)
        }

        return acc
      }, [])
    },
    values() {
      return this._items.reduce((acc, item) => {
        acc.push(item.value)

        return acc
      }, [])
    },
    valuesSum() {
      return this.values.reduce((acc, item) => {
        acc += +item

        return acc
      }, 0)
    },
    colors() {
      return COLORS.slice(0, this._items.length)
    },
  },
  beforeDestroy() {
    this.chart?.destroy()
  },
  methods: {
    getOpacityColors: GET_OPACITY_COLORS,
  },
}
</script>
<style scoped></style>
