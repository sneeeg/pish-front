<template>
  <div v-if="indicator">
    <LineChart v-if="indicator.type === 'line'" v-bind="indicator"></LineChart>
  </div>
  <Loader v-else />
</template>
<script>
import LineChart from '~/components/charts/LineChart'
import { getChartType } from '~/components/charts/utils'
import Loader from '~/components/Loader'

export default {
  name: 'ChartController',
  components: {
    LineChart,
    Loader,
  },
  props: {
    initialIndicator: {
      type: Object,
      default: null,
    },
    isNeedPrepare: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    indicator() {
      if (this.isNeedPrepare) {
        return this.prepareChartData(this.initialIndicator)
      } else {
        return this.initialIndicator
      }
    },
    subtype() {
      if (this.isNeedPrepare) {
        return this.getChartType(this.initialIndicator.chartType)
      } else {
        return this.initialIndicator
      }
    },
  },
  methods: {
    prepareChartData(rawIndicator) {
      const { isLine } = getChartType(rawIndicator.chartType)
      // const { isHorizontal, isStacked } = getChartType(rawIndicator.chartType)

      if (isLine) {
        return this.prepareLineChartData(rawIndicator)
      }
    },
    prepareLineChartData(rawIndicator) {
      return {
        type: 'line',
        unit: rawIndicator.unit,
        items: [
          {
            label: rawIndicator.label,
            value: rawIndicator.value,
          },
        ],
      }
    },
  },
}
</script>
<style scoped></style>
