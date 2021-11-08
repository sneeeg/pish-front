<template>
  <div class="small-bar-chart">
    <div class="small-bar-chart__chart-wrap">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>
<script>
import { Chart } from 'chart.js'
import SmallChartMixin from '~/components/small-charts/SmallChartMixin'

export default {
  name: 'SmallBarChart',
  mixins: [SmallChartMixin],
  mounted() {
    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            data: this.values,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            title: {
              display: '',
              text: '',
              font: {
                size: 12,
                family: 'Geometria, sans-serif',
              },
            },
            grid: {
              drawBorder: false,
            },
            ticks: {
              mirror: false,
              color: '#6B7182',
              callback(val, index, list) {
                return ''
                // return !(index % 2) ? this.getLabelForValue(val) : ''
              },
              font: {
                size: 10,
                family: 'Geometria, sans-serif',
              },
            },
            offset: true,
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              crossAlign: 'near',
              align: 'center',
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback(val, index, list) {
                return this.getLabelForValue(val)
              },
              font: {
                size: 10,
                family: 'Geometria, sans-serif',
              },
              color: '#6B7182',
            },
          },
        },
        animation: {
          duration: 0,
        },
      },
    })
  },
}
</script>
<style lang="scss">
.small-bar-chart {
  display: flex;
  justify-content: center;

  &__chart-wrap {
    position: relative;
    width: 100%;
    height: 28.8rem;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100% !important;
    max-height: 100%;
  }
}
</style>
