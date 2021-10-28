<template>
  <div class="statistics">
    <StatisticsCard
      v-for="section in items"
      :key="section.id"
      v-bind="section"
    ></StatisticsCard>
  </div>
</template>
<script>
import StatisticsCard from '~/components/statistics/StatisticsCard'

export default {
  name: 'Statistics',
  components: {
    StatisticsCard,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="scss">
.statistics {
  margin-bottom: 3rem;
  column-count: 2;
  column-gap: 3rem;

  @include --tablet {
    column-count: auto;

    > * {
      width: 100%;
    }
  }

  > * {
    display: inline-block;
    margin-bottom: 3rem;
    -webkit-column-break-inside: avoid; /* stylelint-disable-line property-no-vendor-prefix */
    page-break-inside: avoid;
    break-inside: avoid;
  }
}
</style>
