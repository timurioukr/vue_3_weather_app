<template>
  <div class="chart-wrapper">
    <canvas :id="index" ref="chartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import Chart from 'chart.js/auto'

// Non reactive data
let chartCanvas = null
let myChart = null

// Props
const props = defineProps({
  currentData: { type: Object, default: () => ({}) },
  currentTimesOfDay: { type: String, default: 'day' },
  weatherFormat: { type: String, default: '' },
  index: { type: Number, default: 0 },
})

// Computed
const dataForChart = computed(() => {
  const body = {}
  if (props.currentData.length > 1) {
    body.labels = props.currentData.map(item => item.date),
    body.data = props.currentData.map(item => item[props.currentTimesOfDay]).map(temp => temp.averageFeelsLike)
  } else {
    body.labels = props.currentData[0][props.currentTimesOfDay].temps.map(temp => Object.keys(temp)[0])
    body.data = props.currentData[0][props.currentTimesOfDay].temps.map(temp => Object.values(temp)[0])
  }
  return body
})

// Wathers
watch(() => [props.currentTimesOfDay, props.weatherFormat], () => (createChart()))

// Hooks
onMounted(() => createChart())

// Methods
const createChart = () => {
  let labels = dataForChart.value.labels
  let data = dataForChart.value.data
  if (myChart) {
    myChart.data.labels = dataForChart.value.labels
    myChart.data.datasets[0].data = dataForChart.value.data
    myChart.update()
  } else {
    var ctx = document.getElementById(props.index).getContext('2d')
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature chart hourly',
          data: data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
  }
}
</script>