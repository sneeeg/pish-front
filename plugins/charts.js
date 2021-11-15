import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default () => {
  Chart.register(...registerables)
  Chart.register(ChartDataLabels)
}
