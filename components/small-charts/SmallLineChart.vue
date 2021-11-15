<template>
  <div class="small-line-chart">
    <div class="small-line-chart__chart-wrap">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>
<script>
import { Chart } from 'chart.js'
import SmallChartMixin from '~/components/small-charts/SmallChartMixin'

export default {
  name: 'SmallLineChart',
  mixins: [SmallChartMixin],
  mounted() {
    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.items.map((item, index) => ({
          data: item.values || item.value,
          borderColor: this.colors[index],
          backgroundColor: this.getOpacityColors()[index],
          tension: 0.4,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          y: {
            reverse: this.reverse,
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
                return this.getLabelForValue(val)
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
.small-line-chart {
  display: flex;
  justify-content: center;

  &__chart-wrap {
    position: relative;
    width: 100%;
    height: 14.8rem;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
  }
}
</style>
