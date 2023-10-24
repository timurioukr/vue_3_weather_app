import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAppStore = defineStore('app',  () => {
  // STATE
  const lang = ref(localStorage.getItem('lang') || 'ua')
  const locations = ref([])
  const apiKey = "pk.eyJ1IjoidGltdXJpb3VrciIsImEiOiJjbG51OXgwaWUwNmV2MmxzODF0MTN4NHhyIn0.dthPUsMIpV7cW-g6XM9s3A"
  const locationsWeather = ref([])
  const locationsBookmarksWeather = ref([])
  const apiWeatherKey = "8792101829aeb2960ff2720b109d3916"
  const isLoad = ref(true)

  // ACTIONS
  function changeAppComponentState (state, value = null) {
    if (value !== null) this[state] = value
    else this[state] = !this[state]
  }

  async function getLocations (query) {
    isLoad.value = false
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?access_token=${ apiKey }&types=place&language=${ lang.value === 'ua' ? 'uk' : lang.value }`)
      this.locations = response.data.features
    } catch (error) {
      console.error(error)
    }
    isLoad.value = true
  }

  async function getMyLocations (params) {
    try {
      return await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ params.lon },${ params.lat }.json?access_token=${ apiKey }&types=place&language=${ lang.value === 'ua' ? 'uk' : lang.value }`)
    } catch (error) {
      console.error(error)
    }
  }

  async function getLocationWeather (params) {
    isLoad.value = false
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${ params.lat }&lon=${ params.lon }&lang=${ lang.value }&appid=${ apiWeatherKey }&units=metric`
        )
        const result = {
          ...response.data, 
          city: params.city, 
          state: params.state,
          country: params.country,
          isDefault: params.isDefault,
          lat: params.lat,
          lon: params.lon
        }

      if (params.forBookmarks) locationsBookmarksWeather.value.push(result)
      else locationsWeather.value[params.index || 0] = result
      isLoad.value = true
      return response
    } catch (error) {
      console.error(error)
    }
    isLoad.value = true
  }
  
  return { getLocations, changeAppComponentState, locations, getLocationWeather, locationsWeather, getMyLocations, isLoad, locationsBookmarksWeather }
})