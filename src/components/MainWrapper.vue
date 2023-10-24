<template>
  <Spinner v-if="isLoad && !locationsWeather.length"/>
  <template v-else>
    <Wrapper
      v-for="(location, index) in locationsWeather" 
      :key="index+location.lat"
      :currentLocation="location"
      :isBookmarked="sameIndexes.includes(index)"
      :index="index+location.lat"
      @searchLocation="searchLocation" 
      @selectLocation="value => selectLocation({ ...value, index })" 
      @addInBookmarks="addInBookmarks(index)"
      @deleteFromBookmarks="deleteFromBookmarks(index)"
      @addLocation="addLocation(index)"
      @deleteLocation="deleteLocation(index)" />
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import Wrapper from './Card/Wrapper.vue'
import Spinner from './Spinner.vue'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Data
const queryTimeout = ref(null)
const storedValue = ref(null)
const sameIndexes = ref([])

// Store
const { getLocations } = useAppStore()
const { locationsWeather, isLoad, locationsBookmarksWeather } = storeToRefs(useAppStore())
const { getLocationWeather, changeAppComponentState, getMyLocations } = useAppStore()

// Hooks
onMounted(() => {
  !locationsWeather.value.length && setUserLocation()
  checkMatchedIndexes()
})

// Methods
const searchLocation = (value) => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (value !== '') getLocations(value)
  }, 300)
}

const selectLocation = (params) => {
  const [city, state, country] = params.value.place_name.split(',')
  getLocationWeather({
    lat: params.value.geometry.coordinates[1], 
    lon: params.value.geometry.coordinates[0],
    index: params.index,
    city,
    state,
    country,
    isDefault: params.isDefault
  }).then(() => checkMatchedIndexes())
}

const addInBookmarks = (index) => {
  storedValue.value = JSON.parse(localStorage.getItem('myWeather')) || []
  if (storedValue.value.length >= 5) {
    Swal.fire({ text: t('bookmarksLimit') })
    return
  }
  const { lat, lon, city, state, country  } = locationsWeather.value[index]
  const myWeather = [...storedValue.value, { lat, lon, city, state, country }]
  localStorage.setItem('myWeather', JSON.stringify(myWeather))
  checkMatchedIndexes()
}

const deleteFromBookmarks = async (index) => {
  const { isConfirmed } = await Swal.fire({
    showCancelButton: true,
    text: t('youWantContinue'),
    buttons: [t('btn.not'), t('btn.ok')]
  })
  if (isConfirmed) {
    storedValue.value = JSON.parse(localStorage.getItem('myWeather')) || []
    if (index >= 0 && index < storedValue.value.length) {
      const newList = locationsBookmarksWeather.value.toSpliced(index, 1)
      changeAppComponentState('locationsBookmarksWeather', newList)
      localStorage.setItem('myWeather', JSON.stringify(newList))
    } else Swal.fire({ text: t('invalidIndex') }) 
    checkMatchedIndexes()
  }
}

const addLocation = (index) => {
  if (locationsWeather.value.length < 5) {
    changeAppComponentState('locationsWeather', [{ ...locationsWeather.value[index], isDefault: false }, ...locationsWeather.value])
  } else Swal.fire({ text: t('locationsLimit') })
  checkMatchedIndexes()
}

const deleteLocation = (index) => {
  if (locationsWeather.value.length > 1) {
    const updatedLocations = locationsWeather.value.slice()
    updatedLocations.splice(index, 1)
    changeAppComponentState('locationsWeather', updatedLocations)
  } else Swal.fire({ text: t('notDeleteLastElement') })
  checkMatchedIndexes()
}

const setUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      getMyLocations({ lat: latitude, lon: longitude }).then(response => {
        selectLocation({ value: response.data.features[0], isDefault: true })
      })
    })
  } else Swal.fire({ text: t('notSupportedGeolocation') }) 
}

const checkMatchedIndexes = () => {
  const storedValue = JSON.parse(localStorage.getItem('myWeather')) || []
  const matchedIndexes = []
  locationsWeather.value.forEach((locationsItem, index) => {
    const matchedItems = storedValue.find(storeItem => locationsItem.lat === storeItem.lat && locationsItem.lon === storeItem.lon)
    if (matchedItems) matchedIndexes.push(index)
  })
  sameIndexes.value = matchedIndexes
}
</script>