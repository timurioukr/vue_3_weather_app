<template>
  <div class="main-wrapper" :class="{'isBookmarked': isBookmarked }">
    <div class="main-wrapper_control">
      <div class="main-wrapper_control-switch">
        <div class="main-wrapper_control-switch-label">{{ $t('btn.night') }}/{{ $t('btn.day') }}</div>
        <div class="toggle-switch">
          <label>
            <input type="checkbox" v-model="isDay" checked>
            <span class="slider"></span>
          </label>
        </div>
        <div>
            <div class="main-wrapper_control-format-type">
            <label>
              <input type="radio" v-model="weatherFormat" value="weather">{{ $t('btn.today') }}
            </label>
            <label>
              <input type="radio" v-model="weatherFormat" value="forecast">{{ $t('btn.for5days') }}
            </label>
          </div>
          </div>
      </div>
      <template v-if="$route.name === 'bookmarks'">
        <div>{{ currentLocation.city }}</div>
        <button @click="$emit('deleteLocation')"><span class="mdi mdi-minus-box-multiple-outline"></span></button>
      </template>
      <template v-else>
        <Select
          v-if="!currentLocation.isDefault"
          v-model="inputValue"
          @selectLocation="value => setLocationValue({ value, weatherFormat: weatherFormat })"
          @input="$emit('searchLocation', inputValue)"/>
        <div v-else>{{ currentLocation.city }}</div>
        <div>
          <div class="main-wrapper_control-btn">
            <button @click="isBookmarked ? $emit('deleteFromBookmarks') : $emit('addInBookmarks')"><span :class="{'isBookmarked': isBookmarked }" class="mdi mdi-bookmark"></span></button>
            <button @click="$emit('addLocation')"><span class="mdi mdi-plus-box-multiple-outline"></span></button>
            <button v-if="!currentLocation.isDefault" @click="$emit('deleteLocation')"><span class="mdi mdi-minus-box-multiple-outline"></span></button>
          </div>
        </div>
      </template>
    </div>
    <div class="main-wrapper_details">
      <Details
        :currentData="averageData"
        :currentTimesOfDay="timesOfDay"
        @selectDate="item => selectedDate = item"/>
    </div>
    <hr class="hr">
    <Chart
      :index="index"
      :weatherFormat="weatherFormat"
      :currentData="averageData"
      :selectedDate="selectedDate || averageData[0].date"
      :currentTimesOfDay="timesOfDay"/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { setAverageData } from '@/composables/functions.js'
import Chart from './Chart.vue'
import Select from './Select.vue'
import Details from './Details.vue'

// Data
const inputValue = ref('')
const selectedDate = ref('')
const isDay = ref(true)
const weatherFormat = ref('forecast')

// Props
const props = defineProps({
  currentLocation: { type: Object, default: () => ({}) },
  isBookmarked: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
})

// Emits
const emit = defineEmits(
  ['selectLocation', 'addLocation', 'searchLocation', 'addInBookmarks', 'deleteLocation', 'deleteFromBookmarks'
])

// Computed
const averageData = computed(() => {
  return weatherFormat.value === 'forecast' 
    ? setAverageData(props.currentLocation.list) 
    : [setAverageData(props.currentLocation.list)[0]]
})

const timesOfDay = computed(() => (isDay.value ? 'day' : 'night'))

// Hooks
onMounted(() => {
  if (!inputValue.value) inputValue.value = props.currentLocation.city
})

// Methods
const setLocationValue = (value) => {
  emit('selectLocation', value)
  inputValue.value = value.value.text
}

// Watchers
watch(weatherFormat, (newValue) => {
  if (newValue === 'weather') weatherFormat.value = 'weather'
  else weatherFormat.value = 'forecast'
})

</script>