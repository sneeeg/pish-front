<template>
  <div
    :class="[
      'statistics-card',
      {
        _hasBorder: hasBorder,
        _single: indicator && indicator.type === 'doughnut' && single,
        _reverse: reverse,
        _flexStart:
          (list && (list.items.length > 1 || reverse)) || noCardAppearance,
        _noCardAppearance: noCardAppearance,
        _faint: faint,
      },
    ]"
  >
    <div v-if="title || subtitle" class="statistics-card__header">
      <p>{{ title }}</p>
      <span v-if="subtitle" class="statistics-card__subtitle">{{
        subtitle
      }}</span>
    </div>

    <div v-if="hasChart" class="statistics-card__chart">
      <SmallChartController :indicator="indicator"></SmallChartController>
      <SmallChartLegend
        v-if="
          !['data-table', 'radar', 'content', 'groups'].includes(indicator.type)
        "
        :items="indicator.items"
        :show-percent="indicator.showPercent"
        :show-legend-value="showLegendValue"
      ></SmallChartLegend>
    </div>

    <StatisticsGrid
      v-if="info && info.length"
      :items="info"
      :full-width="true"
    ></StatisticsGrid>

    <StatisticsList
      v-if="list && list.items.length"
      :items="list.items"
      :icon="list.icon"
    ></StatisticsList>
  </div>
</template>
<script>
import SmallChartController from '~/components/small-charts/SmallChartController'
import SmallChartLegend from '~/components/small-charts/SmallChartLegend'
import StatisticsGrid from '~/components/statistics/StatisticsGrid'
import StatisticsList from '~/components/statistics/StatisticsList'

export default {
  name: 'StatisticsCard',
  components: {
    SmallChartController,
    SmallChartLegend,
    StatisticsGrid,
    StatisticsList,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    indicator: {
      type: Object,
      default: null,
    },
    info: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Object,
      default: null,
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
    single: {
      type: Boolean,
      default: false,
    },
    faint: {
      type: Boolean,
      default: false,
    },
    showLegendValue: {
      type: Boolean,
      default: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    noCardAppearance: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasIndicator() {
      return !!this.indicator
    },
    hasChart() {
      return this.hasIndicator && !!this.indicator.type
    },
  },
  methods: {
    getIconByUnit(unit) {
      if (this.hasChart) {
        return ''
      }

      if (unit.includes('руб')) {
        return ''
      }

      if (unit.includes('%')) {
        return ''
      }

      if (unit.includes('шт')) {
        return 'page-docs'
      }

      if (unit.includes('чел')) {
        return 'person'
      }

      return ''
    },
  },
}
</script>
<style lang="scss">
.statistics-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.4rem;
  background: #fff;

  &._flexStart {
    justify-content: flex-start;
  }

  &._hasBorder {
    border: 1px solid #e1e4e8;
  }

  &._noCardAppearance {
    padding: 0;
    border: 0;
    background: transparent;
  }

  &__header {
    @include text-small();
    margin-bottom: 4rem;

    ._faint & {
      color: $color_grey_text;
    }

    ._reverse & {
      order: 2;
      margin: 4rem 0 0;

      @include --mobile {
        margin: 2.4rem 0 0;
      }
    }

    @include --mobile {
      margin-bottom: 2.4rem;
    }

    > p {
      margin: 0;
    }
  }

  &__subtitle {
    display: block;
    margin-top: 1.2rem;
    color: $color_grey_text;

    @include --mobile {
      margin-top: 0.8rem;
    }
  }

  &__head {
    @include box(2.2rem);
    margin-bottom: 4rem;

    @include --mobile {
      margin-bottom: 3.2rem;
    }
  }

  &__list {
    li {
      display: flex;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }

  &__list-label {
    display: flex;

    > span {
      margin-right: 2rem;
    }
  }

  &__list-dot {
    @include box(1.2rem);
    margin-right: 1.6rem;
    border-radius: 50%;
  }

  &__chart {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    @include --from-tablet {
      ._single & {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        > * {
          &:first-child {
            margin: 0 14rem 0 12rem;
          }

          &:last-child {
            margin-right: 6rem;
          }
        }
      }
    }

    > :not(:last-child) {
      margin-bottom: 4rem;

      @include --mobile {
        margin-bottom: 2.4rem;
      }
    }
  }
}
</style>
