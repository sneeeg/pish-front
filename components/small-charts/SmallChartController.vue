<template>
  <div v-if="indicator">
    <SmallLineChart
      v-if="indicator.type === 'line'"
      v-bind="indicator"
    ></SmallLineChart>
    <SmallBarChart
      v-else-if="indicator.type === 'bar'"
      v-bind="indicator"
    ></SmallBarChart>
    <SmallDoughnutChart
      v-else-if="indicator.type === 'doughnut' || indicator.type === 'pie'"
      v-bind="indicator"
      :pie="indicator.type === 'pie'"
    ></SmallDoughnutChart>
    <SmallStackedSingleChart
      v-else-if="indicator.type === 'stacked-single'"
      v-bind="indicator"
    ></SmallStackedSingleChart>
  </div>
  <Loader v-else />
</template>
<script>
import SmallLineChart from '~/components/small-charts/SmallLineChart'
import SmallDoughnutChart from '~/components/small-charts/SmallDoughnutChart'
import SmallStackedSingleChart from '~/components/small-charts/SmallStackedSingleChart'
import SmallBarChart from '~/components/small-charts/SmallBarChart'
import Loader from '~/components/Loader'

export default {
  name: 'SmallChartController',
  components: {
    SmallLineChart,
    SmallDoughnutChart,
    SmallStackedSingleChart,
    SmallBarChart,
    Loader,
  },
  props: {
    indicator: {
      type: Object,
      default: null,
    },
  },
}
</script>
<style scoped></style>
