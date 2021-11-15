<template>
  <div class="line-chart">
    <div class="line-chart__chart-wrap">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Chart } from 'chart.js'
import ChartMixin from '~/components/charts/ChartMixin'

export default {
  name: 'LineChart',
  mixins: [ChartMixin],
  computed: {
    ...mapState('responsive', ['window']),
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.items.map((item, index) => ({
          data: item.value,
          borderColor: this.colors[index],
          backgroundColor: this.getOpacityColors()[index],
          tension: 0.4,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            display: this.window.isDesktopSize,
            font: {
              family: 'Geometria, sans-serif',
              size: 10,
            },
            formatter: (value) => Math.round(value),
            align: 'start',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                let label = ''
                const unit = this.unit || ''
                const value = context.parsed.y

                if (value !== null) {
                  label +=
                    typeof value === 'number'
                      ? `${new Intl.NumberFormat('ru-RU').format(
                          value
                        )} ${unit}`
                      : `${value} ${unit}`
                }

                return label
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            display: false,
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
                return !(index % 2) ? this.getLabelForValue(val) : ''
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
.line-chart {
  display: flex;
  justify-content: center;

  &__chart-wrap {
    position: relative;
    width: 100%;
    height: 24.8rem;

    @include --mobile {
      height: auto;
    }
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;

    @include --mobile {
      position: relative;
      height: auto;
      max-height: none;
    }
  }
}
</style>
