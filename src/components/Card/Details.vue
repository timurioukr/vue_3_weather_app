<template>
  <div 
    v-for="weather in currentData" 
    :key="weather.date" 
    class="details-wrapper"
    :class="{ 'night': currentTimesOfDay === 'night' }">
    <div class='wave -one'></div>
    <div class='wave -two'></div>
    <div class='wave -three'></div>
    <div class="details-wrapper_weathercon">
      <img :src="`http://openweathermap.org/img/wn/${ weather.weather.icon }@2x.png`" alt="weather-image">
    </div>
    <div class="details-wrapper_info">
      <h2 class="details-wrapper_info_location capitalize">{{ weather.title.name }}</h2>
      <p class="details-wrapper_info_date capitalize">{{ weather.title.date }}</p>
      <h2 class="details-wrapper_info_temp">{{ weather[currentTimesOfDay].averageTemp || '-'}} &deg;С</h2>
      <p class="details-wrapper_info_date capitalize">{{ weather.weather.description }}</p>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  currentData: { type: Array, default: () => [] },
  currentTimesOfDay: { type: String, default: 'day' },
})
</script>