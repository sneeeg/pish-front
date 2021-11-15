<template>
  <div class="small-doughnut-chart">
    <div class="small-doughnut-chart__chart-wrap">
      <canvas ref="chart"></canvas>

      <div v-if="summary" class="small-doughnut-chart__summary">
        <span>{{ summary.label }}</span>
        <strong>{{ summary.value }}</strong>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart } from 'chart.js'
import SmallChartMixin from '~/components/small-charts/SmallChartMixin'

export default {
  name: 'SmallDoughnutChart',
  mixins: [SmallChartMixin],
  props: {
    pie: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: 'doughnut',
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
        plugins: {
          datalabels: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (e) => {
                const label = this.$utils.cloneObject(e.label)

                if (typeof label === 'string') {
                  return `${label} - ${e.dataset.data[e.dataIndex]}`
                }

                label[label.length - 1] = [
                  `${label[label.length - 1]} - ${e.dataset.data[e.dataIndex]}`,
                ]

                return label
              },
            },
          },
          legend: {
            display: false,
          },
        },
        animation: {
          duration: 0,
        },
        borderWidth: 0,
        cutout: this.pie ? 0 : '60%',
      },
    })
  },
}
</script>
<style lang="scss">
.small-doughnut-chart {
  display: flex;
  justify-content: center;

  &__chart-wrap {
    position: relative;
    width: 33.2rem;
    max-width: 100%;

    @include --mobile {
      width: 24rem;
    }

    &::after {
      display: block;
      padding-bottom: 100%;
      content: '';
    }
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__summary {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);

    span {
      display: block;
      margin-bottom: 2px;
      color: $color_grey_text;
      font-size: 1.4rem;
      line-height: 2rem;
      text-align: center;
    }

    strong {
      font-size: 2.4rem;
      line-height: 3.2rem;
    }
  }
}
</style>
