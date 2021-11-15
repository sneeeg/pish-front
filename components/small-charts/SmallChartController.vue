<template>
  <div
    v-if="indicator"
    :class="[
      'controller-indicator',
      { _fluid: ['groups'].includes(indicator.type) },
    ]"
  >
    <SmallLineChart
      v-if="indicator.type === 'line'"
      v-bind="indicator"
    ></SmallLineChart>
    <SmallBarChart
      v-else-if="indicator.type === 'bar' || indicator.type === 'bar-group'"
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
    <DataTable
      v-else-if="indicator.type === 'data-table'"
      v-bind="indicator"
    ></DataTable>
    <SmallRadarChart
      v-else-if="indicator.type === 'radar'"
      v-bind="indicator"
    ></SmallRadarChart>
    <Content
      v-else-if="indicator.type === 'content'"
      v-bind="indicator"
    ></Content>
    <Groups v-else-if="indicator.type === 'groups'" v-bind="indicator"></Groups>
  </div>
  <Loader v-else />
</template>
<script>
import SmallLineChart from '~/components/small-charts/SmallLineChart'
import SmallDoughnutChart from '~/components/small-charts/SmallDoughnutChart'
import SmallStackedSingleChart from '~/components/small-charts/SmallStackedSingleChart'
import SmallBarChart from '~/components/small-charts/SmallBarChart'
import DataTable from '~/components/ComponentsConstructor/components/DataTable'
import Loader from '~/components/Loader'
import SmallRadarChart from '~/components/small-charts/SmallRadarChart'
import Content from '~/components/ComponentsConstructor/components/Content'
import Groups from '~/components/ComponentsConstructor/components/Groups'

export default {
  name: 'SmallChartController',
  components: {
    SmallLineChart,
    SmallDoughnutChart,
    SmallStackedSingleChart,
    SmallBarChart,
    Loader,
    DataTable,
    SmallRadarChart,
    Content,
    Groups,
  },
  props: {
    indicator: {
      type: Object,
      default: null,
    },
  },
}
</script>
<style lang="scss">
.controller-indicator {
  &._fluid {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
}
</style>
