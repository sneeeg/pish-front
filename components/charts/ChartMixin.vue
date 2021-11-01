<template>
  <div></div>
</template>
<script>
import { mapState } from 'vuex'
import { COLORS, GET_OPACITY_COLORS } from '~/assets/js/constants'

export default {
  name: 'ChartMixin',
  props: {
    unit: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: Array,
    },
    summary: {
      type: Object,
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
