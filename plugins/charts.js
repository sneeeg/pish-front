import { Chart, registerables } from 'chart.js'

export default () => {
  Chart.register(...registerables)
}
