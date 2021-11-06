<template>
  <div
    :style="{ height: canvasHeight + 'px', position: 'relative' }"
    class="small-radar-chart"
  >
    <div ref="canvasContainer" class="small-radar-chart__chart-wrap">
      <canvas ref="chart" width="100" height="100"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js'
import { mapState } from 'vuex'
import { COLORS } from '~/assets/js/constants'
import SmallChartMixin from '~/components/small-charts/SmallChartMixin'

export default {
  name: 'ChartRadar',
  mixins: [SmallChartMixin],
  data() {
    return {
      canvasHeight: 0,
    }
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
  mounted() {
    const datasets = []

    if (!this.reference) {
      const color = COLORS[this.$utils.getRandomInteger(0, COLORS.length - 1)]
      const colorRGB = this.$utils.hexToRgb(color)

      datasets.push({
        label: this.title,
        data: this.values,
        fill: true,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        backgroundColor: `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.25)`,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,

        pointRadius: 5,
      })
    } else {
      const color = COLORS[2]
      const colorRGB = this.$utils.hexToRgb(color)
      const colorRef = '#9D9D9D'
      const colorRefRGB = this.$utils.hexToRgb(colorRef)

      datasets.push({
        label: this.title,
        data: this.values,
        fill: false,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        backgroundColor: `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.25)`,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,

        pointRadius: 5,
      })

      datasets.push({
        label: this.title,
        data: [
          this.valuesSum * 0.4,
          this.valuesSum * 0.3,
          this.valuesSum * 0.3,
        ],
        fill: true,
        borderColor: colorRef,
        pointBackgroundColor: colorRef,
        pointBorderColor: colorRef,
        backgroundColor: `rgba(${colorRefRGB.r}, ${colorRefRGB.g}, ${colorRefRGB.b}, 0.25)`,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colorRef,

        pointRadius: 5,
      })
    }

    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        animation: {
          duration: 0,
        },
        elements: {
          line: {
            borderWidth: 1,
          },
        },
      },
    })

    this.updateCanvasHeight()
    window.addEventListener('resize', this.updateCanvasHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateCanvasHeight)
  },
  methods: {
    updateCanvasHeight() {
      setTimeout(() => {
        this.canvasHeight =
          this.$refs.canvasContainer.offsetHeight *
          (this.window.isDesktopSize ? 0.825 : 0.9)

        console.log(this.canvasHeight)
      }, 500)
    },
  },
}
</script>

<style lang="scss">
.small-radar-chart {
  &__chart-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
