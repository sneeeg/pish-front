<template>
  <div class="small-stacked-single-chart">
    <div v-if="summary" class="small-stacked-single-chart__summary">
      <strong>{{ summary.value }}</strong>
      <span>{{ summary.label }}</span>
    </div>

    <div class="small-stacked-single-chart__chart-wrap">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>
<script>
import { Chart } from 'chart.js'
import ChartjsPluginStacked100 from 'chartjs-plugin-stacked100'
import SmallChartMixin from '~/components/small-charts/SmallChartMixin'

export default {
  name: 'SmallStackedSingleChart',
  mixins: [SmallChartMixin],
  mounted() {
    Chart.register(ChartjsPluginStacked100)
    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          ...this.values.map((value, index) => ({
            data: [value],
            backgroundColor: this.colors[index],
            barThickness: 200,
          })),
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
          stacked100: { enable: true, replaceTooltipLabel: false },
        },
        scales: {
          y: {
            display: false,
            stacked: true,
          },
          x: {
            display: false,
            stacked: true,
          },
        },
        animation: {
          duration: 0,
        },
        indexAxis: 'y',
      },
    })
  },
}
</script>
<style lang="scss">
.small-stacked-single-chart {
  &__chart-wrap {
    position: relative;
    width: 100%;
    height: 6.6rem;
  }

  canvas {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }

  &__summary {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    strong {
      margin-right: 1.2rem;
      font-size: 4.6rem;
      line-height: 5.2rem;
    }

    span {
      display: block;
      margin-bottom: 2px;
      color: $color_grey_text;
      font-size: 1.8rem;
      line-height: 2.4rem;

      @include --mobile {
        font-size: 1.6rem;
        line-height: 2.2rem;
      }
    }
  }
}
</style>
